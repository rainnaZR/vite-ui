import { PublicProps } from "../types";

export interface TreeItem {
  id: number | string; // 唯一标识符
  label: string; // 标签内容
  spread?: boolean; // 是否展开
  checked?: boolean; // 是否选中
  disabled?: boolean; // 是否禁用
  children?: TreeItem[]; // 子数组

  depth?: number; // 层级
  parentId?: number | string; // 父级id
}

export interface TreeData {
  list: TreeItem[]; // 树列表
  spreadDepth?: number; // 默认展开树的层级，为0表示全部展开
  spreadConfig?: any; // 默认展开树的配置项
  showCheckbox?: boolean; // 是否展示选择框
}

export type Props = PublicProps<{
  data: TreeData;
}>;
