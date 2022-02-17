import { PublicProps } from "../types";
import { ButtonData } from "../HtButton/types";

export interface PagerItem {
  type: string;
  value: number;
}

export interface PagerData {
  total: number; // 总条数
  pageSizes?: Array<number>; // 每页页码选项，默认值10, 20, 30, 50, 100
  layout?: string; // 分页模块布局，可选项total, prev, pager, next, sizes, jumper
  pageShowLimit?: number; // 页码展示数量限制，默认值7
  showSinglePage?: boolean; // 仅一页时是否隐藏，默认false
  wrapStyle?: any; // 翻页器容器样式，值为样式对象
  pagerItemStyle?: any; // 翻页器页码样式，值为样式对象
  activePagerItemStyle?: any; // 翻页器页码选中样式，值为样式对象
  sizesSelectStyle?: any; // 页码下拉框样式，值为样式对象
  jumperInputStyle?: any; // 输入框页码跳转样式，值为样式对象
  buttonConfigData?: ButtonData; // 上一页/下一页按钮配置
}

export type Props = PublicProps<{
  pageIndex: number; // 当前页码
  pageSize: number; // 分页大小
  data: PagerData;
}>;
