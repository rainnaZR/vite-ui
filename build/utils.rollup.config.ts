import nodeResolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import utilPkg from "../packages/HtUtils/package.json";

export default [
  {
    input: "packages/HtUtils/index.js",
    output: {
      name: "howLongUntilLunch",
      file: `packages/HtUtils/${utilPkg.browser}`,
      format: "umd",
    },
    plugins: [
      nodeResolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      json(),
    ],
    external: ["axios"],
  },
  {
    input: "packages/HtUtils/index.js",
    external: ["ms", "axios"],
    output: [
      { file: `packages/HtUtils/${utilPkg.main}`, format: "cjs" },
      { file: `packages/HtUtils/${utilPkg.module}`, format: "es" },
    ],
  },
];
