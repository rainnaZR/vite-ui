import { PublicProps } from "../types";

export interface SwitchData {
  modelValue: boolean; // 开关值，true打开，false关闭
  disabled?: boolean; // 开关是否禁用
  style?: any; // 开关自定义样式
  activeColor?: string; // 开关激活背景色
  inActiveColor?: string; // 开关未激活背景色
  circleColor?: string; // 开关圆形按钮背景色
}

export type Props = PublicProps<{
  data: SwitchData;
}>;
