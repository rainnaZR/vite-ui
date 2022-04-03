import { PublicProps } from "../types";
import { ButtonData } from "../HtButton/types";

export interface DialogData {
  wrapStyle?: string | object; // 弹窗外部样式
  style?: object; // 弹窗样式
  headerStyle?: string | object; // 弹窗顶部样式
  contentStyle?: string | object; // 弹窗内容样式
  footerStyle?: string | object; // 弹窗底部样式
  closable?: boolean; // 是否显示关闭按钮
  maskClosable?: boolean; // 蒙层是否操作关闭
  type?: string; // 弹窗类型
  width?: string | number; // 弹窗宽度
  height?: string | number; // 弹窗高度
  title?: string | number; // 弹窗标题
  content?: string | number; // 弹窗内容
  footerTips?: string | number; // 弹窗底部提示内容
  hideHeader?: boolean; // 是否隐藏顶部
  hideFooter?: boolean; // 是否隐藏底部
  hideConfirmButton?: boolean; // 是否隐藏确认按钮
  hideCancelButton?: boolean; // 是否隐藏取消按钮
  confirmButton?: ButtonData; // 确认按钮信息
  cancelButton?: ButtonData; // 取消按钮信息
}

export type Props = PublicProps<{
  visible: boolean; // 是否显示
  data: DialogData;
}>;
