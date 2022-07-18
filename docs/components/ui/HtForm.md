# HtForm 表单

##### `Category: form`


## 代码演示


### 基本用法

- 表单项的集合，包括输入框，单选框，多选框，下拉框，开关等组件组成，用来做表单的数据收集，验证，提交。
- 表单项由`HtFormItem`组件包裹，[HtFormItem 表单项](#/doc/HtFormItem)。

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

- `labelPosition`为`top`值时的行内表单。

::: Demo
```vue demo
<template>
    <ht-form :data="{ model: model, inline: true, labelPosition: 'top' }">
      <ht-form-item :data="{ label: '姓名', prop: 'name' }">
        <ht-input v-model:modelValue="model.name" />
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
<template>
  <ht-form
    ref="formRef"
    :data="{ model: model, rules: rules, labelWidth: '70px' }"
  >
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
      <ht-input v-model:modelValue="model.contact" :data="{ type: 'number' }" />
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
      <ht-button @on-click="onReset">重 置</ht-button>
    </ht-form-item>
  </ht-form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const formRef = ref(null);
    const model = reactive({
      name: "",
      introduce: "",
      contact: "",
      sex: "",
      role: [],
      age: "",
      registered: false,
    });
    const rules = {
      name: [
        {
          required: true,
        },
      ],
      introduce: [
        {
          required: true,
          message: "请输入个人简介！我是一条很长的错误提示内容！！！",
        },
      ],
      contact: [
        {
          required: true,
          message: "请输入手机号！我有两条验证规则哦！",
        },
        {
          pattern: /\d{11}/g,
          message: "手机号格式不正确，需要为11位数字！我有两条验证规则哦！",
        },
      ],
      sex: [
        {
          required: true,
          message: "请输入性别！我是单选项错误提示！",
        },
      ],
      role: [
        {
          required: true,
          message: "请输入用户角色！我是多选项错误提示！",
        },
      ],
      age: [
        {
          required: true,
          message: "请输入年龄！我是下拉框错误提示！",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value.onValidate().then(({ valid, invalidFields }) => {
        console.log(valid, invalidFields, model);
      });
    };
    const onReset = () => {
      formRef.value.onReset();
    };
    return {
      formRef,
      model,
      rules,
      onSubmit,
      onReset,
    };
  },
};
</script>
```
:::

### 正则验证

- 表单项`rules`中定义`pattern`实现正则验证。

::: Demo
```vue demo
<template>
  <ht-form ref="formRef" :data="{ model: model, rules: rules, labelWidth: '70px' }">
    <ht-form-item :data="{ label: '姓名', prop: 'name' }">
      <ht-input v-model:modelValue="model.name" />
    </ht-form-item>
    <ht-form-item :data="{ label: '联系方式', prop: 'contact' }">
      <ht-input v-model:modelValue="model.contact" :data="{ type: 'number' }" />
    </ht-form-item>
    <ht-form-item>
      <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
      <ht-button @on-click="onReset">重 置</ht-button>
    </ht-form-item>
  </ht-form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const formRef = ref(null);
    const model = reactive({
      name: "",
      contact: "",
    });
    const rules = {
      name: [
        {
          pattern: /^abc_/,
          message: "名称要以abc_开头哦！",
        },
      ],
      contact: [
        {
          required: true,
          message: "手机号不能为空！我有两条验证规则哦！",
        },
        {
          pattern: /\d{11}/g,
          message: "手机号格式不正确，需要为11位数字！我有两条验证规则哦！",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value.onValidate().then(({ valid, invalidFields }) => {
        console.log(valid, invalidFields, model);
      });
    };
    const onReset = () => {
      formRef.value.onReset();
    };
    return {
      formRef,
      model,
      rules,
      onSubmit,
      onReset,
    };
  },
};
</script>
```
:::


### 自定义验证

- 表单项`rules`中定义`validator`实现自定义方法验证。
- `validator`方法返回值为`验证结果`，值为`布尔值`。


::: Demo
```vue demo
<template>
  <ht-form ref="formRef" :data="{ model: model, rules: rules, labelWidth: '70px' }">
    <ht-form-item :data="{ label: '姓名', prop: 'name' }">
      <ht-input v-model:modelValue="model.name" />
    </ht-form-item>
    <ht-form-item :data="{ label: '联系方式', prop: 'contact' }">
      <ht-input v-model:modelValue="model.contact" :data="{ type: 'number' }" />
    </ht-form-item>
    <ht-form-item>
      <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
      <ht-button @on-click="onReset">重 置</ht-button>
    </ht-form-item>
  </ht-form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const formRef = ref(null);
    const model = reactive({
      name: "",
      contact: "",
    });
    const onValidateName = (value) => value.startsWith("abc_");
    const onValidateContact = (value) => typeof value === "number" && String(value).length === 11;
    const rules = {
      name: [
        {
          validator: onValidateName,
          message: "名称要以abc_开头哦！",
        },
      ],
      contact: [
        {
          required: true,
          message: "手机号不能为空！我有两条验证规则哦！",
        },
        {
          validator: onValidateContact,
          message: "手机号格式不正确，需要为11位数字！我有两条验证规则哦！",
        },
      ],
    };
    const onSubmit = () => {
      formRef.value.onValidate().then(({ valid, invalidFields }) => {
        console.log(valid, invalidFields, model);
      });
    };
    const onReset = () => {
      formRef.value.onReset();
    };
    return {
      formRef,
      model,
      rules,
      onSubmit,
      onReset,
    };
  },
};
</script>
```
:::


### 表单样式

- 表单样式属性`formStyle`，值为`字符串`或`样式对象`。

::: Demo
```vue demo
<template>
  <ht-form ref="formRef" :data="{ model: model, labelWidth: '70px', formStyle: 'padding: 20px;background: #e2f6ff;' }">
    <ht-form-item :data="{ label: '姓名', prop: 'name' }">
      <ht-input v-model:modelValue="model.name" />
    </ht-form-item>
    <ht-form-item :data="{ label: '联系方式', prop: 'contact' }">
      <ht-input v-model:modelValue="model.contact" :data="{ type: 'number' }" />
    </ht-form-item>
    <ht-form-item>
      <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
      <ht-button @on-click="onReset">重 置</ht-button>
    </ht-form-item>
  </ht-form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const formRef = ref(null);
    const model = reactive({
      name: "",
      contact: "",
    });
    const onSubmit = () => {
      formRef.value.onValidate().then(({ valid, invalidFields }) => {
        console.log(valid, invalidFields, model);
      });
    };
    const onReset = () => {
      formRef.value.onReset();
    };
    return {
      formRef,
      model,
      onSubmit,
      onReset,
    };
  },
};
</script>
```
:::



### 表单禁用

- 表单禁用选项`disabled`，值为`布尔值`，默认为`false`。


::: Demo
```vue demo
<template>
    <ht-form :data="{ model: model, labelWidth: '70px', disabled: true }">
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
    return {
      model,
    };
  },
};
</script>
```
:::

### 动态表单

- 表单支持动态删减表单项。

::: Demo
```vue demo
<template>
  <ht-form ref="formRef" :data="{ model: model, labelWidth: '70px', contentStyle: { display: 'flex' } }">
    <ht-form-item
      v-for="(tag, index) in model.tags"
      :key="index"
      :data="{
        label: `标签${index + 1}`,
        prop: `tags[${index}].value`,
        rules: [{ required: true }],
      }"
    >
      <ht-input v-model="tag.value"></ht-input>
      <ht-button class="f-ml10" @click.prevent="onRemove(tag)">删除</ht-button>
    </ht-form-item>
    <ht-form-item>
      <ht-button :data="{ type: 'primary' }" @on-click="onSubmit">提 交</ht-button>
      <ht-button @on-click="onReset">重 置</ht-button>
      <ht-button :data="{ type: 'success' }" @click="onAdd">新增标签</ht-button>
    </ht-form-item>
  </ht-form>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const formRef = ref(null);
    const model = reactive({
      tags: [
        {
          value: "",
        },
      ],
    });
    const onRemove = (item) => {
      const index = model.tags.indexOf(item);
      if (index !== -1) {
        model.tags.splice(index, 1);
      }
    };
    const onSubmit = () => {
      formRef.value.onValidate().then(({ valid, invalidFields }) => {
        console.log(valid, invalidFields, model);
      });
    };
    const onReset = () => {
      formRef.value.onReset();
    };
    const onAdd = () => {
      model.tags.push({
        value: "",
      });
    };
    return {
      formRef,
      model,
      onRemove,
      onSubmit,
      onReset,
      onAdd,
    };
  },
};
</script>
```
:::
