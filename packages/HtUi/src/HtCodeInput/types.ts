import { PublicProps } from "../types";

export interface CodeInputData {
  wrapStyle?: any; // 输入框容器自定义样式
  inputStyle?: any; // 输入框自定义样式
  placeholder?: string; // 输入框placeholder值
  disabled?: boolean; // 输入框是否禁用
  color?: string; // 输入框字体颜色
  borderColor?: string; // 输入框的边框颜色
  focusBorderColor?: string; // 输入框focus的边框颜色
  clearable?: boolean; // 是否展示清空icon

  verifyImgWidth?: number; // 验证码图片宽度
  verifyImgHeight?: number; // 验证码图片高度
  verifyImgUrl: string; // 验证码图片地址
}

export type Props = PublicProps<{
  modelValue: string | number;
  data: CodeInputData;
}>;
