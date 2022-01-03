import { PublicProps } from "../types";

export interface ImageData {
  src: string; // 图片地址
  width?: string | number; // 宽度
  height?: string | number; // 高度
  fill?: string; // 填充方式
  alt?: string; // 图片提示alt
  cssStyle?: string; // 图片样式
}

export type Props = PublicProps<{
  data: ImageData;
}>;
