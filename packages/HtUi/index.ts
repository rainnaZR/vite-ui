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
import HtBadge from "./src/HtBadge"; // 徽章
import HtTag from "./src/HtTag"; // 标签
import HtPopover from "./src/HtPopover"; // 气泡弹窗
import HtTooltip from "./src/HtTooltip"; // 工具提示
import HtAvatar from "./src/HtAvatar"; // 头像
import HtInput from "./src/HtInput"; // 输入框
import HtRadio from "./src/HtRadio"; // 单选框
import HtCheckbox from "./src/HtCheckbox"; // 多选框
import HtSwitch from "./src/HtSwitch"; // 开关切换
import HtSelect from "./src/HtSelect"; // 下拉框
import HtUpload from "./src/HtUpload"; // 上传
import HtFormItem from "./src/HtFormItem"; // 表单项
import HtForm from "./src/HtForm"; // 表单
import HtFormPage from "./src/HtFormPage"; // 表单页
import HtCodeInput from "./src/HtCodeInput"; // 验证码输入框
import HtLoginPwd from "./src/HtLoginPwd"; // 密码登录
import HtPager from "./src/HtPager"; // 分页
import HtAction from "./src/HtAction"; // 行动点
import HtLoading from "./src/HtLoading"; // 加载
import HtEmpty from "./src/HtEmpty"; // 空态
import HtToast from "./src/HtToast"; // 提示
import HtDialog from "./src/HtDialog"; // 弹出框

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
  HtBadge,
  HtTag,
  HtPopover,
  HtTooltip,
  HtAvatar,
  HtInput,
  HtRadio,
  HtCheckbox,
  HtSwitch,
  HtSelect,
  HtUpload,
  HtFormItem,
  HtForm,
  HtFormPage,
  HtCodeInput,
  HtLoginPwd,
  HtPager,
  HtAction,
  HtLoading,
  HtEmpty,
  HtToast,
  HtDialog,
];

/**
 * 组件注册
 * @param {App} app Vue 对象
 * @returns {Void}
 */
const install = (app: App) => {
  // 注册组件
  components.forEach((component) => app.use(component));
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
  HtBadge,
  HtTag,
  HtPopover,
  HtTooltip,
  HtAvatar,
  HtInput,
  HtRadio,
  HtCheckbox,
  HtSwitch,
  HtSelect,
  HtUpload,
  HtFormItem,
  HtForm,
  HtFormPage,
  HtCodeInput,
  HtLoginPwd,
  HtPager,
  HtAction,
  HtLoading,
  HtEmpty,
  HtToast,
  HtDialog,
};
export default {
  install,
  ...components,
};
