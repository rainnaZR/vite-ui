import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginVuedoc from "vite-plugin-vuedoc";
import { vitePluginVuedocConfig, vueConfig } from "./config/vite.plugins";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginVuedoc(vitePluginVuedocConfig), vue(vueConfig)],
  resolve: {
    // 路径别名
    alias: {
      "@": resolve(__dirname, "./docs"),
      "~": resolve(__dirname, "./packages"),
    },
  },
});
