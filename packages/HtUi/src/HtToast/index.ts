import { App, createVNode, render } from "vue";
import component from "./index.vue";
import { ToastData } from "./types";

const $toast = (options: string | number | boolean | ToastData) => {
  const data = ["string", "number", "boolean"].includes(typeof options)
    ? { content: options }
    : options;
  const vnode: any = createVNode(component, { data });
  const container = document.createElement("div");
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
};

// 安装
$toast.install = (app: App) => {
  app.config.globalProperties.$toast = $toast;
};

export default $toast;
