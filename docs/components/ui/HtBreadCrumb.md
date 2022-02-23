# HtBreadCrumb 面包屑

### `Category: base`

## 代码演示

- 面包屑支持自定义分隔符 `separator`，默认为 `/`。

::: Demo
```vue demo
<template>
    <ht-bread-crumb :data="breadCrumbData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const breadCrumbData = reactive({
        list: [{
            name: "个人中心",
        },{
            name: "客户列表",
        },{
            name: "客户详情",
        }]
    });
    return { breadCrumbData };
  },
};
</script>
```
:::


- 自定义分隔符`separator`。


::: Demo
```vue demo
<template>
    <ht-bread-crumb :data="breadCrumbData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const breadCrumbData = reactive({
        list: [{
            name: "个人中心",
        },{
            name: "客户列表",
        },{
            name: "客户详情",
        }],
        separator: "|",
    });
    return { breadCrumbData };
  },
};
</script>
```
:::


- 自定义文字颜色 `color` 和选中颜色 `activeColor`。


::: Demo
```vue demo
<template>
    <ht-bread-crumb :data="breadCrumbData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const breadCrumbData = reactive({
        list: [{
            name: "个人中心",
        },{
            name: "客户列表",
        },{
            name: "客户详情",
        }],
        color: "#f1c2a2",
        activeColor: "#f60",
    });
    return { breadCrumbData };
  },
};
</script>
```
:::