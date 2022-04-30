import { PublicProps } from "../types";

export interface RichTextData {
  mode?: string; // 编辑器模式，可选值default/simple
  placeholder?: string; // 编辑器placeholder值
  toolbarStyle?: string | object; // 工具栏样式
  editorStyle?: string | object; // 编辑器样式
}

export type Props = PublicProps<{
  modelValue: string | number;
  data: RichTextData;
}>;
