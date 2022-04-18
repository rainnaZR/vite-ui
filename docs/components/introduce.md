# 简介

一款轻量级、基于Vue3的PC端组件库。

## 特性

- 基于vue3 + vite 开发。
- 基于rollup打包，总包体积较小。

## 使用

::: CopyCode
```JavaScript
import { createApp } from "vue";
import App from "./App.vue";
import HtUi from "@htfed/ui";
import "@htfed/ui/dist/index.css";

createApp(App).use(HtUi).mount("#app");
```
:::