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
  tabCurrentValue?: number | string; // 当前定位的导航value值
  tabColor?: string; // 导航颜色值
  tabActiveColor?: string; // 导航选中的颜色值
}

export type Props = PublicProps<{
  data: HeaderData;
}>;
