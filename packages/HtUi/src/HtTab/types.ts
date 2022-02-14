import { PublicProps } from "../types";

export interface TabItem {
  label: string; // tab名称
  value?: string | number; // tab值
  icon?: string; // icon图标
  children?: Array<TabItem>; // 子tab列表
}

export interface TabData {
  modelValue?: string | number | any[]; // 当前定位导航的value值
  direction?: string; // 导航显示方式，水平显示row或垂直显示column
  list: TabItem[]; // 导航列表，item数组，item格式为：{label: '', value: '', icon: '', children: []}
  color?: string; // 导航默认文字颜色
  activeColor?: string; // 导航选中文字颜色
  activeBgColor?: string; // 导航选中背景颜色
}

export type Props = PublicProps<{
  data: TabData;
}>;
