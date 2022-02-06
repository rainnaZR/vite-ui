# HtSwitch 开关

## 代码演示

### 基本用法

- 组件可通过 `v-model:modelValue` 来实现组件值的双向绑定，值为布尔值，`true`为打开，`false`为关闭。
- 组件可通过 `data` 属性定义组件的配置项。


::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="switchData.modelValue" :data="switchData" @on-change="onChange" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const switchData = reactive({
      modelValue: true,
    });
    const onChange = value => console.log(`开关值${value}`);
    return { switchData, onChange };
  },
};
</script>
```
:::

### 开关颜色

- 组件可通过属性`activeColor`控制`开启颜色`，默认颜色`#13ce66`。
- 组件可通过属性`inActiveColor`控制`关闭颜色`，默认颜色`#dcdfe6`。


::: Demo
```vue demo
<template>
    <ht-switch v-model:modelValue="switchData.modelValue" :data="switchData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const switchData = reactive({
      modelValue: false, 
      activeColor: "#f60", 
      inActiveColor: "#999",
    });
    return { switchData };
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
    <ht-switch v-model:modelValue="switchData.modelValue" :data="switchData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const switchData = reactive({
      modelValue: true, 
      circleColor: "rgba(255, 255, 255, .7)",
    });
    return { switchData };
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
    <ht-switch v-model:modelValue="switchData.modelValue" :data="switchData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const switchData = reactive({
      modelValue: false, 
      style: {
          transform: "scale(1.4)"
      }
    });
    return { switchData };
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
    <ht-switch v-model:modelValue="switchData.modelValue" :data="switchData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const switchData = reactive({
      modelValue: true, 
      disabled: true,
    });
    return { switchData };
  },
};
</script>
```
:::