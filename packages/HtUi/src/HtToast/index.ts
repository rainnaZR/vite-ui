import { App, createVNode, render } from "vue";
import component from "./index.vue";
import { SFCWithInstall } from "../types";
import { ToastData } from "./types";

const $toast = (options: ToastData) => {
  const vm = createVNode(component, options);
  const el = document.createElement("div");
  render(vm, el);
  document.body.appendChild(el.firstElementChild!);
};

// 安装
component.install = (app: App) => {
  app.component(component.name, component);

  app.config.globalProperties.$toast = $toast;
};

const Component: SFCWithInstall<typeof component> = component;
export default Component;
