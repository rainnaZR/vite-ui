import { PublicProps } from "../types";

export interface EmptyData {
  style?: string | object; // 空态样式
  image?: string; // 空态图片配置
  content?: string; // 空态文字内容，支持html字符串
}

export type Props = PublicProps<{
  data: EmptyData;
}>;
