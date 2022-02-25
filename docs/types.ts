import { RouteComponent } from "vue-router";
// 路由配置
declare type Lazy<T> = () => Promise<T>;

// 导入的文件信息
export interface File {
  name: string;
  fileName: string;
  fileExtension?: string;
  filePath: string;
  fileContent?: any;
}

// 文档meta信息
export interface DocMeta {
  title: string;
  category?: string;
  isRecommend?: boolean;
}

// 导出的文档信息
export interface Doc {
  name: string;
  path: string;
  meta: DocMeta;
  component?: Lazy<RouteComponent>;
}

// 首页listItem
export interface IndexToolsItem {
  img: string;
  title: string;
  introduce: string;
  path: string;
}
