# HtSelect 下拉框

### `Category: form`

## 代码演示

### 基本用法

- 组件可通过 `v-model:modelValue` 来实现组件值的双向绑定。
- 组件可通过 `data` 属性定义组件的配置项。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: "",
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1选项1选项1选项1选项1选项1选项1选项1选项1选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
    });
    return { 
      state, 
      selectData, 
    };
  },
};
</script>
```
:::


### 自定义placeholder

- 组件可自定义 `placeholder`，值为字符串，默认`请选择...`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: "",
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
      placeholder: "请选择下拉框的值...",
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 边框颜色

- 选择框边框颜色修改属性 `borderColor`，默认颜色`#dcdee2`。
- 下拉框选中值的颜色优先取`focusBorderColor`，然后取`borderColor`，最后取默认值`#57a3f3`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: 2,
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
      borderColor: "#f60",
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 聚焦边框颜色

- 选择框聚焦边框颜色修改属性 `focusBorderColor`，默认颜色`#57a3f3`。
- 下拉框选中值的颜色优先取`focusBorderColor`，然后取`borderColor`，最后取默认值`#57a3f3`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: 2,
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
      focusBorderColor: "#67c23a",
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 下拉框样式

- 下拉框自定义样式属性`inputStyle`，值为`样式对象`。



::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: "",
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
      inputStyle: { 
        padding: '10px',
        border: '1px solid rgb(158 219 127)', 
        backgroundColor: 'rgb(233 251 225)', 
      }
    });
    return { 
      state,
      selectData,
    };
  },
};
</script>
```
:::




### 下拉多选

- 下拉框控制是否多选的属性`multiple`，值为布尔值，`true`为多选，`false`为单选，默认值为`false`。
- 下拉框为多选时，`modelValue`值为数组格式。



::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [],
    });
    const selectData = reactive({
      multiple: true,
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
        {
          label: "选项4",
          value: 4,
        },
      ],
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 多选数量限制

- 组件下拉多选时，限制选择的数量属性`maxCount`，值为数字，默认为0，0为`不限制`。
- 超过设置数量后，选择无效果。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [],
    });
    const selectData = reactive({
      multiple: true,
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
        {
          label: "选项4",
          value: 4,
        },
      ],
      maxCount: 2,
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 单选清除

- 组件清除图标是否显示属性 `clearable` ，值为布尔值，默认值为 `false`。
- 组件清除分为`单选清除`和`多选清除`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: 2,
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
      clearable: true,
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::



### 多选清除

- `多选清除`效果如下：


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [1, 2],
    });
    const selectData = reactive({
      multiple: true,
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
        {
          label: "选项4",
          value: 4,
        },
      ],
      clearable: true,
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 输入框筛选

- 组件支持输入框筛选属性`filterable`，值为布尔值，`true`为支持筛选，`false`不支持筛选，默认为`false`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [],
    });
    const selectData = reactive({
      multiple: true,
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
        {
          label: "选项4",
          value: 4,
        },
        {
          label: "选项5",
          value: 5,
        },
        {
          label: "选项6",
          value: 6,
        },
      ],
      filterable: true,
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::



### 单个禁用


- 下拉框禁用分为`单个选项禁用`和`全部禁用`。
- 下拉框禁用属性为`disabled`，值为布尔值，默认`false`。
- 下拉框`单个选项禁用`效果如下：



::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: "",
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
          disabled: true,
        },
      ],
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::



### 全部禁用

- 下拉框`全部禁用`效果如下：


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: 2,
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
      disabled: true,
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 空提示

- 组件下拉数据为空时，自定义文案属性为`emptyText`，值为字符串，默认值为`暂无数据`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: "",
    });
    const selectData = reactive({
      options: [],
      emptyText: "下拉列表数据为空！稍后再试！",
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::


### 插槽

- 下拉选项`label插槽`。
- 下拉选项`状态插槽`。


::: Demo
```vue demo
<template>
    <ht-select v-model:modelValue="state.modelValue" :data="selectData">
      <template v-slot:label="detail">
        <div class="f-f1">{{detail.index+1}}-{{detail.scope.label}}</div>
      </template>
      <template v-slot:status="detail">
        <div v-if="detail.status" class="s-fc1">选中</div>
      </template>
    </ht-select>
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: "",
    });
    const selectData = reactive({
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
    });
    return { 
      state,
      selectData, 
    };
  },
};
</script>
```
:::