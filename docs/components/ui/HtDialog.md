# HtDialog 对话框

### `Category: base`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。

:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible">
    <div>您确认要删除用户夏洛特？</div>
    <template #footer>
      <ht-button @click="visible = false">取消</ht-button>
      <ht-button :data="{ type: 'primary' }" @click="visible = false">
        确认
      </ht-button>
    </template>
  </ht-dialog>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const visible = ref(false);
    return { visible };
  },
};
</script>
```
:::


### 样式

- 组件定义外层容器样式属性`wrapStyle`，值为`样式对象`。
- 组件设置弹窗内容样式属性`style`，值为`样式对象`。
- 组件设置弹窗顶部内容样式属性`headerStyle`，值为`样式对象`。
- 组件设置弹窗主体内容样式属性`contentStyle`，值为`样式对象`。
- 组件设置弹窗底部内容样式属性`footerStyle`，值为`样式对象`。


:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      content: '您确认要删除用户夏洛特？',
      wrapStyle: {
        background: "none",
      },
    });
    return { visible, data };
  },
};
</script>
```
:::



### 关闭

- 组件设置右上角关闭按钮属性`closable`，值为`布尔值`，默认值为`undefined`，有且仅有值为`false`时关闭按钮不显示。
- 组件设置蒙层点击关闭属性`maskClosable`，值为`布尔值`，默认值为`undefined`，有且仅有值为`false`时点击无响应。



:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      content: "您确认要删除用户夏洛特？",
      closable: true,
      maskClosable: true,
    });
    return { visible, data };
  },
};
</script>
```
:::


### 类型

- 组件指定显示类型属性`type`，可选值有`info`，`success`，`error`，`warning`。


:::Demo
```vue demo
<template>
  <ht-button @on-click="onShowDialog('info')">Info对话框</ht-button>
  <ht-button @on-click="onShowDialog('success')">Success对话框</ht-button>
  <ht-button @on-click="onShowDialog('error')">Error对话框</ht-button>
  <ht-button @on-click="onShowDialog('warning')">Warning对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = ref({});
    const onShowDialog = (type) => {
      data.value = {
        type,
        content: "我是提示信息！",
      };
      visible.value = true;
    };
    return { visible, data, onShowDialog };
  },
};
</script>
```
:::


### 宽度/高度

- 组件定义宽度属性`width`，值为`字符串`，默认为`420px`。
- 组件定义高度属性`height`，值为`字符串`，不传则以内容高度为准。

:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      width: "600px",
      content: "您确认要删除用户夏洛特？",
    });
    return { visible, data };
  },
};
</script>
```
:::



### 标题

- 组件定义标题属性`title`，值为`字符串`，默认值为`提示`。



:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      title: "删除用户",
      content: "您确认要删除用户夏洛特？",
    });
    return { visible, data };
  },
};
</script>
```
:::


### 内容

- 组件定义内容有两种方式：
- 通过设置属性`content`来展示内容。
- 通过`插槽`来设置内容。



:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog
    v-model:visible="visible"
    :data="{ title: '用户登录', hideFooter: true }"
  >
    <ht-login-pwd />
  </ht-dialog>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const visible = ref(false);
    return { visible };
  },
};
</script>
```
:::


### 底部提示

- 组件设置底部提示属性`footerTips`，值为`字符串`。



:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      content: "您确认要删除用户夏洛特？",
      footerTips: "只有管理员有该权限。",
    });
    return { visible, data };
  },
};
</script>
```
:::


### 模块隐藏

- 组件设置顶部模块隐藏属性`hideHeader`，值为`布尔值`，默认值为`false`。
- 组件设置底部模块隐藏属性`hideFooter`，值为`布尔值`，默认值为`false`。
- 组件设置确认按钮隐藏属性`hideConfirmButton`，值为`布尔值`，默认值为`false`。
- 组件设置取消按钮隐藏属性`hideCancelButton`，值为`布尔值`，默认值为`false`。



:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      content: "您确认要删除用户夏洛特？",
      hideConfirmButton: true,
      cancelButton: {
        type: "success",
        content: "我知道了",
      },
    });
    return { visible, data };
  },
};
</script>
```
:::



### 操作

- 组件设置确认按钮操作属性`confirmButton`，值为[HtButton 按钮组件](http://localhost:1768/doc/HtButton)的配置数据。
- 组件设置取消按钮操作属性`cancelButton`，值为[HtButton 按钮组件](http://localhost:1768/doc/HtButton)的配置数据。


:::Demo
```vue demo
<template>
  <ht-button @on-click="visible = true">打开对话框</ht-button>

  <ht-dialog v-model:visible="visible" :data="data" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";

export default {
  setup() {
    const visible = ref(false);
    const data = reactive({
      content: "您确认要删除用户夏洛特？",
      confirmButton: {
        type: "success",
        content: "再次提交",
      },
      cancelButton: {
        type: "info",
        content: "返回",
      },
    });
    return { visible, data };
  },
};
</script>
```
:::



- 组件可定义确认按钮点击事件属性`onConfirm`，值为`函数`。
- 组件可定义取消按钮点击事件属性`onCancel`，值为`函数`。




:::Demo
```vue demo
<template>
  <ht-button @on-click="onShowDialog">打开对话框</ht-button>
</template>

<script lang="ts">
import { getCurrentInstance } from "vue";
export default {
  setup() {
    const { $dialog } = getCurrentInstance().appContext.config.globalProperties;
    const onShowDialog = () => {
      $dialog.show({
        title: "用户删除",
        content: "你确认要删除用户啦啦啦吗？",
        onConfirm: () => {
          console.log("确认按钮点击");
        },
        onCancel: () => {
          $dialog.close();
          console.log("取消按钮点击");
        },
      });
    };
    return { onShowDialog };
  },
};
</script>
```
:::