import nodeResolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何查找外部模块
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import utilPkg from "../packages/HtUtils/package.json";

export default [
  {
    input: "packages/HtUtils/index.js",
    output: {
      name: "howLongUntilLunch",
      file: `packages/HtUtils/${utilPkg.browser}`,
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
    input: "packages/HtUtils/index.js",
    output: [
      {
        file: `packages/HtUtils/${utilPkg.main}`,
        format: "cjs",
        globals: {
          axios: "axios",
        },
      },
      {
        file: `packages/HtUtils/${utilPkg.module}`,
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
