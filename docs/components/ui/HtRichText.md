# HtRichText 富文本

##### `Category: form`

## 代码演示

### 基本用法

- 富文本组件使用第三方包[wangeditor](https://www.npmjs.com/package/wangeditor)，二次封装后实现。
- 组件可通过 `v-model:modelValue` 来实现富文本选择器html内容值的双向绑定。
- 组件可通过 `data` 属性定义组件的配置项。


:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" />
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    const value = ref();
    return { value };
  },
};
</script>
```
:::


### 模式

- 组件配置编辑器的显示模式属性为`data.mode`，值为`字符串`，可选值有`default`，`simple`，默认值为`default`。
- 当组件模式为`simple`时，显示如下：



:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" :data="richTextData" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const value = ref();
    const richTextData = reactive({
      mode: "simple",
    });
    return { value, richTextData };
  },
};
</script>
```
:::


### 工具栏样式

- 组件自定义工具栏样式属性`data.toolbarStyle`，值为`字符串`或`样式对象`。



:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" :data="richTextData" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const value = ref();
    const richTextData = reactive({
      toolbarStyle: "border-bottom: 1px solid #f60",
    });
    return { value, richTextData };
  },
};
</script>
```
:::



### 编辑框样式

- 组件自定义编辑框样式属性`data.editorStyle`，值为`样式对象`。可通过样式设置编辑框高度。


:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" :data="richTextData" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const value = ref();
    const richTextData = reactive({
      editorStyle: "height: 300px;",
    });
    return { value, richTextData };
  },
};
</script>
```
:::


### 工具栏设置

- 组件设置工具栏属性`data.toolbarConfig`，值为`对象`。配置文档参考：[https://www.wangeditor.com/v5/toolbar-config.html](https://www.wangeditor.com/v5/toolbar-config.html)


:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" :data="richTextData" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const value = ref();
    const richTextData = reactive({
      toolbarConfig: {
        toolbarKeys: [
          "headerSelect", // 菜单 key
          "|", // 分割线
          "bold", // 菜单 key
          "italic",
          {
            key: "group-more-style", // 必填，要以 group 开头
            title: "更多样式", // 必填
            iconSvg: "<svg>....</svg>", // 可选
            menuKeys: ["through", "code", "clearStyle"], // 下级菜单 key ，必填
          },
        ],
      },
    });
    return { value, richTextData };
  },
};
</script>
```
:::


### 编辑框设置

- 组件设置编辑框属性`data.editorConfig`，值为`对象`。配置文档参考：[https://www.wangeditor.com/v5/editor-config.html](https://www.wangeditor.com/v5/editor-config.html)


:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" :data="richTextData" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const value = ref();
    const richTextData = reactive({
      editorConfig: {
        placeholder: "请输入商品介绍内容...",
        maxLength: 10,
      },
    });
    return { value, richTextData };
  },
};
</script>
```
:::


### 上传

- 组件设置文件上传属性`data.uploadConfig`，值为`对象`。配置属性参考[HtUpload上传组件配置](#/doc/HtUpload)。


:::Demo
```vue demo
<template>
  <ht-rich-text v-model:modelValue="value" :data="richTextData" />
</template>

<script lang="ts">
import { ref, reactive } from "vue";
export default {
  setup() {
    const value = ref();
    const richTextData = reactive({
      uploadConfig: {
        action: "https://xxxx",
        imgDomain: "https://xxxx",
      },
    });
    return { value, richTextData };
  },
};
</script>
```
:::