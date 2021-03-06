# HtIcon 图标


##### `Category: base`

## 代码演示

### 基础用法

- 图标支持 `name` 和 `style` 两个属性设置。


::: Demo
```vue demo
<template>
  <div class="icon-demo icon-demo-1">
    <ht-icon :data="{ name: 'u-icon-delete' }" />
    <ht-icon :data="{ name: 'u-icon-delete', style: 'color: red' }" />
    <ht-icon :data="{ name: 'u-icon-delete', style: 'font-size: 24px;' }" />
    <ht-icon :data="{ name: 'u-icon-delete' }">删除</ht-icon>
  </div>
</template>
```
::: 


### 图标库

- 组件库中用到的 `图标库` 如下：


::: Demo
```vue demo
<template>
  <div class="icon-demo">
    <ht-icon v-for="(name, index) in iconList" :key="index" :data="{ name }">{{name}}</ht-icon>
  </div>
</template>

<script>
import iconList from './icon.js'

export default {
    setup(){
        return {
            iconList
        }
    }
}
</script>
```
:::
