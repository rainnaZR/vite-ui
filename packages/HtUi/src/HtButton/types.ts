import { PublicProps } from "../types";

export interface ButtonData {
  type: string; // 类型
  size?: string; // 尺寸
  nativeType?: string; // 原生类型
  disabled?: boolean; // 是否禁用
  full?: boolean; // 是否宽度占满
  buttonStyle?: string; // 样式
}

export type Props = PublicProps<{
  data: ButtonData;
}>;
