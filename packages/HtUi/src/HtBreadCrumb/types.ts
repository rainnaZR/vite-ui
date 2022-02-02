import { PublicProps } from "../types";

export interface BreadCrumbItem {
  name: string; // 面包屑名称
}

export interface BreadCrumbData {
  list: BreadCrumbItem[]; // 面包屑列表
  separator?: string; // 面包屑分隔符
  color?: string; // 面包屑默认字体颜色
  activeColor?: string; // 当前选中面包屑文字颜色
}

export type Props = PublicProps<{
  data: BreadCrumbData;
}>;
