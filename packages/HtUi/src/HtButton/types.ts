import { PublicProps } from "../types";

export interface ButtonData {
  type: string; // 按钮类型
  size?: string; // 按钮尺寸
  nativeType?: string; // 按钮原生类型
  disabled?: boolean; // 按钮是否禁用
  full?: boolean; // 按钮是否宽度占满
  buttonStyle?: string; // 按钮自定义样式
}

export type Props = PublicProps<{
  data: ButtonData;
}>;
