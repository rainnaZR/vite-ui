import { App, createVNode, render } from "vue";
import component from "./index.vue";
import { ToastData } from "./types";

const onRender = (
  options: string | number | boolean | ToastData,
  extraOptions = {}
) => {
  const data: any = ["string", "number", "boolean"].includes(typeof options)
    ? { content: options }
    : options;
  const vnode: any = createVNode(component, {
    data: {
      ...data,
      ...(extraOptions || {}),
    },
  });
  const container = document.createElement("div");
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
};

const $toast = (options: string | number | boolean | ToastData) => {
  onRender(options);
};

$toast.info = (options: string | number | boolean | ToastData) => {
  onRender(options, {
    type: "info",
  });
};

$toast.success = (options: string | number | boolean | ToastData) => {
  onRender(options, {
    type: "success",
  });
};

$toast.error = (options: string | number | boolean | ToastData) => {
  onRender(options, {
    type: "error",
  });
};

$toast.warning = (options: string | number | boolean | ToastData) => {
  onRender(options, {
    type: "warning",
  });
};

// 安装
$toast.install = (app: App) => {
  app.config.globalProperties.$toast = $toast;
};

export default $toast;
