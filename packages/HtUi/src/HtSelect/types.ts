import { PublicProps } from "../types";

export interface SelectItem {
  label: string | number; // 下拉框标签名
  value: string | number; // 下拉框值
  disabled?: boolean; // 下拉框选项是否禁用
}

export interface SelectData {
  showType?: string; // 展示类型：编辑/预览，可选值edit/detail
  defaultEmptyText?: string; // 内容为空时的占位符
  options: SelectItem[]; // 下拉框选项值，item数组，item格式为：{label:'', value:'', disabled: ''}
  optionsPosition?: string; // 下拉框选项位置，可选值有top/bottom，默认值为bottom
  multiple?: boolean; // 下拉框是否是多选
  disabled?: boolean; // 下拉框是否全部禁用
  maxCount?: number; // 下拉框选择最大数量
  emptyText?: string; // 下拉框为空时的文案
  tabIndex?: number; // 下拉框tab索引值
  optionsStyle?: any; // 下拉框选择项样式
  placeholder?: string; // 输入框placeholder值
  borderColor?: string; // 输入框的边框颜色
  focusBorderColor?: string; // 输入框focus的边框颜色
  inputStyle?: any; // 输入框自定义样式
  inputWrapStyle?: string; // 输入框外层自定义样式
  clearable?: boolean; // 输入框是否展示清空icon
  filterable?: boolean; // 输入框是否启动筛选
}

export type Props = PublicProps<{
  modelValue: string | number | any[];
  data: SelectData;
}>;
