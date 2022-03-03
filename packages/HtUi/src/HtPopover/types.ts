import { PublicProps } from "../types";

export interface PopoverData {
  width?: string | number; // 弹出框宽度
  style?: string | object; // 自定义容器样式
  arrowStyle?: string | object; // 弹出层箭头样式
  contentStyle?: string | object; // 弹出层内容样式
  text: string; // 展示的文本内容
  position?: string; // 弹出内容显示的坐标位置
  hideArrow?: boolean; // 是否隐藏弹出窗的箭头标识
  trigger?: string; // 弹出层触发方式
  tabIndex?: number; // 组件的tabIndex值
  offset?: number; // 弹出层偏移值，为数字
}

export type Props = PublicProps<{
  modelValue?: boolean; // 是否显示弹出窗
  data: PopoverData; // 配置数据
}>;
