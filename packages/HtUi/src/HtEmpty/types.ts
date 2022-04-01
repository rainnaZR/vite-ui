import { PublicProps } from "../types";

export interface EmptyData {
  style?: string | object; // 样式
  image?: string; // 图片
  content?: string; // 文字内容，支持html字符串
  hideImage?: boolean; // 是否隐藏图片
  hideContent?: boolean; // 是否隐藏文字内容
}

export type Props = PublicProps<{
  data: EmptyData;
}>;
