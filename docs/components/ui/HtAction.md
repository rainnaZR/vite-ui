# HtAction 行动点

### `Category: list`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。
- 组件效果为组件按钮列表在父容器中自适应排列，当一行不足时显示更多下拉。
- 当行动点按钮较少时：

:::Demo
```vue demo
<template>
  <div style="width: 300px">
    <ht-action :data="data" @on-action="onAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({
      list: [
        {
          type: "edit",
          content: "编辑",
        },
        {
          type: "detail",
          content: "查看",
        },
        {
          type: "delete",
          content: "删除",
        },
      ],
    });
    const onAction = (action) => alert(`行动点点击：类型为${action.type}`);
    return { data, onAction };
  }
})
</script>
```
:::


- 当行动点按钮较多时：

:::Demo
```vue demo
<template>
  <div style="width: 300px">
    <ht-action :data="data" @on-action="onAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({
      list: [
        {
          type: "edit",
          content: "编辑",
        },
        {
          type: "detail",
          content: "查看",
        },
        {
          type: "delete",
          content: "删除",
        },
        {
          type: "modify",
          content: "更改配置项",
        },
        {
          type: "sort",
          content: "排序权重值升序排列",
        },
        {
          type: "invalid",
          content: "失效",
        },
        {
          type: "valid",
          content: "生效",
        }
      ],
    });
    const onAction = (action) => alert(`行动点点击：类型为${action.type}`);
    return { data, onAction };
  }
})
</script>
```
:::
