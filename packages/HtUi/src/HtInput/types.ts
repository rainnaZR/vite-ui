import { PublicProps } from "../types";

export interface InputData {
  modelValue: string | number; // input输入框中的值
  type?: string; // 输入框类型
  placeholder?: string; // 输入框placeholder值
  readonly?: boolean; // 输入框是否只读
  disabled?: boolean; // 输入框是否禁用
  maxLength?: number; // 输入框最大字数
  color?: string; // 输入框字体颜色
  borderColor?: string; // 输入框的边框颜色
  focusBorderColor: string; // 输入框focus的边框颜色
  clearable?: boolean; // 是否展示清空icon
  style?: string; // 输入框自定义样式
}

export type Props = PublicProps<{
  data: InputData;
}>;
