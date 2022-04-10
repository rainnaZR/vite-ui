import { PublicProps } from "../types";

export interface TreeItem {
  id: number | string; // 唯一标识符
  label: string; // 标签内容
  disabled?: boolean; // 是否禁用
  children?: TreeItem[]; // 子标签数组
}

export interface TreeData {
  list: TreeItem[]; // 树列表
  showCheckbox?: boolean; // 是否展示选择框
}

export type Props = PublicProps<{
  data: TreeData;
}>;
