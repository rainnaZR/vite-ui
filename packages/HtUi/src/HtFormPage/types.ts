/* eslint-disable no-unused-vars */
import { PublicProps } from "../types";
import { RuleItem } from "../HtFormItem/types";

export interface Model {
  [key: string]: any;
}

export interface Rules {
  [key: string]: RuleItem[];
}

export interface FieldItem {
  type: string; // 表单项类型，表单内组件名称
  showType?: string; // 表单项展示模式，支持预览和编辑，可选值为detail时为预览模式
  defaultEmptyText?: string; // 表单项为空值时展示的内容
  hide?: boolean; // 表单项是否隐藏，默认为false
  prop?: string; // 表单项对应的表单属性值
  label: string; // 表单项的label标签
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
  labelPosition?: string; // 表单项label位置，left/right/top，默认值right
  contentStyle?: any; // 表单项content样式
  required?: boolean; // 表单项是否必填
  rules?: RuleItem[]; // 表单项验证规则
  showValidMessage?: boolean; // 是否显示验证错误信息，默认true
  error?: string; // 表单项验证错误信息
  itemProps?: Model; // 表单内组件props，比如输入框，下拉框的props
  itemEvents?: Model; // 表单内组件events
}

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

export interface FormPageData {
  showType?: string; // 展示类型：编辑/详情，可选值edit/detail
  id?: string | number; // 页面id
  title?: string; // 表单标题
  subTitle?: string; // 表单副标题

  model: Model; // 表单数据对象
  rules?: Rules; // 表单验证规则
  inline?: boolean; // 是否行内表单
  labelWidth?: string | number; // 表单项label宽度
  labelStyle?: any; // 表单项label样式
  labelPosition?: string; // 表单项label位置，left/right/top，默认值right
  contentStyle?: any; // 表单项content样式
  formStyle?: any; // 表单自定义样式
  showValidMessage?: boolean; // 是否显示验证错误信息，默认true
  disabled?: boolean; // 表单是否禁用
  hideLoading?: boolean; // 是否隐藏loading
  defaultEmptyText?: string; // 表单项为空值时展示的内容

  fields?: FieldItem[]; // 表单字段组
  group?: GroupItem[]; // 表单选项组
  actions?: string[] | ActionItem[]; // 操作按钮
  request?: RequestData; // 接口
}

export type Props = PublicProps<{
  data: FormPageData;
}>;
