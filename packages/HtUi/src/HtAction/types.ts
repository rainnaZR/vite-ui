import { PublicProps } from "../types";

export interface ActionItem {
  type: string; // 行动点类型
  content: string; // 行动点文案
}

export interface ActionData {
  list: string[] | ActionItem[]; // 行动点列表
  hideLine?: boolean; // 是否隐藏分割线
}

export type Props = PublicProps<{
  data: ActionData;
}>;
