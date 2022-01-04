import { PublicProps } from "../types";

export interface TabItem {
  label: string; // tab名称
  value?: string | number; // tab值
}

export interface TabData {
  direction: string;
  list: TabItem[];
  currentValue?: string | number;
  color?: string;
  activeColor?: string;
}

export type Props = PublicProps<{
  data: TabData;
}>;
