# HtBadge 标记

### `Category: base`

## 代码演示

### 自定义样式

- 组件data属性支持自定义样式属性`style`，值为`样式对象`或`字符串`。

::: Demo
```vue demo
<template>
    <ht-badge :data="{text: 'New'}" />
    <br />

    <ht-badge :data="{text: '3', style: 'background: #f00'}" />
</template>
```
:::



### 自定义文本

- 组件data属性支持自定义文本属性`text`，值为`数字`或`字符串`。

::: Demo
```vue demo
<template>
    <ht-badge :data="{text: '热门'}" />
</template>
```
:::