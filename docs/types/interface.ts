import { RouteComponent } from "vue-router";

// meta类型
export interface SidebarMeta {
  title: string;
}

// 导航子栏目
export interface SidebarItems {
  name: string;
  path: string;
  meta: SidebarMeta;
}

// 导航子类型
export interface SidebarChildItem {
  name?: string;
  path?: string;
  meta: SidebarMeta;
  items?: SidebarItems[];
}

// 路由配置
declare type Lazy<T> = () => Promise<T>;
export interface Docs extends SidebarChildItem {
  component?: Lazy<RouteComponent>;
}

// 文件导出
export interface Doc {
  name: string;
  fileName: string;
  fileExtension?: string;
  filePath: string;
  fileContent?: any;
}
