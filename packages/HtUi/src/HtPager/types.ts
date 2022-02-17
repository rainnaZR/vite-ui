import { PublicProps } from "../types";
import { ButtonData } from "../HtButton/types";

export interface PagerItem {
  type: string;
  value: number;
}

export interface PagerData {
  total: number; // 总条数
  pageSizes?: Array<number>; // 每页页码选项
  layout?: string; // 分页模块布局
  pageShowLimit?: number; // 页码展示数量限制
  disabled?: boolean; // 翻页器是否禁用
  wrapStyle?: any; // 翻页器容器样式，值为字符串或样式对象
  pagerItemStyle?: any; // 翻页器页码样式，值为字符串或样式对象
  activePagerItemStyle?: any; // 翻页器页码选中样式，值为字符串或样式对象
  sizesSelectStyle?: any; // 页码下拉框样式，值为字符串或样式对象
  jumperInputStyle?: any; // 输入框页码跳转样式，值为字符串或样式对象
  buttonConfigData?: ButtonData; // 上一页/下一页按钮配置
}

export type Props = PublicProps<{
  pageIndex: number; // 当前页码
  pageSize: number; // 分页大小
  data: PagerData;
}>;
