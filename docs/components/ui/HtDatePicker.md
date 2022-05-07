# HtDatePicker 日期选择器

##### `Category: form`

## 代码演示

### 基本用法

- 日期组件引用第三方包[dayjs](https://www.npmjs.com/package/dayjs)，[中文文档说明](https://dayjs.fenxianglu.cn/)。
- 组件可通过 `v-model:modelValue` 来实现日期输入框值的双向绑定。
- 组件可通过 `data` 属性定义组件的配置项。


:::Demo
```vue demo
<template>
  <ht-date-picker v-model:modelValue="value" />
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const value = ref();
    return { value };
  },
};
</script>
```
:::



### 格式化

- 组件可定义日期展示格式属性`format`，值为`字符串`。


:::Demo
```vue demo
<template>
  <ht-date-picker
    v-model:modelValue="value"
    :data="{ format: 'YYYY年MM月dd日', placeholder: '请选择测试日期'}"
  />
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const value = ref();
    return { value };
  },
};
</script>
```
:::