# HtFormPage 表单页

## 代码演示

### 基础用法

- 组件是在`HtForm`组件基础上封装，通过配置数据生成表单。

:::Demo
```vue demo
<template>
  <ht-form-page :data="formData" @on-btn-click="onBtnClick" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      title: "表单",
      subTitle:
        "我是表单描述，我是表单描述，我是表单描述，我是表单描述，我是表单描述。",
      labelWidth: "100px",
      model: {},
      rules: {},
      formInline: false,
      group: [
        {
          title: "基础信息",
          subTitle: "我是基础信息副标题我是基础信息副标题我是基础信息副标题",
          fields: [
            {
              type: "input",
              label: "标题",
              prop: "name",
              required: true,
              itemProps: {
                search: true,
                clearable: true,
              },
              itemEvents: {
                "on-input": () => console.log("input"),
                "on-blur": () => console.log("blur"),
              },
            },
            {
              type: "input",
              label: "公司简介",
              prop: "desc",
              required: true,
              itemProps: {
                type: "textarea",
                placeholder: "请输入公司简介",
              },
            },
          ],
        },
        {
          title: "账户信息",
          subTitle:
            "我是账户信息信息副标题我是账户信息信息副标题我是账户信息副标题",
          fields: [
            {
              type: "input",
              label: "开户行",
              prop: "number",
              itemProps: {
                placeholder: "请输入开户行",
                search: true,
                clear: true,
              },
              itemEvents: {
                "on-input": () => console.log("number input"),
                "on-blur": () => console.log("number blur"),
              },
            },
            {
              type: "radio",
              label: "账号类型",
              prop: "type",
              required: false,
              itemProps: {
                options: [
                  { label: "企业账号", value: 1 },
                  { label: "个人账号", value: 2 },
                ],
              },
            },
            {
              type: "checkbox",
              label: "账号地址",
              prop: "address",
              required: false,
              itemProps: {
                multiple: true,
              },
            },
          ],
        },
        {
          title: "附件信息",
          subTitle: "附件信息附件信息附件信息附件信息附件信息附件信息附件信息",
          fields: [
            {
              type: "select",
              label: "开户行下拉",
              prop: "source",
            },
            {
              type: "switch",
              label: "是否已过期",
              prop: "invalid",
            },
          ],
        },
      ],
      action: [
        {
          type: "submit",
          text: "确认",
          btnType: "primary",
        },
        {
          type: "reset",
          text: "重置",
        },
        {
          type: "search",
          text: "搜索",
          onClick: () => alert("search事件触发！"),
        },
      ],
      api: {
        getForm: {
          xhr: async () => ({
            data: {
              data: {
                createInfo: {
                  address: [
                    { label: "11账号多选1", value: 1 },
                    { label: "22账号多选2", value: 2 },
                    { label: "33账号多选3", value: 3 },
                  ],
                  source: [
                    {
                      label: "招商银行",
                      value: 1,
                    },
                    {
                      label: "农业银行",
                      value: 2,
                    },
                    {
                      label: "中信银行",
                      value: 3,
                    },
                    {
                      label: "杭州银行",
                      value: 4,
                    },
                  ],
                },
                formInfo: {
                  name: "我是标题",
                  desc: "我是简介我是简介我是简介我是简介我是简介我是简介我是简介",
                  address: 2,
                  source: 3,
                  invalid: true,
                },
              },
            },
          }),
        },
        postForm: {
          xhr: async () => {},
        },
        updateForm: {
          xhr: async () => {},
        },
      },
      hooks: {},
    });
    const onBtnClick = ({type, formModel}) => {
      if(type == "submit"){
        alert('submit');
        console.log("formModel", formModel);
      }
    };

    return {
      formData,
      onBtnClick,
    };
  },
});
</script>
```
:::


### 标题
### 副标题
### 表单项标题
### 表单项副标题
### 单组
### 多组
### 编辑/预览
### 操作按钮，默认，自定义，字符串配置，对象配置， limit
### 获取表单详情接口定制
getForm 获取详情
onInitFormCreate 表单初始化，表单创建







### 标题插槽
### 副标题插槽
### 表单项标题插槽
### 表单项副标题插槽