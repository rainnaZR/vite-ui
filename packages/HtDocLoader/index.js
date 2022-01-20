const fs = require("fs-extra");
const path = require("path");
const {
  compileScript,
  compileTypeScript,
  compileTemplate,
} = require("./src/compile");
const { RenderMd } = require("./src/render");

class DocLoader {
  constructor(options) {
    const { entry, output } = options;
    this.options = options;
    this.entry = DocLoader.onGetEntry(entry);
    this.output = output;
    this.result = {};

    // 清空打包目录
    output && this.onClearDistPath();
    // 解析文档
    this.onParseAll();
  }

  // entry格式转换
  static onGetEntry(entry = []) {
    return typeof entry === "string"
      ? [entry]
      : Array.isArray(entry)
      ? entry
      : [];
  }

  // 清空打包目录
  onClearDistPath() {
    const { output } = this.options;
    try {
      fs.accessSync(output, fs.constants.R_OK);
    } catch (e) {
      fs.mkdirSync(output);
    }
  }

  // 解析所有入口文件
  onParseAll() {
    this.entry?.forEach((item) => this.onParseItem(item));
  }

  // 解析单个入口文件
  onParseItem(entry) {
    this.onGetInitContent(entry);
    const { scriptStr, typeScriptStr, templateStr } = this.result[entry];
    // 编译script
    compileScript(scriptStr, this.options?.scriptCompileOptions, (result) =>
      this.cbCompile(entry, result)
    );
    // 编译typescript
    compileTypeScript(
      typeScriptStr,
      this.options?.typeScriptCompileOptions,
      (result) => this.cbCompile(entry, result)
    );
    // 编译template
    compileTemplate(
      templateStr,
      this.options?.templateCompileOptions,
      (result) => this.cbCompile(entry, result)
    );
    // 生成编译后的文件
    this.onGenerateCompileFile(entry);
  }

  // 获取文件初始内容
  onGetInitContent(entry) {
    // 获取vue文件内容vueStr
    const vueStr = fs.existsSync(entry) && fs.readFileSync(entry, "utf8");
    // vueStr中提取script内容
    const scriptStr = vueStr.match(
      /<script(\s*lang="ts")*>([\S|\s]*)<\/script>/
    )[2];
    // 获取ts文件路径，ts文件名字types.ts, 与*.vue在同一目录下
    const tsEntry = entry.replace(/\\(\w+).vue$/, "\\types.ts");
    // 读取ts文件内容
    const typeScriptStr =
      fs.existsSync(tsEntry) && fs.readFileSync(tsEntry, "utf8");
    // vueStr中提取template内容
    const templateStr = vueStr.match(/<template>([\S|\s]*)<\/template>/)[1];

    this.result[entry] = {
      vueStr,
      scriptStr,
      typeScriptStr,
      templateStr,
    };
  }

  // 编译回调
  cbCompile(entry, result) {
    const { type, key, content } = result;
    !this.result[entry].componentInfo &&
      (this.result[entry].componentInfo = {});
    !this.result[entry].componentInfo[type] &&
      (this.result[entry].componentInfo[type] = {});
    key
      ? (this.result[entry].componentInfo[type][key] = content)
      : (this.result[entry].componentInfo[type] = content);
  }

  // 生成编译后的文件
  onGenerateCompileFile(entry) {
    const fileExtension = this.options.outputFileExtension || ".md";
    switch (fileExtension) {
      case ".md":
        this.onGenerateMdFile(entry);
        break;
      case ".json":
        this.onGenerateJsonFile(entry);
        break;
      default:
        break;
    }
  }

  // 编译内容生成md文件
  onGenerateMdFile(entry) {
    const componentInfo = this.result[entry]?.componentInfo;
    const mdContent = new RenderMd(
      componentInfo,
      this.options.outputMdFileOptions
    ).render();
    let fileName;
    let fileContent;
    if (
      this.options.beforeOutputFileHook &&
      typeof this.options.beforeOutputFileHook === "function"
    ) {
      // 如果定义beforeOutputFileHook，则执行
      const result = this.options.beforeOutputFileHook({
        entry, // 入口文件
        componentInfo, // 入口文件生成的组件信息
        mdContent, // 组件信息生成的md格式内容
      });
      // 生成文件名
      fileName = result.fileName;
      // 生成文件内容
      fileContent = result.fileContent;
    } else {
      // 否则不经过转化，直接生成md文件
      fileName = componentInfo.name || entry.replace(/[\\|.|:]/g, "");
      fileContent = mdContent;
    }
    this.result[entry].fileContent = fileContent;

    // 如果设置了打包目录，则输出打包文件
    if (this.options.output) {
      // 写入文件到打包目录里
      fs.writeFile(
        path.join(this.options.output, `${fileName}.md`),
        fileContent
      );
    }
  }

  // 编译内容生成json文件
  onGenerateJsonFile() {}
}

module.exports = DocLoader;
