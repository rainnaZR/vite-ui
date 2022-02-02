<template>
  <i
    :class="`ht-icon u-icon ${data.name}`"
    :style="data.style"
    @click="onClick"
  >
    <!-- 默认内容插槽 -->
    <slot></slot>
  </i>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IconData } from "./types";

/**
 * 项目中使用到的图标库。
 * */
export default defineComponent({
  name: "HtIcon",

  props: {
    data: {
      type: Object as PropType<IconData>,
      required: true,
      default: () => ({
        name: "",
      }),
    },
  },

  setup(props, { emit }) {
    /**
     * Icon点击事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onClick = (e: MouseEvent) => {
      /**
       * Icon点击事件触发
       * @param {Object} event MouseEvent对象
       */
      emit("on-click", e);
    };

    return {
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
