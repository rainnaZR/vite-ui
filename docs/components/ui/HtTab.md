# HtTab 导航

## 代码演示

### 导航类型

- tab导航支持两种显示方式，垂直方式`column` 和 水平方式`row`，默认为水平方式 `row`。

::: Demo
```vue demo
<template>
    <ht-tab :data="{list: [{label: 'tab1', value: 1},{label: 'tab2', value:2}], currentValue: 1, color: '#666', activeColor: '#f00'}" />
</template>
```
:::


- tab导航显示方式为 `column`。


::: Demo
```vue demo
<template>
    <ht-tab style="width: 100px" :data="{direction: 'column', list: [{label: 'tab1', value: 1},{label: 'tab2', value:2}], currentValue: 1, color: '#666', activeColor: '#f00'}" />
</template>
```
:::