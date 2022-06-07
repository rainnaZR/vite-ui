import { PublicProps } from "../types";

export interface ActionItem {
  type: string; // 行动点类型
  btnType?: string; // 行动点按钮类型
  size?: string; // 行动点按钮大小
  icon?: string; // 行动点按钮图标
  iconStyle?: string | object; // 行动点按钮图标样式
  content: string; // 行动点按钮文案
}

export interface ActionData {
  list: string[] | ActionItem[]; // 行动点列表
  hideLine?: boolean; // 是否隐藏分割线
}

export type Props = PublicProps<{
  data: ActionData;
}>;
