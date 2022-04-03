# HtTag 标签

### `Category: base`

## 代码演示


### 基础用法

- 组件可定义配置属性`data`。
- 组件标签可以删除或点击。

:::Demo
```vue demo 
<template>
  <ht-tag>标签</ht-tag>
</template>
```
:::


### 自定义样式

- 组件自定义样式属性`style`，值为`字符串`或`样式对象`。

:::Demo
```vue demo 
<template>
  <ht-tag :data="{ style: 'background: #f0f9eb;border-color: #e1f3d8;color: #67c23a'}">标签一</ht-tag>
  &nbsp;&nbsp;
   
  <ht-tag :data="{ style: 'background: #fef0f0;border-color: #fde2e2;color: #f56c6c'}">标签二</ht-tag>
  &nbsp;&nbsp;

  <ht-tag :data="{ style: 'background: #67c23a;border-color: #67c23a;color: #fff'}">标签三</ht-tag>
   &nbsp;&nbsp;

  <ht-tag :data="{ style: 'background: #f56c6c;border-color: #f56c6c;color: #fff'}">标签四</ht-tag>
   &nbsp;&nbsp;

  <ht-tag :data="{style: 'line-height: 2;font-size: 12px;'}">小标签</ht-tag>
</template>
```
:::


### 前缀图标

- 组件设置前缀图标属性`icon`，值为icon名称。


:::Demo
```vue demo 
<template>
  <ht-tag :data="{ icon: 'u-icon-user' }">标签</ht-tag>
</template>
```
:::


### 关闭

- 组件设置关闭按钮属性`closable`，值为`布尔值`，默认值为`false`。
- 组件关闭按钮点击触发事件名`on-close`。


:::Demo
```vue demo 
<template>
  <ht-tag :data="{ closable: true }" @on-close="onClose">标签</ht-tag>
  &nbsp;&nbsp;

  <ht-tag :data="{ icon: 'u-icon-user', closable: true }" @on-close="onClose">标签</ht-tag>
</template>

<script lang="ts">
export default {
  setup(){
    const onClose = () => console.log('关闭标签点击')
    return { onClose }
  }
}
</script>
```
:::


### 动态编辑

- 组件可定义`on-click`和`on-close`事件实现动态编辑。

:::Demo
```vue demo 
<template>
  <ht-tag
    v-for="(tag, index) in list"
    class="f-mr10 f-mb10 f-curp"
    :key="index"
    :data="{ closable: true }"
    @on-close="onClose(tag)"
    @on-click="onClick(tag)"
  >
    {{ tag }}
  </ht-tag>
  <div class="f-df">
    <ht-input v-model:modelValue="tagValue" />
    <ht-button class="f-ml10" @on-click="onAdd">新增</ht-button>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const list = reactive(["标签一", "标签二"]);
    const tagValue = ref("");
    const onClose = (tag) => {
      list.splice(list.indexOf(tag), 1);
    };
    const onClick = (tag) => console.log(tag);
    const onAdd = () => {
      list.push(tagValue.value);
      tagValue.value = "";
    };
    return { onClose, list, tagValue, onClick, onClose, onAdd };
  },
};
</script>
```
:::