# HtSwitch 开关

### `Category: form`

## 代码演示

### 基本用法

- 组件可通过 `v-model:modelValue` 来实现组件值的双向绑定，值为布尔值，`true`为打开，`false`为关闭。
- 组件可通过 `data` 属性定义组件的配置项。


::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="modelValue" @on-change="onChange" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref(true);
    const onChange = value => console.log(`开关值${value}`);
    return { 
      modelValue, 
      onChange, 
    };
  },
};
</script>
```
:::

### 开关颜色

- 组件可通过属性`activeColor`控制`开启颜色`，默认颜色`#57a3f3`。
- 组件可通过属性`inActiveColor`控制`关闭颜色`，默认颜色`#dcdfe6`。


::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="modelValue" :data="{ activeColor: '#f60', inActiveColor: '#999'}" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref(false);
    return { modelValue };
  },
};
</script>
```
:::


### 滑块颜色

- 组件可通过属性`circleColor`控制`滑块按钮背景色`，默认颜色`#fff`。


::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="modelValue" :data="{ circleColor: 'rgba(255, 255, 255, .7)' }" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref(true);
    return { modelValue };
  },
};
</script>
```
:::


### 自定义样式

- 组件可通过属性`style`控制组件外观样式。


::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="modelValue" :data="{ style: { transform: 'scale(1.4)' }}" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref(false);
    return { modelValue };
  },
};
</script>
```
:::


### 禁用

- 组件可通过属性`disabled`控制禁用状态。

::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="modelValue" :data="{ disabled: true }" />
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const modelValue = ref(true);
    return { modelValue };
  },
};
</script>
```
:::