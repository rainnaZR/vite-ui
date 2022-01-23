# HtImage 图片

## 代码演示

### 基本用法

- 图片填充方式支持 `cover`, `contain` 两种方式，默认填充方式为 `cover`。

::: Demo
```vue demo
<template>
    <div class="image-demo">
        <ht-image :data="{src: 'https://img11.360buyimg.com/babel/s1180x940_jfs/t1/157979/23/24933/170822/61d81108E1cd6a5c7/9baaa560e1d5a871.jpg.webp'}" />

        <ht-image :data="{src: 'https://img11.360buyimg.com/babel/s1180x940_jfs/t1/157979/23/24933/170822/61d81108E1cd6a5c7/9baaa560e1d5a871.jpg.webp', width: 500, height: 300, fill: 'cover', cssStyle: 'border-radius: 150px;'}" />

        <ht-image :data="{src: 'https://img11.360buyimg.com/babel/s1180x940_jfs/t1/157979/23/24933/170822/61d81108E1cd6a5c7/9baaa560e1d5a871.jpg.webp', width: 500, height: 300, fill: 'contain'}" />
    </div>
</template>
```