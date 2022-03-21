import { PublicProps } from "../types";

export interface UploadData {
  style?: string | object; // 自定义样式
  multiple: boolean; // 是否多选
  accept?: string; // 上传文件类型
  width?: number | string; // 上传图片的宽度
  height?: number | string; // 上传图片的高度
  extensions?: string; // 上传文件的格式
  maxSize?: string; // 上传文件的大小
  uploadBtnText: string; // 上传按钮文案
  uploadBtnType?: string; // 上传按钮类型
  uploadBtnIcon?: string; // 上传按钮图标名
  uploadBtnSize?: string; // 上传按钮大小
  previewImg?: string | string[]; // 预览图，支持单张/多张
}

export type Props = PublicProps<{
  data: UploadData;
}>;
