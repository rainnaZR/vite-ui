import { App, render, createVNode } from "vue";
import type { VNode } from "vue";
import component from "./index.vue";
import { DialogData } from "./types";

const onRender = (data: any) => {
  const vm: VNode = createVNode(component, data);
  document.body.style.overflow = `${data.lock ? "hidden" : "visible"}`;
  render(vm, document.body);
};

const $dialog = (options: DialogData) => {
  onRender({
    data: options,
    visible: false,
  });
};
$dialog.show = (options: DialogData) => {
  onRender({
    data: options,
    visible: true,
  });
};
$dialog.close = (options: DialogData) => {
  onRender({
    data: options,
    visible: false,
  });
};

// 安装
$dialog.install = (app: App) => {
  app.component(component.name, component);
  app.config.globalProperties.$dialog = $dialog;
};

export default $dialog;
