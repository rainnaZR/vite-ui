# Button 按钮

操作按钮集合。

## 组件引用

::: CopyCode
```JavaScript
import { createApp } from "vue";
import App from "./App.vue";
import { HtButton } from '@htfed/ui';

const app = createApp(App);
app.use(HtButton);
app.mount("#app");
```
:::


## 代码演示

### 按钮类型

- 类型支持 `default`、`primary`、`success`、`info`、`warning`、`danger`、`text` 七种类型，默认类型为 default。


::: Demo
```vue demo
<template>
  <ht-button :data="{ type: 'default', size: 'normal'}">default按钮</ht-button>
  <ht-button :data="{ type: 'primary', size: 'normal'}">primary按钮</ht-button>
  <ht-button :data="{ type: 'success', size: 'normal'}">success按钮</ht-button>
  <ht-button :data="{ type: 'info', size: 'normal'}">info按钮</ht-button>
  <ht-button :data="{ type: 'warning', size: 'normal'}">warning按钮</ht-button>
  <ht-button :data="{ type: 'danger', size: 'normal'}">danger按钮</ht-button>
  <ht-button :data="{ type: 'text', size: 'normal'}">text按钮</ht-button>
</template>
```
:::


### 按钮尺寸

- 尺寸支持 `small`、`normal`、`big`、`huge`四种尺寸，默认尺寸为 normal。


::: Demo
```vue demo
<template>
  <ht-button :data="{ type: 'default', size: 'small'}">default按钮</ht-button>
  <ht-button :data="{ type: 'primary', size: 'normal'}">primary按钮</ht-button>
  <ht-button :data="{ type: 'success', size: 'big'}">success按钮</ht-button>
  <ht-button :data="{ type: 'info', size: 'huge'}">info按钮</ht-button>
</template>
```
:::

### 按钮状态

- 状态支持 `disabled` 禁用状态和正常状态。


::: Demo
```vue demo
<template>
  <ht-button :data="{ type: 'default', size: 'normal', disabled: true}">default按钮</ht-button>
  <ht-button :data="{ type: 'primary', size: 'normal', disabled: true}">primary按钮</ht-button>
  <ht-button :data="{ type: 'success', size: 'normal', disabled: true}">success按钮</ht-button>
  <ht-button :data="{ type: 'info', size: 'normal', disabled: true}">info按钮</ht-button>
  <ht-button :data="{ type: 'warning', size: 'normal', disabled: true}">warning按钮</ht-button>
  <ht-button :data="{ type: 'danger', size: 'normal', disabled: true}">danger按钮</ht-button>
  <ht-button :data="{ type: 'text', size: 'normal', disabled: true}">text按钮</ht-button>
</template>
```
:::


### 长按钮

- 宽度为`100%`的长按钮。


::: Demo
```vue demo
<template>
  <ht-button :data="{ type: 'primary', full: true }">primary按钮</ht-button>
</template>
```
:::




## Props属性


| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 代码内容，双向绑定 | String | — | — |
| options     | 控制编辑器的选项 | Object | — | {tabSize: 0,theme: 'cobalt',lineNumbers: false,smartIndent: false} |



## Events事件

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 按钮点击事件 | event |


## Functions方法

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 按钮点击事件 | event |


## Slote插槽

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click | 按钮点击事件 | event |


## 案例页面
