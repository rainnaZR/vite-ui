import { createApp } from "vue";
import "@htfed/base-css";
import "@htfed/markdown-css";
import "@htfed/icon";
import HtUi from "@htfed/ui";
import router from "./router";
import App from "./App.vue";

createApp(App).use(HtUi).use(router).mount("#app");
