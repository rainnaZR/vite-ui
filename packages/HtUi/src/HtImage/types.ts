import { PublicProps } from "../types";

export interface ImageData {
  src: string; // 图片地址
  width?: string | number; // 图片宽度
  height?: string | number; // 图片高度
  fit?: string; // 图片填充方式，值为cover, contain
  alt?: string; // 图片提示alt
  cssStyle?: string; // 图片自定义样式
}

export type Props = PublicProps<{
  data: ImageData;
}>;
