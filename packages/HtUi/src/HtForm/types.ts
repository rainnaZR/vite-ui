/* eslint-disable no-unused-vars */
import type { InjectionKey } from "vue";
import { PublicProps } from "../types";
import { RuleItem, FormItemContext } from "../HtFormItem/types";

export interface Model {
  [key: string]: any;
}

export interface Rules {
  [key: string]: RuleItem[];
}

export interface FormData {
  model: Model; // 表单数据对象
  rules?: Rules; // 表单验证规则
  size?: string; // 表单大小，small/normal/big, 默认值normal
  inline?: boolean; // 是否行内表单
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
  labelPosition?: string; // 表单项label位置，left/right/top，默认值right
  contentStyle?: any; // 表单项content样式
  formStyle?: any; // 表单自定义样式
  showValidMessage?: boolean; // 是否显示验证错误信息，默认true
  disabled?: boolean; // 表单是否禁用
  defaultEmptyText?: string; // 表单项为空值时展示的内容
}

export interface FormContext {
  data: FormData;
  onAddField(field: FormItemContext): void;
  onRemoveField(field: FormItemContext): void;
  onReset(targetProps?: string | string[]): void;
  onValidate(targetProps?: string | string[]): Promise<any>;
  onClearValidate(targetProps?: string | string[]): void;
  onScrollToField: (prop: string) => void;
}

export const formKey: InjectionKey<FormContext> = Symbol("form");

export type Props = PublicProps<{
  data: FormData;
}>;
