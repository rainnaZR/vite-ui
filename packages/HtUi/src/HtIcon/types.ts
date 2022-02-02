import { PublicProps } from "../types";

export interface IconData {
  name: string; // icon的样式名
  style?: string; // icon自定义样式
}

export type Props = PublicProps<{
  data: IconData;
}>;
