import { PublicProps } from "../types";

export interface TabItem {
  label: string;
  value?: string | number;
}

export interface HeaderData {
  logoUrl: string; // logo图片链接
  logoWidth?: string | number; // logo图片宽度
  logoHeight?: string | number; // logo图片高度
  logoAlt?: string; // logo图片提示alt值
  logoText?: string; // logo标语
  tabList: TabItem[]; // 导航列表，item数组，item格式为：{label:'', value:''}
  tabCurrentValue?: number | string | any[]; // 当前定位的导航value值
  tabStyle?: string; // 导航样式
  tabActiveStyle?: string; // 导航选中样式
}

export type Props = PublicProps<{
  data: HeaderData;
}>;
