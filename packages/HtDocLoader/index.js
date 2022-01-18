const fs = require("fs-extra");
const {
  compileTemplate,
  compileScript,
  compileTypeScript,
} = require("./src/compile");

class DocLoader {
  constructor(options) {
    const { entry, output } = options;
    this.options = options;
    this.entry = DocLoader.onGetEntry(entry);
    this.output = output;
    this.result = {};

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

  // 解析所有入口文件
  onParseAll() {
    this.entry?.forEach((item) => this.onParseItem(item));
  }

  // 解析单个入口文件
  onParseItem(entry) {
    this.onGetInitContent(entry);
    const { templateStr, scriptStr, typeScriptStr } = this.result[entry];
    // 编译template
    compileTemplate(
      templateStr,
      this.options?.templateCompileOptions,
      (result) => this.cbCompile(entry, result)
    );
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
  }

  // 获取文件初始内容
  onGetInitContent(entry) {
    // 获取vue文件内容vueStr
    const vueStr = fs.existsSync(entry) && fs.readFileSync(entry, "utf8");
    // vueStr中提取template内容
    const templateStr = vueStr.match(/<template>([\S|\s]*)<\/template>/)[1];
    // vueStr中提取script内容
    const scriptStr = vueStr.match(
      /<script(\s*lang="ts")*>([\S|\s]*)<\/script>/
    )[2];
    // 获取ts文件路径，ts文件名字types.ts, 与*.vue在同一目录下
    const tsEntry = entry.replace(/\\(\w+).vue$/, "\\types.ts");
    // 读取ts文件内容
    const typeScriptStr =
      fs.existsSync(tsEntry) && fs.readFileSync(tsEntry, "utf8");
    this.result[entry] = {
      vueStr,
      templateStr,
      scriptStr,
      typeScriptStr,
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
}

module.exports = DocLoader;
