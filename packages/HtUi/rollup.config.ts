import nodeResolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue"; // 处理vue文件
import less from "rollup-plugin-less";
import { terser } from "rollup-plugin-terser";
import { readdirSync } from "fs"; // 写文件
import path from "path";

const input = path.join(__dirname, "src"); // 入口文件
const output = path.join(__dirname, "dist"); // 输出文件
const config = readdirSync(input)
  .filter((name) => !["theme", "index.ts", "types.ts"].includes(name))
  .map((name) => ({
    input: `${input}/${name}/index.ts`,
    external: [
      "vue",
      "@htfed/utils",
      "@wangeditor/editor",
      "@wangeditor/editor-for-vue@next",
      "dayjs",
      "xe-utils",
      "vxe-table",
    ],
    plugins: [
      nodeResolve(),
      vue(),
      less({
        output: `${output}/index.css`,
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
          exclude: ["node_modules", "docs", "tests"],
        },
        abortOnError: false,
        clean: true,
      }),
      terser(),
    ],
    output: {
      name,
      file: `${output}/${name}/index.js`,
      format: "es",
    },
  }));
config.push({
  input: path.join(__dirname, "index.ts"),
  output: {
    name: "index",
    format: "es",
    file: `${output}/index.esm.js`,
  },
  plugins: [
    nodeResolve(),
    vue({
      target: "browser",
      exposeFilename: false,
    }),
    less({
      output: `${output}/index.css`,
    }),
    typescript({
      useTsconfigDeclarationDir: false,
      tsconfigOverride: {
        include: ["*"],
        exclude: ["node_modules", "docs", "tests"],
      },
      abortOnError: false,
    }),
    terser(),
  ],
  external: [
    "vue",
    "@htfed/utils",
    "@wangeditor/editor",
    "@wangeditor/editor-for-vue@next",
    "dayjs",
    "xe-utils",
    "vxe-table",
  ],
});
export default config;
