import nodeResolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import path from "path";

const input = path.join(__dirname, "index.js"); // 入口文件
const output = path.join(__dirname, "dist"); // 输出文件

export default [
  {
    input,
    output: {
      name: "howLongUntilLunch",
      file: `${output}/index.umd.js`,
      format: "umd",
      globals: {
        axios: "axios",
      },
    },
    plugins: [
      terser(),
      nodeResolve(), // so Rollup can find external packages
      commonjs(), // so Rollup can convert external packages to an ES module
      json(),
    ],
    external: ["axios"],
  },
  {
    input,
    output: [
      {
        file: `${output}/index.cjs.js`,
        format: "cjs",
        globals: {
          axios: "axios",
        },
      },
      {
        file: `${output}/index.esm.js`,
        format: "es",
        globals: {
          axios: "axios",
        },
      },
    ],
    plugins: [terser()],
    external: ["axios"],
  },
];
