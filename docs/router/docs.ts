import { Docs, Doc } from "../types";

function load({ fileEntry, fileExtension, callback }: any) {
  if (!fileEntry) return;
  Object.keys(fileEntry).reduce((total: Doc[], i: any) => {
    if (!fileExtension || i.endsWith(fileExtension)) {
      const fileArr = i.split("/");
      const fileName = fileArr[fileArr.length - 1];
      const nameArr = fileName.split(".");
      const name = nameArr[nameArr.length - 2];
      const options: Doc = {
        name,
        fileName,
        fileExtension,
        filePath: i,
        fileContent: fileEntry[i],
      };
      total.push(options);
      callback && callback(options);
    }
    return total;
  }, []);
}

const docs: Docs[] = [];
// 除了组件之外的根目录文档，比如introduce.md
const componentDocs = import.meta.globEager("../components/*.md");
// 打包生成的组件文档
const disDocs = import.meta.globEager("../../dist/*.md");

load({
  fileEntry: {
    ...componentDocs,
    ...disDocs,
  },
  fileExtension: ".md",
  callback: (options: Doc) => {
    docs.push({
      name: options.name,
      path: options.name,
      meta: {
        title:
          options.fileContent?.default?.$vd?.toc[0]?.content || options.name,
      },
      component: options.fileContent.default,
    });
  },
});

export default docs;
