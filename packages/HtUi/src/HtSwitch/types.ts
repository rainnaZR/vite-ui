import { PublicProps } from "../types";

export interface SwitchData {
  modelValue: boolean; // 开关值，true打开，false关闭
  activeColor?: string; // 开关激活颜色
  inActiveColor?: string; // 开关未激活颜色
  circleColor?: string; // 开关滑块颜色
  style?: any; // 开关自定义样式
  disabled?: boolean; // 开关是否禁用
}

export type Props = PublicProps<{
  data: SwitchData;
}>;
