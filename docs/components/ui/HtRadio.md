# HtRadio 单选框

## 代码演示

### 基本用法

- 组件可通过 `v-model:modelValue` 来实现单选框组值的双向绑定。
- 组件可通过 `data` 属性定义组件的配置项。


::: Demo
```vue demo
<template>
    <ht-radio v-model:modelValue="modelValue" :data="radioData" @on-change="onChange" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      modelValue, 
      radioData, 
      onChange,
    };
  },
};
</script>
```
:::


### 竖排

- 单选框组件修改排列方式属性`column`，值为数字，表示每一行显示的选择框数量。
- `column`值为1效果如下：


::: Demo
```vue demo
<template>
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      modelValue, 
      radioData,
    };
  },
};
</script>
```
:::

### 横排一排二

- `column`值为2效果如下：


::: Demo
```vue demo
<template>
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      column: 2,
    });
    return { 
      modelValue,
      radioData,
    };
  },
};
</script>
```
:::


### 横排一排三

- `column`值为3效果如下：


::: Demo
```vue demo
<template>
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      column: 3,
    });
    return { 
      modelValue,
      radioData,
    };
  },
};
</script>
```
:::


### 自定义图标


- 自定义图标包括`正常图标`和`选中图标`两种。
- 组件自定义正常图标的属性`icon`，值为`样式名`。
- 组件自定义选中图标的属性`checkedIcon`，值为`样式名`。


::: Demo
```vue demo
<template>
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      icon: "u-icon-hidePreview",
      checkedIcon: "u-icon-preview",
    });
    return { 
      modelValue,
      radioData,
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
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      modelValue,
      radioData, 
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
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      modelValue, 
      radioData, 
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
    <ht-radio v-model:modelValue="modelValue" :data="radioData" />
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(2);
    const radioData = reactive({
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
      modelValue,
      radioData, 
    };
  },
};
</script>
```
:::


### 插槽

- 组件支持默认文本插槽，插槽作用域参数为`scope`, `index`。

::: Demo
```vue demo
<template>
    <ht-radio v-model:modelValue="modelValue" :data="radioData">
        <template v-slot="detail">
            {{ detail.index + 1 }}-{{ detail.scope.label }}
        </template>
    </ht-radio>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
export default {
  setup() {
    const modelValue = ref(1);
    const radioData = reactive({
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
      modelValue,
      radioData, 
    };
  },
};
</script>
```
:::