# HtButton 按钮

##### `Category: base`

## 代码演示

### 按钮类型

- 类型支持 `default`、`primary`、`success`、`info`、`warning`、`error`、`text` 七种类型，默认类型为 `default`。


::: Demo
```vue demo
<template>
  <div class="button-demo">
    <ht-button :data="{ type: 'default', size: 'normal'}">default按钮</ht-button>
    <ht-button :data="{ type: 'primary', size: 'normal'}">primary按钮</ht-button>
    <ht-button :data="{ type: 'success', size: 'normal'}">success按钮</ht-button>
    <ht-button :data="{ type: 'info', size: 'normal'}">info按钮</ht-button>
    <ht-button :data="{ type: 'warning', size: 'normal'}">warning按钮</ht-button>
    <ht-button :data="{ type: 'error', size: 'normal'}">error按钮</ht-button>
    <ht-button :data="{ type: 'text', size: 'normal'}">text按钮</ht-button>
  </div>
</template>
```
:::


### 按钮尺寸

- 尺寸支持 `mini`、`small`、`normal`、`big`、`huge`四种尺寸，默认尺寸为 `normal`。


::: Demo
```vue demo
<template>
  <div class="button-demo">
    <ht-button :data="{ type: 'default', size: 'mini'}">mini按钮</ht-button>
    <ht-button :data="{ type: 'default', size: 'small'}">small按钮</ht-button>
    <ht-button :data="{ type: 'primary', size: 'normal'}">normal按钮</ht-button>
    <ht-button :data="{ type: 'success', size: 'big'}">big按钮</ht-button>
    <ht-button :data="{ type: 'info', size: 'huge'}">huge按钮</ht-button>
  </div>
</template>
```
:::

### 按钮状态

- 状态支持 `disabled` 禁用状态和正常状态。


::: Demo
```vue demo
<template>
  <div class="button-demo">
    <ht-button :data="{ type: 'default', size: 'normal', disabled: true}">disabled按钮</ht-button>
    <ht-button :data="{ type: 'primary', size: 'normal', disabled: true}">disabled按钮</ht-button>
    <ht-button :data="{ type: 'success', size: 'normal', disabled: true}">disabled按钮</ht-button>
    <ht-button :data="{ type: 'info', size: 'normal', disabled: true}">disabled按钮</ht-button>
    <ht-button :data="{ type: 'warning', size: 'normal', disabled: true}">disabled按钮</ht-button>
    <ht-button :data="{ type: 'error', size: 'normal', disabled: true}">disabled按钮</ht-button>
    <ht-button :data="{ type: 'text', size: 'normal', disabled: true}">disabled按钮</ht-button>
  </div>
</template>
```
:::


### 长按钮

- 宽度为`100%`的长按钮。


::: Demo
```vue demo
<template>
  <ht-button :data="{ type: 'primary', full: true }">长按钮</ht-button>
</template>
```
:::


### 图标按钮

- 带图标的按钮。

::: Demo
```vue demo
<template>
  <ht-button>
    <ht-icon :data="{name: 'u-icon-download'}" />
  </ht-button>
</template>
```
:::


### 文字图标按钮

- 带图标带文字的按钮。
- 可通过设置`icon`属性定义图标名称。
- 可通过`插槽`定义按钮图标名称。

::: Demo
```vue demo
<template>
  <ht-button :data="{icon: 'u-icon-delete', content: '删除'}" />
  <br /><br />


  <ht-button>
    <ht-icon :data="{name: 'u-icon-delete'}">删除</ht-icon>
  </ht-button>
</template>
```
:::