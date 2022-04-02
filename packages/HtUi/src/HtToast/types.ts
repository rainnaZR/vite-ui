import { PublicProps } from "../types";

export interface ToastData {
  style?: string | object; // 自定义样式
  type?: string; // 显示的类型，值为 info/success/error/warning
  icon?: string; // 显示的图标
  content: string; // 显示的文案
  duration: number; // 提示持续的时间
}

export type Props = PublicProps<{
  data: ToastData;
}>;
