<template>
  <div class="ht-empty f-flexc f-tac" :style="data.style">
    <!-- 空态图片插槽 -->
    <slot name="image">
      <ht-image
        :data="{
          ...(defaultData.image || {}),
          ...(data.image || {}),
        }"
      />
    </slot>

    <div class="content f-mt15">
      <!-- 空态内容插槽 -->
      <slot name="content">
        <div v-html="data.content || defaultData.content"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { EmptyData } from "./types";

// 数据为空时的状态组件。
export default defineComponent({
  name: "HtEmpty",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<EmptyData>,
      required: false,
      default: () => ({}),
    },
  },

  setup() {
    const defaultData = {
      image: {
        width: 240,
        src: "https://test.ding.dahuangf.com/dingV2/assets/qt_null_1.2f103bcf.png",
      },
      content: "暂无数据",
    };
    return { defaultData };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
