import { PublicProps } from "../types";

export interface MenuItem {
  label: string;
  value: string | number;
  path?: string;
}

export interface HeaderData {
  logoUrl?: string;
  logoText?: string;
  menuList?: MenuItem[];
}

export type Props = PublicProps<{
  data: HeaderData;
}>;
