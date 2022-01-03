import type { App } from "vue";

/* 基础组件 */
import HtImage from "./src/HtImage"; // 图片
import HtTab from "./src/HtTab"; // 图片
import HtHeader from "./src/HtHeader"; // 头部
import HtCountDown from "./src/HtCountdown"; // 倒计时

const components: any[] = [HtImage, HtTab, HtHeader, HtCountDown];

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  // 注册组件
  components.forEach((component) => app.component(component.name, component));
};

export { HtCountDown, HtImage };
// 全部导出
export default {
  install,
  ...components,
};
