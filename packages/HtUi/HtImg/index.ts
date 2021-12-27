import type { App } from "vue";
import component from "./index.vue";

// 安装
component.install = (app: App) => {
  app.component(component.name, component);
};

type SFCWithInstall<T> = T & { install(app: App): void };
const Component: SFCWithInstall<typeof component> = component;
export default Component;
