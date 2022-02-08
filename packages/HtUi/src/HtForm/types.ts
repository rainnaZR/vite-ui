import { PublicProps } from "../types";

export interface Model {
  [key: string]: any;
}

export interface RuleItem {
  type: string;
  required?: boolean;
  message?: string;
  validator: (value: any) => boolean;
  pattern: RegExp;
}

export type Props = PublicProps<{
  model: Model; // 表单数据对象
  rules: RuleItem[]; // 表单验证规则
}>;
