# HtTree 树组件

### `Category: base`

## 代码演示

### 基本用法

- 组件可通过 `data` 属性定义组件的配置项。

:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const data = {
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              children: [
                {
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::



### 展开配置项

- 组件可设置展开配置项属性`spreadConfig`，值为对象，属性有`key`，`value`，`depth`，可分别设置。
- 通过设置`key=value`展开节点如下：


:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const data = {
      spreadConfig: {
        key: "label",
        value: "Level two 2-1",
      },
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              children: [
                {
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::


- 通过设置`depth`展开节点如下：`depth`值为数字，表示默认展开第几个层级。


:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const data = {
      spreadConfig: {
        depth: 2,
      },
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              children: [
                {
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::


- 组件节点也可设置`spread`值表示是否展开，值为`布尔值`。示例如下：


:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const data = {
      spreadConfig: {
        depth: 1,
      },
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              disabled: true,
              children: [
                {
                  label: "Level three 1-1-1",
                  spread: true,
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                  spread: true,
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          disabled: true,
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::


### 选择配置项

- 组件可配置选择框显示属性`showCheckbox`，值为`布尔值`，默认为`false`。
- 组件可设置选择配置项属性`checkConfig`，值为对象，属性有`key`，`value`。


:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const data = {
      showCheckbox: true,
      checkedConfig: {
        key: "label",
        value: ["Level two 2-2", "Level two 3-2"],
      },
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              children: [
                {
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::



- 组件节点可配置属性`checked`表示是否选中，值为`数字`，可选项有`1选中`，`0未选中`。


:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const data = {
      showCheckbox: true,
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              disabled: true,
              children: [
                {
                  label: "Level three 1-1-1",
                  checked: true,
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                  checked: true,
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          disabled: true,
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::


### 禁用

- 组件设置节点选中禁用属性`disabled`，值为`布尔值`，默认值为`false`。



:::Demo
```vue demo
<template>
  <ht-tree :data="data" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const data = {
      showCheckbox: true,
      list: [
        {
          label: "Level one 1",
          children: [
            {
              label: "Level two 1-1",
              disabled: true,
              children: [
                {
                  label: "Level three 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 2",
          children: [
            {
              label: "Level two 2-1",
              children: [
                {
                  label: "Level three 2-1-1",
                },
              ],
            },
            {
              label: "Level two 2-2",
              children: [
                {
                  label: "Level three 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "Level one 3",
          disabled: true,
          children: [
            {
              label: "Level two 3-1",
              children: [
                {
                  label: "Level three 3-1-1",
                },
              ],
            },
            {
              label: "Level two 3-2",
              children: [
                {
                  label: "Level three 3-2-1",
                },
              ],
            },
          ],
        },
      ],
    };
    return { data };
  },
});
</script>
```
:::

