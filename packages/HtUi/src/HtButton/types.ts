import { PublicProps } from "../types";

export interface ButtonData {
  type: string; // 按钮类型
  size?: string; // 按钮尺寸
  nativeType?: string; // 按钮原生类型
  disabled?: boolean; // 按钮是否禁用
  full?: boolean; // 按钮是否宽度占满
  style?: any; // 按钮自定义样式
  icon?: string; // 按钮图标
  iconStyle?: any; // 按钮图标样式
  content?: string | number; // 按钮文字
}

export type Props = PublicProps<{
  data: ButtonData;
}>;
