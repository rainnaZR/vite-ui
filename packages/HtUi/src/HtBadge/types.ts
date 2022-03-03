import { PublicProps } from "../types";

export interface BadgeData {
  style?: string | object; // 自定义样式
  text: string; // 文本内容
}

export type Props = PublicProps<{
  data: BadgeData;
}>;