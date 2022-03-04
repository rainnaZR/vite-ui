# HtPopover 气泡弹窗

### `Category: base`

## 代码演示

### 基本用法

- 组件可通过 `v-model:modelValue` 来实现弹出窗口的显示和隐藏值，值为`布尔值`。
- 组件可通过 `data` 属性定义组件的配置项。

::: Demo
```vue demo
<template>
  <ht-popover>
    <ht-button>Hover</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::


### 自定义容器样式

- 组件配置容器自定义样式属性`style`，值为`字符串`或`对象`。

::: Demo
```vue demo
<template>
  <ht-popover :data="{ style: 'margin: 50px 100px;' }">
    <ht-button>自定义容器样式</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::



### 自定义弹窗样式

- 组件配置弹出窗箭头自定义样式属性`arrowStyle`，值为`字符串`或`对象`。
- 组件配置弹出窗内容自定义样式属性`contentStyle`，值为`字符串`或`对象`。


::: Demo
```vue demo
<template>
  <ht-popover
    :data="{
      arrowStyle: 'background: #191a23;',
      contentStyle: 'background: #191a23; color: #fff;',
    }"
  >
    <ht-button>自定义弹窗样式</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::


### 自定义显示文本


- 组件配置显示的文本属性`content`，值为`字符串`或`数字`。

::: Demo
```vue demo
<template>
  <ht-popover :data="{ content: '我是自定义文本' }">
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::


### 弹出窗文本


- 组件配置弹出窗的文本属性`popContent`，值为`字符串`或`数字`。

::: Demo
```vue demo
<template>
  <ht-popover :data="{ popContent: '用户' }">
    <ht-icon :data="{ name: 'u-icon-user' }" />
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ content: '我是显示内容', popContent: '我是弹出内容' }" />
</template>
```
:::


### 弹窗位置

- 组件配置弹窗显示位置属性`position`，值为`字符串`。
- 位置可选项有`top-left`，`top-center`，`top-right`，`bottom-left`，`bottom-center`，`bottom-right`，`left-top`，`left-center`，`left-bottom`，`right-top`，`right-center`，`right-bottom`。
- `position`默认值为`bottom-center`。


::: Demo
```vue demo
<template>
  <ht-popover :data="{ position: 'top-left' }">
    <ht-button>top-left</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'top-center' }">
    <ht-button>top-center</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'top-right' }">
    <ht-button>top-right</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />
  
  <ht-popover :data="{ position: 'bottom-left' }">
    <ht-button>bottom-left</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'bottom-center' }">
    <ht-button>bottom-center</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'bottom-right' }">
    <ht-button>bottom-right</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'left-top' }">
    <ht-button>left-top</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'left-center' }">
    <ht-button>left-center</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'left-bottom' }">
    <ht-button>left-bottom</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'right-top' }">
    <ht-button>right-top</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'right-center' }">
    <ht-button>right-center</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ position: 'right-bottom' }">
    <ht-button>Hover right-bottom</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::



### 弹窗偏移


- 组件控制弹出窗偏移量属性`offset`，值为`数字`，默认值为`10`，单位是px。


::: Demo
```vue demo
<template>
  <ht-popover :data="{ offset: 30 }">
    <ht-button>弹窗偏移</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::



### 隐藏箭头

- 组件配置箭头隐藏属性`hideArrow`，值为`布尔值`，默认值为`false`。


::: Demo
```vue demo
<template>
  <ht-popover :data="{ hideArrow: true }">
    <ht-button>隐藏箭头</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::


### 触发方式

- 组件配置触发方式属性`trigger`，值为`字符串`，可选项有`hover`，`click`，默认值为`hover`。


::: Demo
```vue demo
<template>
  <ht-popover :data="{ trigger: 'hover' }">
    <ht-button>触发方式 hover</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
  <br />
  <br />

  <ht-popover :data="{ trigger: 'click' }">
    <ht-button>触发方式 click</ht-button>
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>
```
:::



### 外部触发

- 组件可通过外部操作来控制弹出窗的显示。



::: Demo
```vue demo
<template>
  <ht-button @click="showPopover = !showPopover">外部触发</ht-button>
  <ht-popover v-model:modelValue="showPopover">
    <template #popover>
      和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。和熙的阳光打在身上，秋风轻轻拂过脸颊。我恍惚间睁眼，才发觉已到了大漠。透过车窗，我只见满目黄沙，唯有太阳半挂在天上，给大漠似镀了一层金衣。
    </template>
  </ht-popover>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const showPopover = ref(false);
    return {
      showPopover,
    };
  },
});
</script>
```
:::



### 插槽

- 组件定义插槽控制弹出窗内容展示。


::: Demo
```vue demo
<template>
  <ht-popover
    :data="{
      hideArrow: true,
      width: '150px',
      contentStyle: 'padding: 0',
    }"
  >
    <div class="f-df f-aic f-curp">
      <ht-image
        :data="{
          src: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
          width: 24,
          height: 24,
          fit: 'cover',
          cssStyle: 'border-radius: 24px;',
        }"
      />
      <div class="f-ml10 f-mr5">我是管理员</div>
    </div>
    <template #popover>
      <ht-tab
        :data="{
          direction: 'column',
          list: [
            { label: '修改密码', value: 'changePassword', icon: 'u-icon-password' },
            { label: '切换登录', value: 'switchRole', icon: 'u-icon-user' },
          ],
          style: 'padding: 5px 20px',
          activeStyle: 'padding: 5px 20px; background: #eee;border-radius: 0;',
        }"
        @on-change="onClickTab"
      />
    </template>
  </ht-popover>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const onClickTab = (tab, index) => console.log(`第${index + 1}个导航点击，导航label值 '${tab.label}'`);
    return {
      onClickTab,
    };
  },
});
</script>
```
:::
