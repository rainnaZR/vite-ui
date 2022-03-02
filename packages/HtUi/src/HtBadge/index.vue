<template>
  <div class="ht-badge" :style="data.style">
    <!-- 默认内容插槽 -->
    <slot>{{ data.text }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BadgeData } from "./types";

/**
 * 徽章小图标。
 * */
export default defineComponent({
  name: "HtBadge",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<BadgeData>,
      required: false,
      default: () => {},
    },
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
