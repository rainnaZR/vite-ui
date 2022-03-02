import { PublicProps } from "../types";

export interface PopoverData {
  style?: any; // 自定义容器样式
  text: string; // 展示的文本内容
  position?: string; // 弹出内容显示的坐标位置
}

export type Props = PublicProps<{
  data: PopoverData;
}>;
