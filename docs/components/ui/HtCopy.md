# HtCopy 复制

## 代码演示

### 按钮位置

- 复制按钮的位置支持 `top`、`bottom`、`left`、`right` 四种类型，默认类型为 `top`。

::: Demo
```vue demo
<template>
  <div class="copy-demo">
    <ht-copy>和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。</ht-copy>
    <ht-copy :data="{ buttonPosition: 'left'}">和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。</ht-copy>
    <ht-copy :data="{ buttonPosition: 'right'}">和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。</ht-copy>
    <ht-copy :data="{ buttonPosition: 'bottom'}">和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。</ht-copy>
  </div>
</template>
```
:::


### 插槽

- 插槽支持`按钮插槽`和`内容插槽`。

::: Demo
```vue demo
<template>
  <div class="copy-demo">
    <ht-copy>
      <template #button>
        <ht-button :data="{type: 'primary'}">一键复制</ht-button>
      </template>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </ht-copy>
    <ht-copy :data="{buttonPosition: 'right'}">
      <template #button>
        <div class="s-fc3">我要复制</div>
      </template>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </ht-copy>
  </div>
</template>
```
:::