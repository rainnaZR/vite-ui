import { PublicProps } from "../types";

export interface TagData {
  style: string | object; // 自定义样式
  icon?: string; // 前缀图标名称
  closable?: boolean; // 是否显示关闭操作，默认为false
}

export type Props = PublicProps<{
  data: TagData;
}>;
