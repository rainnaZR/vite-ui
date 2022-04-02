import type { VNode } from "vue";
import { PublicProps } from "../types";

type ToastQueueItem = {
  vm: VNode;
};

export type ToastQueue = ToastQueueItem[];

export interface ToastData {
  style?: object; // 自定义样式，值为样式对象
  type?: string; // 显示的类型，值为 info/success/error/warning
  icon?: string; // 显示的图标
  content: string; // 显示的文案
  duration: number; // 提示持续的时间
  closable?: boolean; // 是否可以关闭
  offset?: number; // 窗口距离顶部的偏移量
}

export type Props = PublicProps<{
  data: ToastData;
}>;
