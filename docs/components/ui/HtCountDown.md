# HtCountDown 倒计时

## 代码演示

### 基本用法

- 倒计时单位支持 `ms` 和 `s` 两种方式。

::: Demo
```vue demo
<template>
    <ht-count-down :data="{time: 90000, unit: 's',}" />
</template>
```

### 插槽

::: Demo
```vue demo
<template>
    <ht-count-down :data="{time: 90, unit: 's',}" @on-stop="onStop">
        <template v-slot="detail">
            距离活动结束还剩：
            {{detail.scope.day}}天
            {{detail.scope.hour}}时
            {{detail.scope.minute}}分
            {{detail.scope.second}}秒
        </template>
    </ht-count-down>
</template>

<script>
export default {
    setup(){
        return {
            onStop: () => alert('倒计时停止')
        }
    }
}
</script>
```