# HtTab 导航

## 代码演示

### 导航类型

- tab导航支持两种显示方式，垂直方式`column` 和 水平方式`row`，默认为水平方式 `row`。

::: Demo
```vue demo
<template>
    <ht-tab v-model:currentValue="data.currentValue" :data="data" @on-change="onClickTab"/>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
        const data = reactive({
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
            currentValue: 2, 
            color: '#666', 
            activeColor: '#f00'
        })
        return {
            data,
            onClickTab: (tab, index) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'`)
        }
    }
}
</script>
```
:::


- tab导航显示方式为 `column`。


::: Demo
```vue demo
<template>
    <ht-tab style="width: 100px" v-model:currentValue="data.currentValue" :data="data" @on-change="onClickTab" />
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
        const data = reactive({
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
            currentValue: 2, 
            color: '#666', 
            activeColor: '#f00'
        })
        return {
            data,
            onClickTab: (tab, index) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'`)
        }
    }
}
</script>
```
:::