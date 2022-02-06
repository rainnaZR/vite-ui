import { PublicProps } from "../types";

export interface RadioItem {
  label: string | number; // 单选框标签名
  value: string | number; // 单选框值
  style?: string; // 单选框样式
  disabled?: boolean; // 单选框是否禁用
}

export interface RadioData {
  multiple?: boolean; // 是否是多选，单选框值为false，多选框值为true
  modelValue: string | number | any[]; // 单选框组选中值
  options: RadioItem[]; // 单选框组选项列表值
  column?: number; // 每一行显示的单选框个数
  icon?: string; // 单选框icon名称
  checkedIcon?: string; // 单选框选中icon名称
  iconStyle?: any; // 单选框icon样式
  checkedIconStyle?: any; // 单选框icon选中样式
  disabled?: boolean; // 单选框组是否禁用
}

export type Props = PublicProps<{
  data: RadioData;
}>;
