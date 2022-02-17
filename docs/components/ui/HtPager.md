# HtPager 分页

## 代码演示

### 基本用法

- 组件可通过`v-model:pageIndex`来实现页码值的双向绑定，默认值为`1`。
- 组件可通过`v-model:pageSize`来实现每页数量值的双向绑定，默认值为`10`。
- 组件可通过 data 属性定义组件的配置项。

:::Demo
```vue demo
<template>
  <ht-pager :data="{ total: 20 }" />
  <br />

  <ht-pager :data="{ total: 1000, pageSizes: [10, 100] }" />
</template>
```
:::

### 布局

- 组件布局模块属性`layout`，值为`字符串`，默认值为`total, prev, pager, next, sizes, jumper`。
- `total`为总数显示模块。
- `prev`为上一页按钮模块。
- `pager`为页码模块，其中包括快速前进，快速后退操作。
- `next`为下一页按钮模块。
- `sizes`为页码大小下拉模块，值为每页数量，默认值为`10, 20, 30, 50, 100`。
- `jumper`为输入框跳转翻页模块。

:::Demo
```vue demo
<template>
  <ht-pager :data="{ total: 20 }" />
  <br />

  <ht-pager :data="{ total: 50, layout: 'total, prev, pager, next' }" />
  <br />

  <ht-pager :data="{ total: 1000, layout: 'prev, pager, next' }" />
</template>
```
:::
 

### 页码展示数量限制

- 组件控制页码显示数量属性`pageShowLimit`，值为`数字`，默认值为`7`。

:::Demo
```vue demo
<template>
  <ht-pager :data="{ total: 100, pageShowLimit: 3 }" />
  <br />

  <ht-pager :data="{ total: 100, pageShowLimit: 4 }" />
  <br />

  <ht-pager :data="{ total: 100, pageShowLimit: 5 }" />
  <br />

  <ht-pager :data="{ total: 100, pageShowLimit: 6 }" />
  <br />

  <ht-pager :data="{ total: 150, pageShowLimit: 7 }" />
  <br />

  <ht-pager :data="{ total: 1000, pageShowLimit: 8 }" />
  <br />

  <ht-pager :data="{ total: 1000, pageShowLimit: 9 }" />
</template>
```
:::


### 容器样式

- 组件控制容器样式属性`wrapStyle`，值为`样式对象`。


:::Demo
```vue demo
<template>
  <ht-pager :data="{ total: 20, wrapStyle: { padding: '15px', background: '#efefef'} }" />
</template>
```
:::


### 页码样式

- 组件控制默认页码样式属性`pagerItemStyle`，值为`样式对象`。
- 组件控制选中页码样式属性`activePagerItemStyle`，值为`样式对象`。

:::Demo
```vue demo
<template>
  <ht-pager
    :data="{
      total: 1000,
      pagerItemStyle: {
        background: '#f4f4f5',
      },
      activePagerItemStyle: {
        background: '#359f4e',
        color: '#fff',
      },
    }"
  />
  <br />

  <ht-pager
    :data="{
      total: 1000,
      pagerItemStyle: {
        border: '1px solid #efefef',
      },
      activePagerItemStyle: {
        border: '1px solid #359f4e',
        color: '#359f4e',
      },
    }"
  />
  <br />

  <ht-pager
    :data="{
      total: 1000,
      layout: 'prev, pager, next',
      wrapStyle: {
        fontSize: '12px',
      },
      pagerItemStyle: {
        width: '24px',
        margin: 0,
        lineHeight: '24px',
      },
      activePagerItemStyle: {
        margin: 0,
      },
    }"
  />
</template>
```
:::

### 页码大小下拉框/输入框边框颜色

- 组件控制页码大小下拉框边框颜色属性`sizeBorderColor`，值为`字符串`。
- 组件控制页码输入框边框颜色属性`inputBorderColor`，值为`字符串`。

:::Demo
```vue demo
<template>
  <ht-pager
    :data="{
      total: 1000,
      sizeBorderColor: '#f60',
      inputBorderColor: '#f60',
      activePagerItemStyle: {
        color: '#f60',
      }
    }"
  />
</template>
```
:::

### 仅一页时显示页码

- 组件仅一页时显示翻页器属性`showSinglePage`，值为`布尔值`，默认值为`false`。



:::Demo
```vue demo
<template>
  <ht-pager
    :data="{ total: 5, showSinglePage: true }"
  />
</template>
```
:::

### 插槽

- 插槽有四个，包含总数插槽，上一页插槽，页码插槽，下一页插槽。


:::Demo
```vue demo
<template>
  <ht-pager :data="{ total: 54000 }">
    <template v-slot:total="detail">{{ detail.scope.total / 10000 }}万</template>
    <template #prev>上一页</template>
    <template v-slot:pageNumber="detail">{{ detail.scope.value }}页</template>
    <template #next>下一页</template>
  </ht-pager>
  <br />

  <ht-pager :data="{ total: 54000, buttonConfigData: { type: 'primary', style: '#fff' } }">
    <template #prev>上一页</template>
    <template #next>下一页</template>
  </ht-pager>
</template>
```
:::