import { App, render, createVNode } from "vue";
import type { VNode } from "vue";
import component from "./index.vue";
import { SFCWithInstall } from "../types";

const $loading = (option: { lock: boolean } = { lock: false }) => {
  let vnode: VNode = createVNode(component, {
    style: {
      position: "fixed",
    },
  });
  const show = () => {
    if (option.lock) {
      document.body.style.overflow = "hidden";
    }
    render(vnode, document.body);
  };
  const close = () => {
    render(null, document.body);
    document.body.style.overflow = "visible";
    // vnode = null;
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
    const { show, close } = $loading(option);
    show();
    return {
      close,
    };
  };
};

const Component: SFCWithInstall<typeof component> = component;
export default Component;
