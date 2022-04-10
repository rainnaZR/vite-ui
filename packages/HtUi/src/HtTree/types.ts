import { PublicProps } from "../types";

export interface TreeItem {
  id: number | string; // 唯一标识符
  label: string; // 标签内容
  spread?: boolean; // 是否展开
  disabled?: boolean; // 是否禁用
  children?: TreeItem[]; // 子数组
  depth?: number; // 层级
}

export interface TreeData {
  list: TreeItem[]; // 树列表
  spreadDepth?: number; // 展开层级树，为-1表示全部展开
  showCheckbox?: boolean; // 是否展示选择框
}

export type Props = PublicProps<{
  data: TreeData;
}>;
