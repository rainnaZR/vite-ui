import { PublicProps } from "../types";

export interface RadioItem {
  label: string | number; // 选择框标签名
  value: string | number; // 选择框值
  style?: string; // 选择框样式
  disabled?: boolean; // 选择框是否禁用
}

export interface RadioData {
  showType?: string; // 展示类型：编辑/详情，可选值edit/detail
  multiple?: boolean; // 是否是多选，单选框值为false，多选框值为true
  options: RadioItem[]; // 选择框组选项值，item数组，item格式为：{label:'', value:'', style:{}, disabled: ''}
  column?: number; // 每一行显示的选择框个数
  icon?: string; // 选择框icon名称
  checkedIcon?: string; // 选择框选中icon名称
  iconStyle?: any; // 选择框icon样式
  checkedIconStyle?: any; // 选择框icon选中样式
  style?: any; // 选择框样式
  checkedStyle?: any; // 选择框选中样式
  disabled?: boolean; // 选择框组是否禁用
}

export type Props = PublicProps<{
  modelValue: string | number | any[];
  data: RadioData;
}>;
