# HtUpload 文件上传

### `Category: form`


## 代码演示


### 基础用法

- 组件属性在`data`里配置。
- 组件可通过 `v-model:modelValue` 来实现文件列表值的双向绑定。

::: Demo
```vue demo
<template>
  <ht-upload />
  <br />
  <br />

  <ht-upload v-model:modelValue="files" />
</template>
<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    let files = ref(["https://img11.360buyimg.com/babel/s1180x940_jfs/t1/157979/23/24933/170822/61d81108E1cd6a5c7/9baaa560e1d5a871.jpg.webp"])
    return { files };
  },
};
</script>
```
:::

### 单选/多选

- 组件可配置选择属性`multiple`，值为布尔值，默认为`false`单选。

::: Demo
```vue demo
<template>
  <ht-upload :data="{ multiple: true }" />
</template>
```
:::

### 上传按钮

- 组件可配置上传按钮属性`uploadBtnText`上传按钮文案，`uploadBtnType`上传按钮类型，`uploadBtnIcon`上传按钮图标名，`uploadBtnSize`上传按钮大小。
- 若不配置`uploadBtnText`，则展示默认上传样式。



::: Demo
```vue demo
<template>
  <ht-upload :data="{ uploadBtnText: '上传图片' }" />
  <br />
  <br />

  <ht-upload />
</template>
```
:::

### 文件格式校验

- 组件可配置选择文件格式属性`accept`，值为字符串，可参考值有`image/*, application/pdf, */mp4`。
- 组件可配置上传文件格式属性`extensions`，值为逗号分隔的字符串。


- 仅上传图片，示例如下：


::: Demo
```vue demo
<template>
  <ht-upload :data="{ accept: 'images/*', extensions: 'png, jpg' }" @on-error="onError" />
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { $toast } = getCurrentInstance().appContext.config.globalProperties;
    const onError = (err) => $toast.error(err.message);
    return { onError };
  },
};
</script>
```
:::



- 仅上传pdf，示例如下：


::: Demo
```vue demo
<template>
  <ht-upload :data="{ accept: 'application/pdf', extensions: 'pdf' }" @on-error="onError" />
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { $toast } = getCurrentInstance().appContext.config.globalProperties;
    const onError = (err) => $toast.error(err.message);
    return { onError };
  },
};
</script>
```
:::


### 文件尺寸校验

- 组件可配置文件尺寸宽高属性`width`和`height`，值为`数字`，仅针对图片文件有效。



::: Demo
```vue demo
<template>
  <ht-upload :data="{ width: 120, height: 120 }" @on-error="onError" />
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { $toast } = getCurrentInstance().appContext.config.globalProperties;
    const onError = (err) => $toast.error(err.message);
    return { onError };
  },
};
</script>
```
:::



### 文件大小校验

- 组件可配置文件大小校验属性`maxSize`，值为字符串，带单位，单位值为`KB/MB/GB`。



::: Demo
```vue demo
<template>
  <ht-upload :data="{ maxSize: '10KB' }" @on-error="onError" />
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { $toast } = getCurrentInstance().appContext.config.globalProperties;
    const onError = (err) => $toast.error(err.message);
    return { onError };
  },
};
</script>
```
:::

### 上传数量校验

- 组件控制文件上传数量限制属性`limit`，值为`数字`。默认不限。



::: Demo
```vue demo
<template>
  <ht-upload :data="{ limit: 2 }" @on-error="onError" />
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { $toast } = getCurrentInstance().appContext.config.globalProperties;
    const onError = (err) => $toast.error(err.message);
    return { onError };
  },
};
</script>
```
:::


### 提示隐藏

- 组件隐藏限制提示属性`hideTips`，值为布尔值，默认为`false`。



::: Demo
```vue demo
<template>
  <ht-upload :data="{ hideTips: true }" />
</template>
```
:::



### 操作隐藏

- 组件隐藏文件操作属性`hideOperation`，值为布尔值，默认为`false`。操作包括前移，删除，下载，后移，删除全部等操作。



::: Demo
```vue demo
<template>
  <ht-upload :data="{ hideOperation: true }" />
</template>
```
:::

### 文件名隐藏

- 组件隐藏文件名属性`hideFileName`，值为布尔值，默认为`false`。

::: Demo
```vue demo
<template>
  <ht-upload :data="{ hideFileName: true }" />
</template>
```
:::


### 上传禁用

- 组件禁用属性`disabled`，值为`布尔值`，默认为`false`。


::: Demo
```vue demo
<template>
  <ht-upload :data="{ disabled: true }" />
</template>
```
:::