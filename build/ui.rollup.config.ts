import nodeResolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue"; // 处理vue文件
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { readdirSync } from "fs"; // 写文件

const pkgDir = "packages/HtUi"; // 包名目录
const input = `${pkgDir}/src`; // 入口文件
const output = `${pkgDir}/dist`; // 输出文件
const config = readdirSync(input)
  .filter((name) => !["theme", "index.ts", "types.ts"].includes(name))
  .map((name) => ({
    input: `${input}/${name}/index.ts`,
    external: ["vue"],
    plugins: [
      nodeResolve(),
      vue(),
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
      commonjs(),
      json(),
    ],
    output: {
      name,
      file: `${output}/${name}/index.js`,
      format: "es",
    },
  }));
config.push({
  input: `${pkgDir}/index.ts`,
  output: {
    name: "index",
    format: "es",
    file: `${output}/index.esm.js`,
  },
  plugins: [
    terser(),
    nodeResolve(),
    vue({
      target: "browser",
      exposeFilename: false,
    }),
    typescript({
      useTsconfigDeclarationDir: false,
      tsconfigOverride: {
        include: ["packages/**/*"],
        exclude: ["node_modules", "docs", "tests"],
      },
      abortOnError: false,
    }),
    commonjs(),
    json(),
  ],
  external: ["vue"],
});
export default config;
