const fs = require("fs-extra");
const path = require("path");

const content = fs.readFileSync(
  path.resolve(__dirname, "../packages/HtUi/src/HtIcon/iconfont.less"),
  "utf8"
);
const classNames = content
  .match(/\.(u-icon-(\w+)):before/g)
  .map((i) => i.replace(/(^\.|:before$)/g, ""))
  .map((i) => `"${i}"`);
const output = path.join(__dirname, "../dist");

try {
  fs.accessSync(output, fs.constants.R_OK);
} catch (e) {
  fs.mkdirSync(output);
}
fs.writeFileSync(
  path.join(output, "icon.js"),
  `export default [${classNames}]`
);
