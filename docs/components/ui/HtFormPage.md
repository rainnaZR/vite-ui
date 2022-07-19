# HtFormPage 表单页

##### `Category: form` 

### `Recommend`

## 代码演示

### 基础用法

- 组件是在`HtForm`组件基础上封装，通过配置数据生成表单。
- 组件表单属性与[HtForm 表单](#/doc/HtForm)组件data上的属性配置一致。
- 组件分组表单项属性与[HtFormItem 表单项](#/doc/HtFormItem)组件data上的属性配置一致。

:::Demo
```vue demo
<template>
  <ht-form-page :data="formData" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      title: "表单标题",
      subTitle:
        "我是表单描述，我是表单描述，我是表单描述，我是表单描述，我是表单描述。",
      labelWidth: "100px",
      model: {},
      rules: {},
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
              type: "input",
              label: "账号地址",
              prop: "address",
              required: false,
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
      actions: [
        {
          type: "submit",
          content: "确认",
          btnType: "primary",
        },
        {
          type: "reset",
          content: "重置",
        },
        {
          type: "search",
          content: "搜索",
          onClick: () => console.log("search事件触发！"),
        },
      ],
      request: {
        formInitial: {
          xhr: async () => {
            return {
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
            }
          },
        },
      },
      hooks: {},
    });
    const onAction = (options) => {
      console.log("options", options);
    };

    return {
      formData,
      onAction,
    };
  },
});
</script>
```
:::


### 表单尺寸

- 组件显示尺寸属性`size`，值为`small`，`normal`，`big`，默认值为`normal`。


::: Demo
```vue demo
<template>
  <ht-form-page :data="formData" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      labelWidth: "100px",
      size: "small",
      model: {},
      rules: {},
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
          type: "checkbox",
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
          type: "radio",
          label: "银行类型",
          prop: "type2",
          required: false,
          itemProps: {
            options: [
              { label: "企业账号", value: 1 },
              { label: "个人账号", value: 2 },
            ],
          },
        },
        {
          type: "date-picker",
          label: "账号类型",
          prop: "type3",
          required: true,
        },
        {
          type: "select",
          label: "账号类型",
          prop: "type4",
          required: false,
          itemProps: {
            options: [
              {
                label: "选项1",
                value: 1,
              },
              {
                label: "选项2",
                value: 2,
              },
              {
                label: "选项3",
                value: 3,
              },
            ],
          },
        },
        {
          type: "switch",
          label: "账号地址",
          prop: "address",
          required: false,
        },
        {
          type: "input",
          label: "账号地址",
          prop: "address2",
          required: false,
        },
        {
          type: "upload",
          label: "账号地址",
          prop: "address3",
          required: false,
          itemProps: {
            hideTips: true,
          },
        },
      ],
    });

    return {
      formData,
    };
  },
});
</script>
```
:::




### 表单描述

- 组件显示表单标题属性`title`，值为`字符串`。
- 组件显示表单副标题属性`subTitle`，值为`字符串`。

::: Demo
```vue demo
<template>
  <ht-form-page :data="formData" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      title: "表单标题",
      subTitle:
        "我是表单描述，我是表单描述，我是表单描述，我是表单描述，我是表单描述。",
      labelWidth: "100px",
      model: {},
      rules: {},
      group: [
        {
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
      ],
    });
    const onAction = (options) => {
      console.log("options", options);
    };

    return {
      formData,
      onAction,
    };
  },
});
</script>
```
:::


### 表单项描述

- 组件显示分组属性`group`，值为`数组`，每个组里可以定义表单项属性。
- 组件显示分组表单项标题属性`title`，值为`字符串`。
- 组件显示分组表单项副标题属性`subTitle`，值为`字符串`。
- 组件显示分组表单字段`fields`，值为`数组`，为表单字段集合。

::: Demo
```vue demo
<template>
  <ht-form-page :data="formData" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      labelWidth: "100px",
      model: {},
      rules: {},
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
    });
    const onAction = (options) => {
      console.log("options", options);
    };

    return {
      formData,
      onAction,
    };
  },
});
</script>
```
:::


### 单组

- 组件分组属性`group`，值为`数组`，每个组里可以定义表单项属性。
- 当只有一个组时，可以直接定义`fields`属性。

::: Demo
```vue demo
<template>
  <ht-form-page :data="formData" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      labelWidth: "100px",
      model: {},
      rules: {},
      fields: [
        {
          type: "input",
          label: "标题",
          prop: "name",
        },
        {
          type: "input",
          label: "公司简介",
          prop: "desc",
          itemProps: {
            type: "textarea",
          },
        },
      ],
    });
    const onAction = (options) => {
      console.log("options", options);
    };

    return {
      formData,
      onAction,
    };
  },
});
</script>
```
:::


### 行内表单

::: Demo
```vue demo
<template>
    <ht-form-page :data="formData" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
    setup () {
        const formData = reactive({
            inline: true,
            labelPosition: "top",
            model: {},
            rules: {},
            fields: [
                {
                    type: "input",
                    label: "公司名称",
                    prop: "name",
                },
                {
                    type: "select",
                    label: "状态",
                    prop: "status",
                    itemProps: {
                        options: [{
                            label: 1,
                            value: 1
                        }],
                    },
                },
            ],
        });
        return {
            formData
        }
    }
})
</script>
```
:::


### 操作项

- 组件默认操作项`submit`和`reset`。
- 组件可自定义操作项属性`actions`，值为`数组`，每个子项可以是`字符串`或`对象`。


::: Demo
```vue demo
<template>
  <ht-form-page :data="formData" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const formData = reactive({
      labelWidth: "100px",
      model: {},
      rules: {},
      group: [
        {
          fields: [
            {
              type: "input",
              label: "标题",
              prop: "name",
              required: true,
              itemProps: {
                clearable: true,
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
      ],
      actions: [
        {
          type: "submit",
          content: "确认",
          btnType: "primary",
        },
        {
          type: "reset",
          content: "重置",
        },
        {
          type: "search",
          content: "搜索",
          onClick: () => console.log("search事件触发！"),
        },
      ],
    });
    const onAction = (options) => {
      console.log("options", options);
    };

    return {
      formData,
      onAction,
    };
  },
});
</script>
```
:::