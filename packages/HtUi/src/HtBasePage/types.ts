import { PublicProps } from "../types";

export interface Model {
  [key: string]: any;
}

export interface ModuleItem {
  moduleId: number; // 模块id
  moduleType: string; // 模块类型
  moduleName: string; // 模块名称
  moduleTitle: string; // 模块标题
  moduleDesc?: string; // 模块介绍
  moduleVersion?: string; // 模块版本号
  moduleProps?: object; // 模块配置项
}

export interface BasePageData {
  moduleList: ModuleItem[]; // 模块列表
}

export type Props = PublicProps<{
  data: BasePageData;
}>;
