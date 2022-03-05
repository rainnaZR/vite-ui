import { PublicProps } from "../types";

export interface TagData {
  isActive?: boolean; // 是否激活，布尔值，默认为false
  style: string | object; // 自定义样式
  activeStyle: string | object; // 自定义激活样式
  icon?: string; // 前缀图标名称
  closable?: boolean; // 是否显示关闭操作，默认为false
}

export type Props = PublicProps<{
  data: TagData;
}>;
