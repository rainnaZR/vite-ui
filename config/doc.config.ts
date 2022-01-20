const fs = require("fs-extra");
const path = require("path");
const DocLoader = require("@htfed/doc-loader");

// 第一步：定义入口文件，出口目录
const entryDir = path.resolve(__dirname, "../packages/HtUi/src");
const entry = fs
  .readdirSync(entryDir)
  .filter((item) => !["theme"].includes(item))
  .map((item) => {
    const filePath = path.join(entryDir, item);
    const fileInfo = fs.statSync(filePath);
    if (fileInfo.isDirectory()) {
      return path.join(filePath, "index.vue");
    }
    return "";
  })
  .filter((i) => !!i);
const output = path.resolve(__dirname, "../dist");

// 第二步：实例化loader
const docLoader = new DocLoader({
  entry,
  output,
  scriptCompileOptions: {},
  typeScriptCompileOptions: {},
  templateCompileOptions: {},
  outputFileExtension: ".md", // 支持.md, .json文件格式
  beforeOutputFileHook: (options) => {
    // 文件输出之前的钩子函数
    const { entry: fileEntry, mdContent } = options;
    const fileName = fileEntry.match(/(\w+)\\index\.vue$/)[1];
    const fullFileName = path.resolve(
      __dirname,
      `../docs/components/ui/${fileName}.md`
    );
    const newMdContent =
      fs.existsSync(fullFileName) && fs.readFileSync(fullFileName, "utf8");

    return {
      fileName,
      fileContent: `${newMdContent}${mdContent}`,
    };
  },
  outputMdFileOptions: {},
});
