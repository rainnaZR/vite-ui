# HtTab 导航

## 代码演示

- tab导航支持两种显示方式，垂直方式`column` 和 水平方式`row`，默认为水平方式 `row`。

### 水平导航

::: Demo
```vue demo
<template>
    <ht-tab v-model:currentValue="tabData.currentValue" :data="tabData" @on-change="onClickTab"/>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
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
            currentValue: [2],
        })
        return {
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
    <ht-tab style="width: 100px" v-model:currentValue="tabData.currentValue" :data="tabData" @on-change="onClickTab" />
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
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
            currentValue: [1], 
            color: '#666', 
            activeColor: '#f00'
        })
        return {
            tabData,
            onClickTab: (tab, index, depth) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'，导航深度为${depth}`)
        }
    }
}
</script>
```
:::

### 自定义样式水平导航

- 可自定义 tab 的 `color`, `activeColor`, `activeBgColor` 属性控制样式。

::: Demo
```vue demo
<template>
    <ht-tab v-model:currentValue="tabData.currentValue" :data="tabData" @on-change="onClickTab"/>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
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
            currentValue: [2],
            activeColor: '#fff',
            activeBgColor: 'rgb(45, 140, 240)',
        })
        return {
            tabData,
            onClickTab: (tab, index, depth) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'，导航深度为${depth}`)
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
    <ht-tab style="width:200px" v-model:currentValue="tabData.currentValue" :data="tabData" @on-change="onClickTab"/>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
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
            currentValue: [2],
            activeColor: '#fff',
            activeBgColor: 'rgb(45, 140, 240)',
        })
        return {
            tabData,
            onClickTab: (tab, index, depth) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'，导航深度为${depth}`)
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
    <ht-tab v-model:currentValue="tabData.currentValue" :data="tabData" @on-change="onClickTab"/>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
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
            currentValue: ['2', '2-1'],
        })
        return {
            tabData,
            onClickTab: (tab, index, depth) => console.log(`第${index+1}个导航点击，导航label值 '${tab.label}'，导航深度为${depth}`)
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
    <ht-tab style="width:250px;background:rgb(25, 26, 35)" v-model:currentValue="tabData.currentValue" :data="tabData" @on-change="onClickTab"/>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
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
            currentValue: ['2', '2-1'],
            color: '#ffffffb3',
            activeColor: '#fff',
            activeBgColor: 'rgb(45, 140, 240)',
        })
        return {
            tabData,
            onClickTab: (tab, index, depth) => console.log(`第${index+1}个导航点击，导航label值 '${tab.label}'，导航深度为${depth}`)
        }
    }
}
</script>
```
:::