import { App, render, createVNode } from "vue";
import type { VNode } from "vue";
import component from "./index.vue";
import { DialogData } from "./types";

const onRender = (options: DialogData) => {
  const vm: VNode = createVNode(component, { data: options });
  document.body.style.overflow = `${options.lock ? "hidden" : "visible"}`;
  render(vm, document.body);
};

const $dialog = (options: DialogData) => {
  onRender(options);
};
$dialog.show = (options: DialogData) => {
  options.show = true;
  onRender(options);
};
$dialog.close = (options: DialogData) => {
  options.show = false;
  onRender(options);
};

// 安装
$dialog.install = (app: App) => {
  app.component(component.name, component);
  app.config.globalProperties.$dialog = $dialog;
};

export default $dialog;
