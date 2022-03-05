import { PublicProps } from "../types";

export interface BadgeData {
  style?: string | object; // 自定义样式
  content: string; // 文本内容
  max?: number; // 最大数量
}

export type Props = PublicProps<{
  data: BadgeData;
}>;
