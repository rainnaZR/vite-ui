import { createApp } from "vue";
import HtUi from "@htfed/ui";
import router from "./router";
import App from "./App.vue";

createApp(App).use(HtUi).use(router).mount("#app");
