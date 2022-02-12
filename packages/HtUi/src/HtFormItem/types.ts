import { PublicProps } from "../types";

export interface RuleItem {
  required: boolean;
  message?: string;
  trigger?: string;
  pattern?: RegExp;
  validator?: (value: any) => boolean;
}

export interface FormItemData {
  prop?: string; // 表单项对应的表单属性值
  label: string; // 表单项的label标签
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
  labelPosition?: string; // 表单项label位置，left/right/top
  required?: boolean; // 表单项是否必填
  rules?: RuleItem[]; // 表单项校验规则
  showValidMessage?: boolean; // 是否显示校验错误信息，默认true
  error?: string; // 表单项校验错误信息
}

export type Props = PublicProps<{
  data: FormItemData;
}>;
