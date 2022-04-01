import { PublicProps } from "../types";

export interface LoadingData {
  style?: string | object; // loading样式
  media?: string; // loading加载图片配置
  content?: string; // loading文字内容，支持html字符串
}

export type Props = PublicProps<{
  data: LoadingData;
}>;
