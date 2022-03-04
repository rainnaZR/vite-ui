import { PublicProps } from "../types";

export interface AvatarData {
  type: string; // 头像显示方式，图片/文字
  width?: number; // 头像宽度
  height?: number; // 头像高度
  src?: string; // 头像图片路径
  defaultImg?: string; // 头像图片默认地址
  content: string; // 头像文字内容
  style?: object; // 自定义样式
  limit?: number; // 显示字数
}

export type Props = PublicProps<{
  data: AvatarData;
}>;
