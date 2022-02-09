# HtInput 输入框

## 代码演示

### 基本用法

- 组件可通过 `v-model:modelValue` 来实现输入框值的双向绑定。
- 组件可通过 `data` 属性定义组件的配置项。


::: Demo
```vue demo
<template>
    <ht-input v-model:modelValue="modelValue" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref("");
    return { modelValue };
  },
};
</script>
```
:::


### 类型

输入框类型type值支持 input 原生类型，比如 `password`, `number`, `textarea`等。

- 输入框类型type值为 `password`。

::: Demo
```vue demo
<template>
    <ht-input v-model:modelValue="modelValue" :data="{ type: 'password' }"/>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref("");
    return { modelValue };
  },
};
</script>
```
:::


- 输入框类型type值为 `number`。


::: Demo
```vue demo
<template>
    <ht-input v-model:modelValue="modelValue" :data="{ type: 'number' }"/>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref("");
    return { modelValue };
  },
};
</script>
```
:::


- 输入框类型type值为 `textarea`，默认是5行高度。


::: Demo
```vue demo
<template>
    <ht-input v-model:modelValue="modelValue" :data="{ type: 'textarea' }"/>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref("");
    return { modelValue };
  },
};
</script>
```
:::


### 自定义placeholder

- 输入框可自定义 `placeholder`，值为字符串，默认`请输入...`。

::: Demo
```vue demo
<template>
    <ht-input :data="{ placeholder: '请输入用户名或邮箱' }" />
</template>
```
:::


### 只读

- 输入框设置只读属性 `readonly`，值为布尔值，默认 `false`。


::: Demo
```vue demo
<template>
    <ht-input modelValue="我是只读内容" :data="{ readonly: true }" />
</template>
```
:::


### 禁用

- 输入框设置禁用属性 `disabled`，值为布尔值，默认 `false`。


::: Demo
```vue demo
<template>
    <ht-input modelValue="我是禁用内容" :data="{ disabled: true }" />
</template>
```
:::


### 字数限制

- 输入框设置字数限制属性 `maxLength`，值为数字，默认 `不限制`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ maxLength: 10 }" />
</template>
```
:::


### 行数限制

- 多行文本输入框行数限制属性 `rows`，值为数字，默认行数 `5`，仅针对`type='textarea'`有效。


::: Demo
```vue demo
<template>
    <ht-input :data="{ type: 'textarea', rows: 2 }" />
</template>
```
:::


### 文字颜色

- 输入框文字颜色修改属性 `color`，默认颜色`#333`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ color: '#f60' }" />
</template>
```
:::


### 边框颜色

- 输入框边框颜色修改属性 `borderColor`，默认颜色`#dcdee2`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ borderColor: '#f60' }" />
</template>
```
:::


### 聚焦边框颜色

- 输入框聚焦边框颜色修改属性 `focusBorderColor`，默认颜色`#57a3f3`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ focusBorderColor: '#67c23a' }" />
</template>
```
:::


### 清除图标

- 输入框清除图标是否显示属性 `clearable` ，值为布尔值，默认值为 `false`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ clearable: true }" />
</template>
```
:::


### 密码展示/隐藏图标

- 输入框密码展示/隐藏属性 `password` ，值为布尔值，默认值为 `false`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ password: true }" />
</template>
```
:::


### 搜索图标

- 输入框搜索图标是否显示属性 `search` ，值为布尔值，默认值为 `false`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ search: true }" />
</template>
```
:::


### 自定义后缀图标

- 输入框自定义后缀图标icon属性`suffixIcon`，值为`icon样式名`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ suffixIcon: 'u-icon-data' }" />
</template>
```
:::

### 自定义前缀图标

- 输入框自定义前缀图标icon属性`prefixIcon`，值为`icon样式名`。


::: Demo
```vue demo
<template>
    <ht-input :data="{ prefixIcon: 'u-icon-data' }" />
</template>
```
:::


### 多个操作图标

- 输入框定义多个操作图标。


::: Demo
```vue demo
<template>
    <ht-input :data="{ clearable: true, search: true, password: true }" />
    <br />

    <ht-input :data="{ clearable: true, suffixIcon: 'u-icon-data' }" />
</template>
```
:::


### 容器样式

- 输入框自定义容器样式属性`wrapStyle`，值为`Object`。


::: Demo
```vue demo
<template>
    <ht-input 
        :data="{ 
            wrapStyle: { 
                padding: '15px', 
                border: '1px solid rgb(158 219 127)', 
                backgroundColor: 'rgb(233 251 225)',
            }
        }" 
    />
</template>
```
:::



### 输入框样式

- 输入框自定义样式属性`inputStyle`，值为`Object`。


::: Demo
```vue demo
<template>
    <ht-input 
        :data="{ 
            inputStyle: { 
                border: '1px solid rgb(158 219 127)', 
                backgroundColor: 'rgb(233 251 225)', 
            }
        }" 
    />
</template>
```
:::



### 头部插槽

- 输入框可定义头部插槽，插槽name值为`prepend`。


::: Demo
```vue demo
<template>
    <ht-input>
      <template #prepend>手机号码：</template>
    </ht-input>
</template>
```
:::


### 尾部插槽

- 输入框可定义尾部插槽，插槽name值为`append`。


::: Demo
```vue demo
<template>
    <ht-input>
      <template #append>不包含特殊字符。</template>
    </ht-input>
</template>
```
:::


### 前缀插槽

- 输入框内部可定义前缀插槽，插槽name值为`prefix`，定义前缀插槽后，输入框`inputStyle`需要设置`padding`值。


::: Demo
```vue demo
<template>
    <ht-input :data="{ inputStyle: { paddingLeft: '30px' } }">
      <template #prefix>
        <ht-icon :data="{ name: 'u-icon-preview' }" />
      </template>
    </ht-input>
    <br />

    <ht-input :data="{ inputStyle: { paddingLeft: '70px' } }">
      <template #prefix>手机号码：</template>
    </ht-input>
</template>
```
:::


### 后缀插槽

- 输入框内部可定义后缀插槽，插槽name值为`suffix`，定义后缀插槽后，输入框`inputStyle`需要设置`padding`值。


::: Demo
```vue demo
<template>
    <ht-input :data="{ inputStyle: { paddingRight: '35px' } }">
        <template #suffix>
            <ht-icon :data="{ name: 'u-icon-data' }" />
        </template>
    </ht-input>
    <br />

    <ht-input :data="{ inputStyle: { paddingRight: '80px' } }">
        <template #suffix>发送验证码</template>
    </ht-input>
    <br />

    <ht-input :data="{ inputStyle: { paddingLeft: '58px', paddingRight: '80px' } }"> 
        <template #prefix>验证码：</template>
        <template #suffix>
            <span class="s-fc3 f-curp">发送验证码</span>
        </template>
    </ht-input>
</template>
```
:::

### 事件定义

- 输入框内容事件定义，包括`on-focus`, `on-blur`, `on-change`, `on-input`。
- 输入框icon点击事件定义，包括`on-action`。

::: Demo
```vue demo
<template>
    <ht-input
      v-model:modelValue="modelValue"
      :data="inputData"
      @on-focus="onFocus"
      @on-blur="onBlur"
      @on-change="onChange"
      @on-input="onInput"
      @on-action="onAction"
    />

    <div v-if="event && event.name" class='f-mt10'>{{event.name}}事件触发，参数为{{event.params}}</div>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref("");
    const inputData = reactive({
        clearable: true,
        search: true,
        password: true,
    });
    const event = reactive({});
    const onSetEvent = (name, params) => {
        event.name = name;
        event.params = params;
        console.log(name, params)
    }
    const onFocus = value => onSetEvent('on-focus', value);
    const onBlur = value => onSetEvent('on-blur', value);
    const onChange = value => onSetEvent('on-change', value);
    const onInput = value => onSetEvent('on-input', value);
    const onAction = (type, value) => onSetEvent('on-action', `type:'${type}', value:'${value}'`);

    return { 
        modelValue,
        inputData,
        event,
        onFocus,
        onBlur,
        onChange,
        onInput,
        onAction,
    };
  },
};
</script>
```
:::
