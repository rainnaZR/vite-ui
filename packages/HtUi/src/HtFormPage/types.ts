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
  type: string; // 表单项类型，可填表单内组件名
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
export interface ApiData {
  formInitial(value?: Model): any; // 表单初始化
  formSubmit(value?: Model): any; // 表单提交
}

export interface HooksData {
  onFormInitialCallback(value?: Model): any;
  onFormSubmitCallback(value?: Model): any;
}

export interface FormPageData {
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

  fields?: FieldItem[]; // 表单字段组
  group?: GroupItem[]; // 表单选项组
  action: string[] | ActionItem[]; // 操作按钮
  api?: ApiData; // 接口
  hooks?: HooksData; // 钩子函数
}

export type Props = PublicProps<{
  data: FormPageData;
}>;
