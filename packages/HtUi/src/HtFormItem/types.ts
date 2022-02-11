import { PublicProps } from "../types";

export interface FormItemData {
  label: string; // 表单项的label标签
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
  labelPosition?: string; // 表单项label位置，left/right/top
}

export type Props = PublicProps<{
  data: FormItemData;
}>;
