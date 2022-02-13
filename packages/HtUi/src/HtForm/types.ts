import { PublicProps } from "../types";
import { RuleItem } from "../HtFormItem/types";

export interface Model {
  [key: string]: any;
}

export interface Rules {
  [key: string]: RuleItem[];
}

export interface FormData {
  model: Model; // 表单数据对象
  rules?: Rules; // 表单验证规则
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
  labelPosition?: string; // 表单项label位置，left/right/top
  showValidMessage?: boolean; // 是否显示校验错误信息，默认true
  formStyle?: any; // 表单自定义样式
  disabled?: boolean; // 表单是否禁用
}

export type Props = PublicProps<{
  data: FormData;
}>;
