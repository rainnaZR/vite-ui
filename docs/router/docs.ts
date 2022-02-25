import { File, Doc } from "../types";

function load({ fileEntry, fileExtension, callback }: any) {
  if (!fileEntry) return;
  Object.keys(fileEntry).reduce((total: File[], i: any) => {
    if (!fileExtension || i.endsWith(fileExtension)) {
      const fileArr = i.split("/");
      const fileName = fileArr[fileArr.length - 1];
      const nameArr = fileName.split(".");
      const name = nameArr[nameArr.length - 2];
      const options: File = {
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

const docs: Doc[] = [];
const groupDocs = {};
// 除了组件之外的根目录文档，比如introduce.md
const rootDocs = import.meta.globEager("../components/*.md");
// 打包生成的组件文档
const componentDocs = import.meta.globEager("../../dist/*.md");

load({
  fileEntry: {
    ...rootDocs,
    ...componentDocs,
  },
  fileExtension: ".md",
  callback: (options: File) => {
    const { name, fileContent } = options;
    const category =
      fileContent?.default?.$vd?.toc[1]?.content
        ?.replace(/`/g, "")
        ?.split(":")?.[1]
        ?.trim()
        ?.replace(/^\w{1}/g, ($1: string) => $1?.toUpperCase()) || "default";
    const isRecommend =
      fileContent?.default?.$vd?.toc[2]?.content?.replace(/`/g, "") ===
      "Recommend";
    // 构造文档数据
    const doc: Doc = {
      name,
      path: name,
      meta: {
        title: fileContent?.default?.$vd?.toc[0]?.content || name,
        category,
        isRecommend,
      },
      component: fileContent?.default,
    };
    docs.push(doc);
    // 构造分组数据
    groupDocs[category] = groupDocs[category] || [];
    groupDocs[category].push(doc);
  },
});

export default docs;
export { docs, groupDocs };
