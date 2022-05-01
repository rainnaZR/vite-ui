# HtRichText 富文本

##### `Category: form`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。


:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" />
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
