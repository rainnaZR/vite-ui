import { PublicProps } from "../types";

export interface RichTextData {
  showType?: string; // 展示类型：编辑/预览，可选值edit/detail
  defaultEmptyText?: string; // 内容为空时的占位符
  mode: string; // 编辑器模式，可选值default/simple
  toolbarStyle?: string | object; // 工具栏样式
  toolbarConfig?: object; // 工具栏配置
  editorStyle?: string | object; // 编辑框样式
  editorConfig?: object; // 编辑框配置
  uploadConfig?: object; // 文件上传的配置项
}

export type Props = PublicProps<{
  modelValue: string | number;
  data: RichTextData;
}>;
