import type { App } from "vue";

/* 基础组件 */
import HtBreadCrumb from "./src/HtBreadCrumb"; // 面包屑
import HtImage from "./src/HtImage"; // 图片
import HtTab from "./src/HtTab"; // 图片
import HtIcon from "./src/HtIcon"; // Iconfont图标
import HtHeader from "./src/HtHeader"; // 头部
import HtButton from "./src/HtButton"; // 按钮
import HtCountDown from "./src/HtCountdown"; // 倒计时
import HtCopy from "./src/HtCopy"; // 复制
import HtMdDemo from "./src/HtMdDemo"; // 文档demo
import HtInput from "./src/HtInput"; // 输入框

const components: any[] = [
  HtBreadCrumb,
  HtImage,
  HtTab,
  HtIcon,
  HtHeader,
  HtButton,
  HtCountDown,
  HtCopy,
  HtMdDemo,
  HtInput,
];

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  // 注册组件
  components.forEach((component) => app.component(component.name, component));
};

export {
  HtBreadCrumb,
  HtImage,
  HtTab,
  HtIcon,
  HtHeader,
  HtButton,
  HtCountDown,
  HtCopy,
  HtMdDemo,
  HtInput,
};
export default {
  install,
  ...components,
};
