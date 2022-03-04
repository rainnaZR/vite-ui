import { PublicProps } from "../types";

export interface PopoverData {
  width?: string | number; // 弹出窗宽度，带单位
  style?: string | object; // 容器样式
  arrowStyle?: string | object; // 弹出窗箭头样式
  contentStyle?: string | object; // 弹出窗内容样式
  content: string; // 展示的文本内容
  popContent?: string | number; // 弹出窗内容
  position?: string; // 弹出窗位置，默认值为bottom-center
  hideArrow?: boolean; // 弹出窗的箭头是否隐藏，默认值为false
  trigger?: string; // 弹出窗触发方式，可选项有hover/click，默认值为hover
  tabIndex?: number; // 组件的tabIndex值
  offset?: number; // 弹出窗偏移量，值为数字，默认值为10
}

export type Props = PublicProps<{
  modelValue?: boolean; // 是否显示弹出窗
  data: PopoverData; // 配置数据
}>;
