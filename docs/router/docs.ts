import { Docs, Doc } from "../types/interface";

function load({ fileExtension, callback }: any) {
  const comps = import.meta.globEager("../components/*.md");
  if (!comps) return;

  Object.keys(comps).reduce((total: Doc[], i: any) => {
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
        fileContent: comps[i],
      };
      total.push(options);
      callback && callback(options);
    }
    return total;
  }, []);
}

const docs: Docs[] = [];
load({
  fileExtension: ".md",
  callback: (options: Doc) => {
    docs.push({
      name: options.name,
      path: options.name,
      meta: {
        title: options.name,
      },
      component: options.fileContent,
    });
  },
});
export default docs;
