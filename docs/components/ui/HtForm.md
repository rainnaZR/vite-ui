# HtForm 表单


## 代码演示


### 基本用法

- 表单项的集合，包括输入框，单选框，多选框，下拉框，开关等组件组成，用来做表单的数据收集，验证，提交。
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


### 表单label宽度

- 表单label宽度属性`labelWidth`，值为字符串，为`css里支持的宽度值`。
- 如果表单项formItem也定义了`labelWidth`，则优先取表单项设置的值；若无定义，则取表单设置的`labelWidth`值。

::: Demo
```vue demo
<template>
  <ht-form :data="{ model: model, labelWidth: '200px' }">
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


### 表单label样式

- 表单label的自定义样式属性`labelStyle`, 值为`样式对象`。
- 如果表单form和表单项formItem同时定义了`labelStyle`，则会将表单form的`labelStyle`和表单项formItem的`labelStyle`样式合并。

:::Demo
```vue demo
<template>
  <ht-form :data="{ model: model, labelStyle: { color: '#57a3f3', fontSize: '16px' } }">
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


### 表单label位置

- 表单label的位置属性`labelPosition`, 值选项为`left`，`right`，`top`，默认值为`right`。
- `labelPosition`值为`right`时，需要设置`labelWidth`，代表label右对齐。
- 如果表单项formItem也定义了`labelPosition`，则优先取表单项设置的值；若无定义，则取表单设置的`labelPosition`值。


:::Demo
```vue demo
<template>
  <ht-tab
    class="f-mb25"
    v-model:modelValue="tabValue"
    :data="{
      list: [
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
        { label: '顶部对齐', value: 'top' },
      ],
    }"
  />
  <ht-form :data="{ model: model, labelPosition: tabValue, labelWidth: '70px' }">
    <ht-form-item :data="{ label: '姓名', prop: 'name' }">
      <ht-input v-model:modelValue="model.name" />
    </ht-form-item>
    <ht-form-item :data="{ label: '联系方式', prop: 'contact' }">
      <ht-input v-model:modelValue="model.contact" :data="{ type: 'number' }" />
    </ht-form-item>
    <ht-form-item>
      <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
      <ht-button>取 消</ht-button>
    </ht-form-item>
  </ht-form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const tabValue = ref("right");
    const model = reactive({
      name: "",
      contact: "",
    });
    const onSubmit = () => console.log("submit", model);
    return {
      tabValue,
      model,
      onSubmit,
    };
  },
};
</script>
```
:::


### 表单验证

- 表单项验证必填属性`required`，值为布尔值，默认值为`false`。
- 表单项验证正则表达式`pattern`，值为`正则表达式`。
- 表单项验证自定义验证函数`validator`，值为`函数`。
- 表单项验证规则：如果表单里定义了`rules`，表单项也定义了`rules`，则会执行合并操作。


:::Demo
```vue demo


```
:::




### 正则校验
### 自定义校验
### 表单样式
### 表单禁用
### 动态删减表单项
### 表单提交按钮
