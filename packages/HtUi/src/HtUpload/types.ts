import { PublicProps } from "../types";

export interface UploadData {
  style?: string | object; // 自定义样式
  multiple: boolean; // 是否多选
  accept?: string; // 上传文件类型
  disabled?: boolean; // 是否禁用
  width?: number | string; // 上传图片的宽度
  height?: number | string; // 上传图片的高度
  extensions?: string; // 上传文件的格式
  maxSize?: string; // 上传文件的大小
  uploadBtnText: string; // 上传按钮文案
  uploadBtnType?: string; // 上传按钮类型
  uploadBtnIcon?: string; // 上传按钮图标名
  uploadBtnSize?: string; // 上传按钮大小
  files?: string | string[]; // 预览文件图，支持单张/多张
  showTips?: boolean; // 是否展示上传限制信息
  tips?: string; // 自定义提示信息
  limit?: number; // 上传限制数量
  hideDownload?: boolean; // 是否隐藏非图片形式的文件下载
  hideFiles?: boolean; // 是否隐藏文件列表
}

export type Props = PublicProps<{
  data: UploadData;
}>;
