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