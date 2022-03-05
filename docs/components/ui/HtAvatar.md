# HtAvatar 头像

### `Category: base`


## 代码演示


### 基础用法

- 组件属性在`data`里配置。
- 组件支持`图片头像`和`文字头像`两种。

::: Demo
```vue demo
<template>
  <ht-avatar :data="{ src: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar' }" />
</template>
```
:::


### 默认头像

- 当无图片时会使用默认头像。
- 默认头像设置属性`defaultImg`，不设置时取系统设置默认头像。

::: Demo
```vue demo
<template>
  <ht-avatar />
  <br />

  <ht-avatar :data="{ defaultImg: 'https://img2.baidu.com/it/u=1661624596,544958493&fm=253&fmt=auto&app=138&f=JPEG?w=260&h=280' }" />
</template>
```
:::


### 尺寸设置

- 组件设置尺寸属性`width`，`height`，值为`数字`，默认值为`30`px。


::: Demo
```vue demo
<template>
  <ht-avatar :data="{ width: 60, height: 60, src: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar' }" />
</template>
```
:::


### 文字头像


- 组件设置文字属性`content`，值为`字符串`。


::: Demo
```vue demo
<template>
  <ht-avatar :data="{ content: '张三' }" />
</template>
```
:::

- 也可以使用插槽定义文字。


::: Demo
```vue demo
<template>
  <ht-avatar>张三</ht-avatar>
</template>
```
:::

- content内容字号由字数决定。


::: Demo
```vue demo
<template>
  <ht-avatar :data="{ content: '张' }" />
  <br />

  <ht-avatar :data="{ content: '张三' }" />
</template>
```
:::


### 文字限制

- 组件可设置头像显示文字字数限制属性`limit`，值为`数字`，默认值为`1`。


::: Demo
```vue demo
<template>
  <ht-avatar :data="{ limit: 1, width: 60, height: 60, content: '管理员' }" />
  <br />

  <ht-avatar :data="{ limit: 2, content: '管理员' }" />
  <br />

  <ht-avatar :data="{ limit: 2, width: 60, height: 60, content: '管理员' }" />
  <br />

  <ht-avatar :data="{ limit: 3, width: 60, height: 60, content: '管理员' }" />
</template>
```
:::