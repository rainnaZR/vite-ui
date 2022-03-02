<template>
  <div class="ht-popover" :style="data.style">
    <!-- 展示内容插槽 -->
    <slot scope="data">{{ data.text }}</slot>
    <div
      :class="['popContent', `popContent-${data.position || 'left-bottom'}`]"
    >
      <!-- 弹出内容插槽 -->
      <slot name="popover" scope="data"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { PopoverData } from "./types";

/**
 * 气泡弹窗
 * */
export default defineComponent({
  name: "HtPopover",

  props: {
    data: {
      type: Object as PropType<PopoverData>,
      required: false,
      default: () => {},
    },
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
