# HtForm 表单


## 代码演示


### 基本用法

- 表单项的集合，包括输入框，单选框，多选框，下拉框，开关等组件组成，用来做表单的数据收集，校验，提交。
- 表单项由`HtFormItem`组件包裹，[HtFormItem 表单项](http://localhost:1768/doc/HtFormItem)。

::: Demo
```vue demo
<template>
    <ht-form :data="{ model: model, labelWidth: '70px' }">
      <ht-form-item :data="{ label: '姓名', prop: 'name' }">
        <ht-input v-model:modelValue="model.name" />
      </ht-form-item>
      <ht-form-item :data="{ label: '简介', prop: 'introduce' }">
        <ht-input
          v-model:modelValue="model.introduce"
          :data="{ type: 'textarea' }"
        />
      </ht-form-item>
      <ht-form-item :data="{ label: '联系方式', prop: 'contact' }">
        <ht-input
          v-model:modelValue="model.contact"
          :data="{ type: 'number' }"
        />
      </ht-form-item>
      <ht-form-item :data="{ label: '性别', prop: 'sex' }">
        <ht-radio
          v-model:modelValue="model.sex"
          :data="{
            options: [
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ],
          }"
        />
      </ht-form-item>
      <ht-form-item :data="{ label: '角色', prop: 'role' }">
        <ht-checkbox
          v-model:modelValue="model.role"
          :data="{
            multiple: true,
            options: [
              {
                label: '管理员',
                value: 1,
              },
              {
                label: '城市经理',
                value: 2,
              },
              {
                label: '业务经理',
                value: 3,
              },
            ],
          }"
        />
      </ht-form-item>
      <ht-form-item :data="{ label: '年龄', prop: 'age' }">
        <ht-select
          v-model:modelValue="model.age"
          :data="{
            options: [
              {
                label: '10-20岁',
                value: 1,
              },
              {
                label: '20-30岁',
                value: 2,
              },
              {
                label: '30-40岁',
                value: 3,
              },
              {
                label: '40岁以上',
                value: 4,
              },
            ],
          }"
        />
      </ht-form-item>
      <ht-form-item :data="{ label: '是否已注册', prop: 'registered' }">
        <ht-switch v-model:modelValue="model.registered" />
      </ht-form-item>
      <ht-form-item>
        <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
        <ht-button>取 消</ht-button>
      </ht-form-item>
    </ht-form>
</template>

<script lang="ts">
import { reactive } from "vue";
export default {
  setup() {
    const model = reactive({
      name: "",
      introduce: "",
      contact: "",
      sex: 1,
      role: [],
      age: "",
      registered: false,
    });
    const onSubmit = () => console.log("submit", model);
    return {
      model,
      onSubmit,
    };
  },
};
</script>
```
:::


### 行内表单

- 表单行内样式设置属性`inline`，值为布尔值，默认为`false`。

::: Demo
```vue demo
<template>
    <ht-form :data="{ model: model, inline: true }">
      <ht-form-item :data="{ label: '姓名', prop: 'name' }">
        <ht-input v-model:modelValue="model.name" />
      </ht-form-item>
      <ht-form-item :data="{ label: '年龄', prop: 'age' }">
        <ht-select
          v-model:modelValue="model.age"
          :data="{
            options: [
              {
                label: '10-20岁',
                value: 1,
              },
              {
                label: '20-30岁',
                value: 2,
              },
              {
                label: '30-40岁',
                value: 3,
              },
              {
                label: '40岁以上',
                value: 4,
              },
            ],
          }"
        />
      </ht-form-item>
      <ht-form-item>
        <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
        <ht-button>取 消</ht-button>
      </ht-form-item>
    </ht-form>
</template>

<script lang="ts">
import { reactive } from "vue";
export default {
  setup() {
    const model = reactive({
      name: "",
      age: "",
    });
    const onSubmit = () => console.log("submit", model);
    return {
      model,
      onSubmit,
    };
  },
};
</script>
```
:::


### label宽度
### label样式
### label位置
### 必填校验
### 正则校验
### 自定义校验
### 表单样式
### 表单禁用
### 动态删减表单项
### 表单提交按钮
