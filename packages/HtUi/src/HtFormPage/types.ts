/* eslint-disable no-unused-vars */
import { PublicProps } from "../types";
import { FormItemData } from "../HtFormItem/types";
import { FormData } from "../HtForm/types";

export interface Model {
  [key: string]: any;
}

export type FieldItem = FormItemData & {
  type: string; // 表单项类型，表单内组件名称
  hide?: boolean; // 表单项是否隐藏，默认为false
  itemProps?: Model; // 表单内组件props，比如输入框/下拉框的props
  itemEvents?: Model; // 表单内组件events
};

export interface GroupItem {
  title?: string; // 表单项标题
  subTitle?: string; // 表单项副标题
  fields?: FieldItem[]; // 表单项列表
  hide?: boolean; // 表单项是否隐藏
}

export interface ActionItem {
  type: string; // 表单操作类型
  content: string; // 表单操作文案
  btnType?: string; // 表单按钮类型
  size?: string; // 按钮尺寸
  nativeType?: string; // 按钮原生类型
  disabled?: boolean; // 按钮是否禁用
  full?: boolean; // 按钮是否宽度占满
  style?: any; // 按钮自定义样式
  hide?: boolean; // 按钮是否隐藏
  limit?: any; // 按钮显示的限制条件，值为对象或函数
  onClick?: (formModel: any) => void; // 点击事件
}

export interface RequestItem {
  xhr: Function; // 异步接口
  getParams(value?: Model): Model; // 参数获取
  callback(value?: Model): any; // 回调执行
}

export interface RequestData {
  formInitial: RequestItem; // 表单初始化
  formSubmit: RequestItem; // 表单提交
}

export type FormPageData = FormData & {
  showType?: string; // 展示类型：编辑/预览，可选值edit/detail
  id?: string | number; // 表单id
  title?: string; // 表单标题
  subTitle?: string; // 表单副标题
  hideLoading?: boolean; // 是否隐藏loading
  fields?: FieldItem[]; // 表单字段组
  group?: GroupItem[]; // 表单选项组
  hideFormAction?: boolean; // 是否隐藏表单项操作按钮，默认值为false
  actions?: string[] | ActionItem[]; // 操作按钮
  request?: RequestData; // 接口
};

export type Props = PublicProps<{
  data: FormPageData;
}>;
