# HtAction 行动点

##### `Category: list`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。
- 组件效果为组件按钮列表在父容器中自适应排列，当一行不足时显示更多下拉。
- 当行动点按钮较少时：

:::Demo
```vue demo
<template>
  <div style="width: 200px">
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
    const onAction = (action) => console.log(`行动点点击：${action.content}`);
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
  <div style="width: 200px">
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
    const onAction = (action) => console.log(`行动点点击：${action.content}`);
    return { data, onAction };
  }
})
</script>
```
:::


### 隐藏分割线

- 组件隐藏按钮之间分割线属性`hideLine`，值为`布尔值`，默认值为`false`。


:::Demo
```vue demo
<template>
  <div style="width: 200px">
    <ht-action :data="data" @on-action="onAction" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({
      hideLine: true,
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
          type: "modify",
          content: "更改配置项",
        },
        {
          type: "delete",
          content: "删除",
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
    const onAction = (action) => console.log(`行动点点击：${action.content}`);
    return { data, onAction };
  }
})
</script>
```
:::

### 按钮配置

- 组件可定义按钮显示的类型大小，属性有`btnType`，`size`，`icon`，`content`。


:::Demo
```vue demo
<template>
  <ht-action :data="data" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({
      list: [
        {
          type: "edit",
          btnType: 'primary',
          size: 'small',
          icon: 'u-icon-edit',
          content: "编辑",
        },
        {
          type: "delete",
          btnType: 'error',
          size: 'small',
          icon: 'u-icon-delete',
          content: "删除",
        },
      ],
    });
    const onAction = (action) => console.log(`行动点点击：${action.content}`);
    return { data, onAction };
  }
})
</script>
```
:::



### 按钮插槽

- 组件可以使用按钮插槽自定义按钮显示，插槽名为`button`。


:::Demo
```vue demo
<template>
  <div style="width: 200px">
    <ht-action :data="data" @on-action="onAction">
      <template v-slot:button="scope">
        <ht-button>{{ scope.detail.content }}</ht-button>
      </template>
    </ht-action>
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
      ],
    });
    const onAction = (action) => console.log(`行动点点击：${action.content}`);
    return { data, onAction };
  }
})
</script>
```
:::


### "更多"按钮插槽

- 组件可以使用更多按钮插槽自定义更多按钮的显示，插槽名为`more`。


:::Demo
```vue demo
<template>
  <div style="width: 200px">
    <ht-action :data="data" @on-action="onAction">
      <template v-slot:button="scope">
        <ht-button :data="{type: 'primary'}">{{ scope.detail.content }}</ht-button>
      </template>
      <template v-slot:more>
        更多
      </template>
    </ht-action>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const data = reactive({
      hideLine: true,
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
      ],
    });
    const onAction = (action) => console.log(`行动点点击：${action.content}`);
    return { data, onAction };
  }
})
</script>
```
:::