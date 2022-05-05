import { PublicProps } from "../types";

export interface DatePickerData {
  showType?: string; // 展示类型：编辑/详情，可选值edit/detail
  defaultEmptyText?: string; // 内容为空时的占位符
  disabled?: boolean; // 输入框是否禁用
  readonly?: boolean; // 输入框是否只读
  placeholder?: string; // 输入框placeholder值
  clearable?: boolean; // 输入框是否展示清空icon
  name?: string; // 输入框名称，原生属性
  wrapStyle?: any; // 输入框容器自定义样式
  inputStyle?: any; // 输入框自定义样式

  type: string; // 日期选择框类型
  mode: string;
  parsedValue?: any;
  disabledDate?: any;
  defaultTime?: any; // 默认时间
  format?: string; // 格式
}

export type Props = PublicProps<{
  modelValue: string;
  data: DatePickerData;
}>;
