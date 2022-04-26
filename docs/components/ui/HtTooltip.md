# HtTooltip 工具提示

### `Category: base`

`HtTooltip 工具提示`与`HtPopover 气泡弹窗`扩展自同一个组件，配置属性均一致。


## 代码演示

### 基本用法

- 组件控制显示内容属性为`content`，值为`字符串`或`数字`，也可使用插槽定义显示内容。
- 组件控制弹出窗显示内容属性`popContent`，值为`字符串`或`数字`。

::: Demo
```vue demo 
<template>
  <ht-tooltip :data="{ content: '显示文字', popContent: '提示文字' }" />
</template>
```
:::


### 插槽

- 可以使用插槽定义显示内容。


::: Demo
```vue demo 
<template>
  <ht-tooltip :data="{ popContent: '编辑' }">
    <ht-icon :data="{ name: 'u-icon-edit' }" />
  </ht-tooltip>
</template>
```
:::


### 位置

- 组件配置弹窗显示位置属性`position`，值为`字符串`。
- 位置可选项有`top-left`，`top-center`，`top-right`，`bottom-left`，`bottom-center`，`bottom-right`，`left-top`，`left-center`，`left-bottom`，`right-top`，`right-center`，`right-bottom`。
- `position`默认值为`bottom-center`。


::: Demo
```vue demo
<template>
  <ht-tooltip :data="{ position: 'top-center', content: '显示文字', popContent: '提示文字提示文字' }" />
</template>
```
:::


## 配置说明

组件用法和配置项参考 [HtPopover 气泡弹窗](#/doc/HtPopover)说明。