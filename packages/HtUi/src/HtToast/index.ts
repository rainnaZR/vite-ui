import { App, createVNode, render } from "vue";
import type { VNode } from "vue";
import component from "./index.vue";
import { ToastQueue, ToastData } from "./types";

type Options = string | number | boolean | ToastData | undefined;

const instances: ToastQueue = [];

const onGetOffset = (offset?: number) => {
  let verticalOffset = offset || 20;
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el?.offsetHeight || 0) + 10;
  });
  verticalOffset += 10;
  return verticalOffset;
};

const onRender = (options: Options, extraOptions = {}) => {
  const data: any = ["string", "number", "boolean"].includes(typeof options)
    ? { content: options }
    : options;
  const vm: VNode = createVNode(component, {
    data: {
      ...data,
      ...(extraOptions || {}),
    },
  });
  const container = document.createElement("div");
  render(vm, container);
  // instances.push({ vm });
  document.body.appendChild(container.firstElementChild!);
};

const $toast = (options: Options) => {
  onRender(options);
};
$toast.info = (options: Options) => {
  onRender(options, {
    type: "info",
  });
};
$toast.success = (options: Options) => {
  onRender(options, {
    type: "success",
  });
};
$toast.error = (options: Options) => {
  onRender(options, {
    type: "error",
  });
};
$toast.warning = (options: Options) => {
  onRender(options, {
    type: "warning",
  });
};

// 安装
$toast.install = (app: App) => {
  app.config.globalProperties.$toast = $toast;
};

export default $toast;
