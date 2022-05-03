import type { App } from "vue";
import component from "./index.vue";
import { SFCWithInstall } from "../types";

// 安装
component.install = (app: App) => {
  app.component(component.name, component);
};

const Component: SFCWithInstall<typeof component> = component;
export default Component;
