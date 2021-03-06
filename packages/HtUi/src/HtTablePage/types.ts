import type { VxeGridProps, VxeTableDefines } from "vxe-table";
import { PublicProps } from "../types";
import { RequestItem, FormPageData, Model } from "../HtFormPage/types";
import { ActionData } from "../HtAction/types";
import { PagerData } from "../HtPager/types";

export interface RequestData {
  onGetListXhr?: RequestItem; // 列表获取
  onDeleteXhr?: RequestItem; // 删除项
}

export interface TableColumnShowConfig {
  type?: string; // 类型
  imgWidth?: number; // 图片宽度
  imgHeight?: number; // 图片高度
  imgAlt?: string; // 图片alt
}

export type TableColumnOption = VxeTableDefines.ColumnOptions & {
  field?: string; // 字段key
  actions?: ActionData[];
  placeholder?: string; // 列表项的占位符
  showConfig?: TableColumnShowConfig; // 列表项展示类型配置
};

export interface TablePageData {
  request?: RequestData; // 接口配置数据
  filterForm?: FormPageData; // 筛选表单配置数据
  toolbar?: ActionData[]; // 工具栏配置数据
  table: VxeGridProps & {
    custom?: boolean;
    columns: TableColumnOption[];
    columnPlaceholder?: string;
  }; // 表格配置数据
  pager?: PagerData & {
    pageIndex: number; // 当前页码
    pageSize: number; // 分页大小
  }; // 分页配置数据
  actionMethods?: Model; // 表格操作项方法配置数据
}

export type Props = PublicProps<{
  data: TablePageData;
}>;
