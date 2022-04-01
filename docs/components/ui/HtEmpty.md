# HtEmpty 空态

### `Category: list`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。


:::Demo
```vue demo
<template>
  <ht-empty />
</template>
```
:::


### 占位图

- 组件定义占位图有两种方式：
- 通过属性`data.image`指定占位图数据，值为[HtImage 图片组件](http://localhost:1768/doc/HtImage)的配置数据。
- 通过插槽定义占位图，插槽name值为`image`。


:::Demo
```vue demo
<template>
  <ht-empty
    :data="{
      image: {
        width: 150,
        src: 'https://tse1-mm.cn.bing.net/th/id/R-C.e8c72accb32dac5e299204290b690928?rik=OVNCQ3w5MxsqGg&riu=http%3a%2f%2fpic.qqtn.com%2ffile%2f2013%2f2014-7%2f2014071809240475262.jpg&ehk=rRPBr5%2fZTAHAEILJq4Ie66O93WlKjdXeV%2fNPb%2b1wmF0%3d&risl=&pid=ImgRaw&r=0',
      },
      content: '大胆刁民',
    }"
  />
</template>
```
:::


- 通过插槽定义如下：


:::Demo
```vue demo
<template>
  <ht-empty>
    <template #image>
      <img
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F00dc4d595f13aca8012193a392e2eb.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651391981&t=50679d92661267ccbf8a9588fa597218"
        width="200"
      />
    </template>
  </ht-empty>
</template>
```
:::



### 文本内容

- 组件定义文本内容有两种方式：
- 通过属性`data.content`指定文本内容，值支持`字符串/html代码`。
- 通过插槽定义文本内容，插槽name值为`content`。



:::Demo
```vue demo
<template>
  <ht-empty :data="{ content: '购物车列表为空' }" />
</template>
```
:::


- 使用插槽定义如下：


:::Demo
```vue demo
<template>
  <ht-empty>
    <template #content>
      <div class="f-mb10">购物车为空，去首页挑选心仪商品吧~</div>
      <ht-button>去首页</ht-button>
    </template>
  </ht-empty>
</template>
```
:::


### 隐藏图片/隐藏文案

- 组件隐藏图片元素属性`hideImage`，值为`布尔值`，默认值为`false`。
- 组件隐藏文案元素属性`hideContent`，值为`布尔值`，默认值为`false`。


:::Demo
```vue demo
<template>
  <ht-empty :data="{ hideImage: true }" />
</template>
```
:::