# HtTab 导航

### `Category: base`

## 代码演示

- tab导航支持两种显示方式，垂直方式`column` 和 水平方式`row`，默认为水平方式 `row`。

### 水平导航

::: Demo
```vue demo
<template>
    <ht-tab v-model:modelValue="modelValue" :data="tabData" @on-change="onClickTab"/>
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup(){
        const modelValue = ref("");
        const tabData = reactive({
            list: [{
                label: 'tab1', 
                value: 1
            },{
                label: 'tab2', 
                value: 2
            },{
                label: 'tab3', 
                value: 3
            }],
        })
        return {
            modelValue,
            tabData,
            onClickTab: (tab, index, depth) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'，导航深度为${depth}`)
        }
    }
}
</script>
```
:::

### 垂直导航

- tab导航 direction 显示方式为 `column`。


::: Demo
```vue demo
<template>
    <ht-tab style="width: 100px" v-model:modelValue="modelValue" :data="tabData" />
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup(){
        const modelValue = ref("");
        const tabData = reactive({
            direction: 'column',
            list: [{
                label: 'tab1', 
                value: 1
            },{
                label: 'tab2', 
                value: 2
            },{
                label: 'tab3', 
                value: 3
            }],
        })
        return {
            modelValue,
            tabData,
        }
    }
}
</script>
```
:::

### 自定义样式水平导航

- tab自定义样式属性`style`。
- tab自定义选中样式属性`activeStyle`。


::: Demo
```vue demo
<template>
    <ht-tab v-model:modelValue="modelValue" :data="tabData" />
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup(){
        const modelValue = ref("");
        const tabData = reactive({
            list: [{
                label: 'tab1', 
                value: 1
            },{
                label: 'tab2', 
                value: 2
            },{
                label: 'tab3', 
                value: 3
            }],
            style: "color: #666",
            activeStyle: "color: rgb(255, 102, 0);background: rgba(255, 102, 0, 0.12);",
        })
        return {
            modelValue,
            tabData,
        }
    }
}
</script>
```
:::


### 自定义样式垂直导航

::: Demo
```vue demo
<template>
    <ht-tab style="width:200px" v-model:modelValue="modelValue" :data="tabData" />
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup(){
        const modelValue = ref(2);
        const tabData = reactive({
            direction: 'column',
            list: [{
                label: 'tab1', 
                value: 1
            },{
                label: 'tab2', 
                value: 2
            },{
                label: 'tab3', 
                value: 3
            }],
            style: "color: #666",
            activeStyle: "color: rgb(255, 102, 0);background: rgba(255, 102, 0, 0.12);",
        })
        return {
            modelValue,
            tabData,
        }
    }
}
</script>
```
:::


### 多层级水平导航

- 导航层级支持二级导航。


::: Demo
```vue demo
<template>
    <ht-tab v-model:modelValue="modelValue" :data="tabData" />
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup(){
        const modelValue = ref(['2', '2-1']);
        const tabData = reactive({
            list: [{
                label: 'tab1', 
                value: 1,
                icon: 'u-icon-edit',
                children: [{
                    label: 'tab1-1', 
                    value: '1-1',
                },{
                    label: 'tab1-2',
                    value: '1-2',
                }]
            },{
                label: 'tab2', 
                value: 2,
                icon: 'u-icon-edit',
                children: [{
                    label: 'tab2-1',
                    value: '2-1',
                },{
                    label: 'tab2-2',
                    value: '2-2',
                },{
                    label: 'tab2-3',
                    value: '2-3',
                }]
            },{
                label: 'tab3', 
                value: 3,
                icon: 'u-icon-edit',
            },{
                label: 'tab4', 
                value: 4,
                icon: 'u-icon-edit',
            }],
        })
        return {
            modelValue,
            tabData,
        }
    }
}
</script>
```
:::



### 多层级垂直导航


::: Demo
```vue demo
<template>
    <ht-tab style="width:250px;background:rgb(25, 26, 35)" v-model:modelValue="modelValue" :data="tabData" />
</template>

<script>
import { ref, reactive } from 'vue'
export default {
    setup(){
        const modelValue = ref([2, '2-1']);
        const tabData = reactive({
            direction: 'column',
            list: [{
                label: 'tab1', 
                value: 1,
                icon: 'u-icon-edit',
                children: [{
                    label: 'tab1-1', 
                    value: '1-1',
                },{
                    label: 'tab1-2',
                    value: '1-2',
                }]
            },{
                label: 'tab2', 
                value: 2,
                icon: 'u-icon-edit',
                children: [{
                    label: 'tab2-1',
                    value: '2-1',
                },{
                    label: 'tab2-2',
                    value: '2-2',
                },{
                    label: 'tab2-3',
                    value: '2-3',
                }]
            },{
                label: 'tab3', 
                value: 3,
                icon: 'u-icon-edit',
            },{
                label: 'tab4', 
                value: 4,
                icon: 'u-icon-edit',
            }],
            style: "color: #ffffffb3",
            activeStyle: "color: #fff;background: rgb(45, 140, 240);border-radius: 0;",
        })
        return {
            modelValue,
            tabData,
        }
    }
}
</script>
```
:::