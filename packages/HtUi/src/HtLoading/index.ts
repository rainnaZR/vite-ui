import type { App, render, createVNode } from "vue";
import component from "./index.vue";
import { SFCWithInstall } from "../types";

const Loading = (option: { lock: boolean } = { lock: false }) => {
  let vnode: any = createVNode(component, {
    style: {
      position: "fixed",
    },
  });
  const show = () => {
    option.lock && (document.body.style.overflow = "hidden");
    render(vnode, document.body);
  };
  const close = () => {
    render(null, document.body);
    document.body.style.overflow = "visible";
    vnode = null;
  };
  return {
    show,
    close,
  };
};

// 安装
component.install = (app: App) => {
  app.component(component.name, component);

  app.directive("loading", {
    mounted(el, binding) {
      if (binding.value === true) {
        el.style.position = "relative";
        render(createVNode(component), el);
      }
    },
    updated(el, binding) {
      if (binding.value === true) {
        el.style.position = "relative";
        render(createVNode(component), el);
      } else {
        el.style.position = "";
        render(null, el);
      }
    },
    unmounted(el) {
      el.style.position = "";
      render(null, el);
    },
  });

  app.config.globalProperties.$loading = (option: { lock: boolean }) => {
    const { show, close } = Loading(option);
    show();
    return {
      close,
    };
  };
};

const Component: SFCWithInstall<typeof component> = component;
export default Component;
