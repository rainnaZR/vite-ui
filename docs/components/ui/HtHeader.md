# HtHeader 通用顶部

### `Category: base`

## 代码演示

### 基础用法

::: Demo
```vue demo
<template>
    <ht-header :data="headerData" @on-click:logo="onClickLogo" @on-click:tab="onClickTab">
        <template #right>
            <div class="f-fs12 s-fc6">联系我们: 400-500-888</div>
        </template>
    </ht-header>
</template>

<script>
import { reactive } from 'vue'
export default {
    setup(){
        const headerData = reactive({
            logoUrl: "../logo.png",
            logoWidth: 40,
            logoHeight: 40,
            logoAlt: "前端资源管理平台",
            logoText: "前端资源管理平台",
            tabList: [
                {
                    label: "优惠券",
                    value: 1,
                    path: "/doc/introduce",
                },
                {
                    label: "PLUS会员",
                    value: 2,
                    path: "/doc/button",
                }, 
                {
                    label: "品牌闪购",
                    value: 3,
                    path: "/doc/introduce",
                },
                {
                    label: "拍卖",
                    value: 4,
                    path: "/doc/button",
                },
            ],
            tabCurrentValue: 3,
            tabStyle: "color: #666",
            tabActiveStyle: "color: rgb(255, 102, 0);background: rgba(255, 102, 0, 0.12);",
        });

        return {
            headerData,
            onClickLogo: () => alert('logo点击'),
            onClickTab: (tab, index) => alert(`第${index+1}个导航点击，导航label值 '${tab.label}'`)
        }
    }
}
</script>
```