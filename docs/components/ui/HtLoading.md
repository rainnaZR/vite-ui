# HtLoading 加载

##### `Category: list`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。

:::Demo
```vue demo
<template>
  <div style="position: relative;height:200px;">
    <ht-loading />
  </div>
</template>
```
:::

### 加载动画

- 组件定制加载动画有三种方式：
- 通过属性`data.media`指定加载动画数据，值为[HtImage 图片组件](#/doc/HtImage)的配置数据。
- 通过插槽定义加载动画，插槽name值为`media`。
- 使用组件内置加载样式，内置样式有四种，属性为`type`，值为`1/2/3/4`，不传则为默认样式。

- 通过`data.media`调用如下：

:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading
      :data="{
        media: {
          width: 150,
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ccee5cf75dc1a801205e4b392210.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651314625&t=5f571f4a54f1d7524ed2d22d3430f303',
        },
      }"
    />
  </div>
</template>
```
:::


- 通过插槽定义如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading>
      <template #media>
        <img
          width="200"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F31f06d5f0bd73877d4bc42a33249d18bf4138268.gif&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651327686&t=57b7672f7ff039fb079a8fc44eac71e7"
        />
      </template>
    </ht-loading>
  </div>
</template>
```
:::


- 内置样式`type`值为`1`显示如下：



:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 1 }" />
  </div>
</template>
```
:::


- 内置样式`type`值为`2`显示如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 2 }" />
  </div>
</template>
```
:::


- 内置样式`type`值为`3`显示如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 3 }" />
  </div>
</template>
```
:::


- 内置样式`type`值为`4`显示如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 4 }" />
  </div>
</template>
```
:::



### 加载内容


- 组件定制加载内容有两种方式：
- 通过属性`data.content`指定文本内容，值支持`字符串/html代码`。
- 通过插槽定义文本内容，插槽name值为`content`。
- 使用`data.content`配置如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ content: '加载中...' }" />
  </div>
</template>
```
:::


- 使用插槽定义如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading>
      <template #content>
        <div>页面正在加载中...</div>
        <div class="f-fs13 s-fc6">如果访问遇到问题，请联系管理员。</div>
      </template>
    </ht-loading>
  </div>
</template>
```
:::


### 指令调用

- 组件可通过指令`v-loading`调用。

:::Demo
```vue demo
<template>
  <div v-loading="true" style="position: relative; height: 200px"></div>
</template>
```
:::


### 方法调用

- 组件可通过实例方法`$loading`实现全局调用。


:::Demo
```vue demo
<template>
  <ht-button @click="onShow">实例方法调用</ht-button>
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const onShow = () => {
      const loading = proxy.$loading();
      setTimeout(loading.close, 2000);
    };
    return { onShow };
  },
};
</script>
```
:::