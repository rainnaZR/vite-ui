import { PublicProps } from "../types";

export interface InputData {
  wrapStyle?: any; // 输入框容器自定义样式
  inputStyle?: any; // 输入框自定义样式
  type: string; // 输入框类型
  name?: string; // 输入框名称，原生属性
  placeholder?: string; // 输入框placeholder值
  readonly?: boolean; // 输入框是否只读
  disabled?: boolean; // 输入框是否禁用
  autofocus?: boolean; // 输入框是否自动聚焦
  autocomplete?: string; // 输入框自动补全
  maxLength?: number; // 输入框最大字数
  color?: string; // 输入框字体颜色
  borderColor?: string; // 输入框的边框颜色
  focusBorderColor?: string; // 输入框focus的边框颜色
  clearable?: boolean; // 是否展示清空icon
  password?: boolean; // 是否展示密码显示/隐藏icon
  search?: boolean; // 是否展示搜索icon
  prefixIcon?: string; // 自定义前缀icon样式名称，比如u-icon-top
  suffixIcon?: string; // 自定义后缀icon样式名称，比如u-icon-top
  rows?: number; // 多行文本框时的显示行数
}

export type Props = PublicProps<{
  modelValue: string | number;
  data: InputData;
}>;
