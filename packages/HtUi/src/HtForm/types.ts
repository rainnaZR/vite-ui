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
  labelPosition?: string; // label的位置，left/right/top
  labelWidth?: string | number; // label宽度
  showValidMessage?: boolean; // 是否显示校验错误信息
  showValidIcon?: boolean; // 是否显示校验图标
  formStyle?: any; // 表单自定义样式
  disabled?: boolean; // 表单是否禁用
}

export type Props = PublicProps<{
  data: FormData;
}>;
