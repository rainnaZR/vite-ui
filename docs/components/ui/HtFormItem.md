# HtFormItem 表单项

### `Category: form`


## 代码演示


### 基本用法

- 表单项中表单关联字段`prop`的验证，重置等。
- 表单项中`label`的`显示`，`位置`和`样式`。

::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '名称' }">
        <ht-input />
    </ht-form-item>
</template>
```
:::


### 表单属性


- 表单项中表单model关联字段属性`prop`，用于表单重置和表单验证。


::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '名称', prop: 'name' }">
        <ht-input v-model:modelValue='model.name' />
    </ht-form-item>
</template>

<script>
import { reactive } from 'vue';
export default {
    setup(){
        const model = reactive({
            name: "",
        })
        return { model }
    }
}
</script>
```
:::


### label宽度

- 表单项label宽度属性`labelWidth`，值为字符串，为`css里支持的宽度值`。


::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '个人详细描述', labelWidth: '100px' }">
        <ht-input />
    </ht-form-item>
</template>
```
:::


### label样式

- 表单项label的自定义样式属性`labelStyle`, 值为`样式对象`。


::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '名称', labelStyle: { color: '#2196f3'} }">
        <ht-input />
    </ht-form-item>
</template>
```
:::


### label位置


- 表单项label的位置属性`labelPosition`, 值选项为`left`，`right`，`top`，默认值为`right`。
- `labelPosition`值为`right`时，需要设置`labelWidth`，代表label右对齐。


::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '名称', labelPosition: 'left' }">
        <ht-input />
    </ht-form-item>
    <br />

    <ht-form-item :data="{ label: '名称', labelPosition: 'right', labelWidth: '100px' }">
        <ht-input />
    </ht-form-item>
    <br />

    <ht-form-item :data="{ label: '名称', labelPosition: 'top' }">
        <ht-input />
    </ht-form-item>
</template>
```
:::


### 必填

- 表单项必填属性`required`，值为布尔值，默认值为`false`。


::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '名称', required: true }">
        <ht-input />
    </ht-form-item>
</template>
```
:::

- 如果`required`未设置，则根据验证规则自动生成。


::: Demo
```vue demo
<template>
    <ht-form-item :data="{ label: '名称', rules: [{ required: true }] }">
        <ht-input />
    </ht-form-item>
</template>
```
:::


### 验证

- 表单项验证规则属性`rules`，值为rule数组，rule属性包括`required`，`message`，`trigger`，`pattern`，`validator`。
- 表单项验证方式支持：必填项`required`，正则验证`pattern`，自定义方法验证`validator`。
- 表单项显示错误信息属性`showValidMessage`，值为布尔值，true为显示，false为不显示，默认值为`true`。


::: Demo
```vue demo
<template>
    <ht-form-item ref="formItemRef" :data="{ label: '统计人数', prop: 'name', rules: [{ required: true }, { pattern: /^\d+$/g }]}">
        <ht-input v-model:modelValue="model.name"/>
    </ht-form-item>

    <ht-button @on-click="onValidate">验 证</ht-button>
</template>

<script lang="ts">
import { ref, reactive } from 'vue';
export default {
    setup(){
        const formItemRef = ref(null);
        const model = reactive({
            name: ""
        });
        const onValidate = () => {
            formItemRef.value.onValidate(model).then(({valid}) => alert(`验证结果${valid}`));
        }
        return {
            formItemRef,
            model,
            onValidate,
        }
    }
}
</script>
```
:::