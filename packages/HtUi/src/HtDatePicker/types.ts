import { PublicProps } from "../types";

export interface DatePickerData {
  wrapStyle?: any; // 输入框容器自定义样式
  showType?: string; // 展示类型：编辑/预览，可选值edit/detail
  defaultEmptyText?: string; // 内容为空时的占位符
  prefixIcon?: string; // 输入框前缀icon
  disabled?: boolean; // 输入框是否禁用
  readonly?: boolean; // 输入框是否只读
  placeholder?: string; // 输入框placeholder值
  name?: string; // 输入框名称，原生属性

  type: string; // 日期选择框类型，可选值year/month/date/dates/week/dateTime/dateTimeRange/dateRange/monthRange
  format?: string; // 日期格式
  parsedValue?: any; // 当前日期
  disabledDate?: any; // 禁止选择的日期
}

export type Props = PublicProps<{
  modelValue: string;
  data: DatePickerData;
}>;
