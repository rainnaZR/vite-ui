import { PublicProps } from "../types";

export interface FormItemData {
  label: string; // 表单项的label标签
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
}

export type Props = PublicProps<{
  data: FormItemData;
}>;
