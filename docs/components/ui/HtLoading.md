# HtLoading 加载

### `Category: list`

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

- 组件定制加载动画有两种方式：通过属性`data.imageData`指定加载动画数据；通过动画插槽定义。
- 组件定制加载动画数据属性`imageData`，值为`[HtImage 图片组件](http://localhost:1768/doc/HtImage)`的配置数据。


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading
      :data="{
        imageData: {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ccee5cf75dc1a801205e4b392210.gif&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651314625&t=5f571f4a54f1d7524ed2d22d3430f303',
          width: 150,
        },
      }"
    />
  </div>
</template>
```
:::


- 通过插槽定义加载动画，插槽`name`值为`media`。


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


### 加载内容


- 组件定制加载内容有两种方式：通过属性`data.content`指定文本内容；通过内容插槽定义。


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ content: '加载中...' }" />
  </div>
</template>
```
:::


- 通过插槽定义文本内容，插槽`name`值为`content`。


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading>
      <template #content>
        <p>页面正在加载中...</p>
        <div class="f-fs13 s-fc6">如果访问遇到问题，请联系管理员。</div>
      </template>
    </ht-loading>
  </div>
</template>
```
:::


### 加载样式

- 组件可指定加载样式属性`type`，值为`数字`，不传值则为默认样式。
- `type`值为`1`样式如下：



:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 1 }" />
  </div>
</template>
```
:::


- `type`值为`2`样式如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 2 }" />
  </div>
</template>
```
:::


- `type`值为`3`样式如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 3 }" />
  </div>
</template>
```
:::


- `type`值为`4`样式如下：


:::Demo
```vue demo
<template>
  <div style="position: relative; height: 200px">
    <ht-loading :data="{ type: 4 }" />
  </div>
</template>
```
:::