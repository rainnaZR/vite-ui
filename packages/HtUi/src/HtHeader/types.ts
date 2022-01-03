import { PublicProps } from "../types";

export interface TabItem {
  label: string;
  value?: string | number;
}

export interface HeaderData {
  logoUrl: string;
  logoWidth?: string | number;
  logoHeight?: string | number;
  logoAlt?: string;
  logoText?: string;
  tabList: TabItem[];
  tabCurrentValue?: number | string;
  tabColor?: string;
  tabActiveColor?: string;
}

export type Props = PublicProps<{
  data: HeaderData;
}>;
