import { PublicProps } from "../types";

export interface ToastData {
  style?: string | object; // 样式
  type?: string; // 类型
  icon?: string; // 图标
  content: string; // 显示文案
  duration: number; // 持续时间
}

export type Props = PublicProps<{
  data: ToastData;
}>;
