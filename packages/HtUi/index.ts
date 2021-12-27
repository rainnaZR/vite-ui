import type { App } from "vue";

/* 基础组件 */
import HtCountdown from "./HtCountdown"; // 倒计时
import HtImg from "./HtImg"; // 图片

const components: any[] = [HtCountdown, HtImg];

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  // 注册组件
  components.forEach((component) => app.component(component.name, component));
};

export { HtCountdown, HtImg };
// 全部导出
export default {
  install,
  ...components,
};
