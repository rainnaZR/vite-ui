# HtToast 提示

### `Category: base`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。

:::Demo
```vue demo
<template>
  <ht-button @click="onToast">提示</ht-button>
  <ht-button @click="onSuccessToast">成功提示</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = () => proxy.$toast("提交成功");
    const onSuccessToast = () => proxy.$toast.success("提交成功");
    return { onToast, onSuccessToast };
  },
});
</script>
```
:::


### 类型

- 组件配置提示展示类型属性`type`，值支持四种，包括`info`，`success`，`error`，`warning`。


:::Demo
```vue demo
<template>
  <ht-button @click="onToast()">默认类型提交</ht-button>
  <ht-button @click="onToast('info')">info类型提交</ht-button>
  <ht-button @click="onToast('success')">success类型提交</ht-button>
  <ht-button @click="onToast('error')">error类型提交</ht-button>
  <ht-button @click="onToast('warning')">warning类型提交</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = (type) =>
      proxy.$toast({
        type,
        content: "提示信息",
      });
    return { onToast };
  },
});
</script>
```
:::


### 内容

- 组件可配置文本内容属性`content`，支持`文本内容`和`html字符串`。


:::Demo
```vue demo
<template>
  <ht-button @click="onToast">提示</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = () => proxy.$toast.success("<span style='font-size: 18px'>成功</span>提示信息");
    return { onToast };
  },
});
</script>
```
:::


### 图标

- 组件可配置图标属性`icon`，值为`iconfont图标名`，类型为`字符串`。


:::Demo
```vue demo
<template>
  <ht-button @click="onToast">提示</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = () =>
      proxy.$toast({
        type: 'success',
        content: '提示信息',
        icon: 'u-icon-user',
      });
    return { onToast };
  },
});
</script>
```
:::



### 关闭按钮

- 组件控制关闭按钮显示属性`closable`，值为`布尔值`，默认值为`false`，点击后可手动关闭提示。


:::Demo
```vue demo
<template>
  <ht-button @click="onToast()">默认类型提交</ht-button>
  <ht-button @click="onToast('info')">info类型提交</ht-button>
  <ht-button @click="onToast('success')">success类型提交</ht-button>
  <ht-button @click="onToast('error')">error类型提交</ht-button>
  <ht-button @click="onToast('warning')">warning类型提交</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = (type) =>
      proxy.$toast({
        type,
        content: "提示信息",
        closable: true,
      });
    return { onToast };
  },
});
</script>
```
:::


### 显示时间

- 组件控制提示显示时间属性为`duration`，值为`数字`，默认值为`3000`。当值为0时，提示不消失。




:::Demo
```vue demo
<template>
  <ht-button @click="onToast">提示</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = () =>
      proxy.$toast({
        type: 'success',
        content: '提示信息',
        duration: 0,
      });
    return { onToast };
  },
});
</script>
```
:::



### 偏移量

- 组件控制距离屏幕上方偏移量显示属性为`offset`，值为`数字`，默认值为`20`。




:::Demo
```vue demo
<template>
  <ht-button @click="onToast">提示</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onToast = () =>
      proxy.$toast({
        type: 'success',
        content: '提示信息',
        offset: 100,
      });
    return { onToast };
  },
});
</script>
```
:::





### 方法调用

- 组件调用方式支持`$toast.info()`，`$toast.success()`，`$toast.error()`，`$toast.warning()`。


:::Demo
```vue demo
<template>
  <ht-button @click="onInfoToast">info类型提交</ht-button>
  <ht-button @click="onSuccessToast">success类型提交</ht-button>
  <ht-button @click="onErrorToast">error类型提交</ht-button>
  <ht-button @click="onWarningToast">warning类型提交</ht-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const onInfoToast = () => {
      proxy.$toast.info("提示信息");
    };
    const onSuccessToast = () => {
      proxy.$toast.success("提示信息");
    };
    const onErrorToast = () => {
      proxy.$toast.error("提示信息");
    };
    const onWarningToast = () => {
      proxy.$toast.warning("提示信息");
    };
    return { onInfoToast, onSuccessToast, onErrorToast, onWarningToast };
  },
});
</script>
```
:::


- 组件也支持直接引入的方式来调用。


:::Demo
```vue demo
<template>
  <ht-button @click="onToast">成功提示</ht-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HtToast } from "~/HtUi/index.ts";

export default defineComponent({
  setup() {
    const onToast = () => HtToast.success("提交成功");
    return { onToast };
  },
});
</script>
```
:::
