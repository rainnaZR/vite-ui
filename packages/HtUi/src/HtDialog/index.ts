import { App, render, createVNode } from "vue";
import type { VNode } from "vue";
import component from "./index.vue";
import { DialogData } from "./types";

const onRender = (data: any) => {
  const vm: VNode = createVNode(component, data);
  const container = document.createElement("div");
  render(vm, container);
  document.body.appendChild(container.firstElementChild!); // 把虚拟DOM插入到真实DOM树中
  document.body.style.overflow = "hidden";
  return vm.component;
};

let instance: any;
const $dialog = {
  show(options: DialogData) {
    instance = onRender({
      data: options,
      visible: true,
    });
  },
  close() {
    instance?.proxy?.onCancel();
    instance = null;
  },
  install(app: App) {
    app.component(component.name, component);
    app.config.globalProperties.$dialog = $dialog;
  },
};

export default $dialog;
