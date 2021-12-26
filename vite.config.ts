import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 路径别名
    alias: {
      "@": resolve(__dirname, "./docs"),
      "~": resolve(__dirname, "./packages"),
    },
  },
});
