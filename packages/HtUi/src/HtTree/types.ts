import { PublicProps } from "../types";

export interface TreeItem {
  id: number | string; // 唯一标识符
  label: string; // 标签内容
  spread?: boolean; // 是否展开
  checked?: number | boolean; // 是否选中
  disabled?: boolean; // 是否禁用
  children?: TreeItem[]; // 子数组

  parentId?: number; // 父级ID
  depth?: number; // 层级
  indexArr?: number[]; // 索引路径
}

export interface TreeData {
  list: TreeItem[]; // 树列表
  spreadDepth?: number; // 默认展开树的层级，为0表示全部展开
  spreadConfig?: any; // 默认展开树的配置项
  showCheckbox?: boolean; // 是否展示选择框
  checkedConfig?: any; // 默认选中项配置
}

export type Props = PublicProps<{
  data: TreeData;
}>;
