# HtCheckbox 多选框

`HtCheckbox 多选框`与`HtRadio 单选框`继承自同一个组件，区别主要有以下两点：

- `multiple` 多选传值true，单选传值false。
- `modelValue` 多选时传数组，单选时传字符串或数字。



## 代码演示

### 基本用法

- 组件多选属性 `multiple` 设置为true，表示多选。
- 组件可通过 `v-model:modelValue` 来实现多选框组值的双向绑定，多选时值为数组。
- 组件可通过 `data` 属性定义组件的配置项。


::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" @on-change="onChange" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [1, 3],
    })
    const checkboxData = reactive({
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
      ],
    });
    const onChange = (value, item, index) => console.log(`选中值${value}，当前点击框值${item.value}，点击框索引${index}`)

    return { 
      state, 
      checkboxData, 
      onChange 
    };
  },
};
</script>
```
:::



### 竖排

- 多选框组件修改排列方式属性`column`，值为数字，表示每一行显示的选择框数量。
- `column`值为1效果如下：


::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [1],
    })
    const checkboxData = reactive({
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
      ],
      column: 1,
    });
    return { 
      state,
      checkboxData 
    };
  },
};
</script>
```
:::


### 自定义图标


- 自定义图标包括`正常图标`和`选中图标`两种。
- 组件自定义正常图标的属性`icon`，值为`字符串`，为样式名。
- 组件自定义选中图标的属性`checkedIcon`，值为`字符串`，为样式名。


::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [1, 3],
    })
    const checkboxData = reactive({
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
      ],
      icon: "u-icon-checkbox",
      checkedIcon: "u-icon-checkboxCheck2",
    });
    return { 
      state,
      checkboxData 
    };
  },
};
</script>
```
:::


### 自定义图标样式


- 自定义图标样式包括`正常图标样式`和`选中图标样式`两种。
- 组件自定义正常图标样式的属性`iconStyle`，值为`样式对象`。
- 组件自定义选中图标样式的属性`checkedIconStyle`，值为`样式对象`。



::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [1, 3],
    })
    const checkboxData = reactive({
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
      ],
      iconStyle: {
        fontSize: "14px",
      },
      checkedIconStyle: {
        fontSize: "18px",
      },
    });
    return { 
      state,
      checkboxData 
    };
  },
};
</script>
```
:::

### 选择框样式

- 选择框可自定义样式属性`style`，值为`样式对象`。
- 选择框可自定义选中样式属性`checkedStyle`，值为`样式对象`。


::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [1, 3],
    })
    const checkboxData = reactive({
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
      ],
      style: {
        color: "#999",
        fontSize: "12px",
      },
      checkedStyle: {
        color: "#359f4e",
        fontSize: "12px",
      },
    });
    return { 
      state,
      checkboxData 
    };
  },
};
</script>
```
:::



### 单个禁用

- 选择框禁用分为`单个禁用`和`全部禁用`。
- 选择框禁用属性为`disabled`，值为布尔值，默认`false`。
- 选择框`单个禁用`效果如下：


::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [2],
    })
    const checkboxData = reactive({
      multiple: true,
      options: [
        {
          label: "选项1",
          value: 1,
        },
        {
          label: "选项2",
          value: 2,
          disabled: true,
        },
        {
          label: "选项3",
          value: 3,
        },
      ],
    });
    return { 
      state,
      checkboxData 
    };
  },
};
</script>
```
:::

### 全部禁用

- 选择框`全部禁用`效果如下：



::: Demo
```vue demo
<template>
    <ht-checkbox v-model:modelValue="state.modelValue" :data="checkboxData" />
</template>

<script lang="ts">
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      modelValue: [2],
    })
    const checkboxData = reactive({
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
      ],
      disabled: true,
    });
    return { 
      state,
      checkboxData 
    };
  },
};
</script>
```
:::

## 配置说明

组件用法和配置项参考 [HtRadio 单选框](http://localhost:1768/doc/HtRadio)说明。