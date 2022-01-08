<template>
  <!-- 按钮 -->
  <button
    :class="[
      'ht-button',
      `ht-button-${data.type || 'default'}`,
      `ht-button-${data.size || 'normal'}`,
      {
        'ht-button-full': data.full,
      },
      {
        'ht-button-disabled': data.disabled,
      },
    ]"
    :type="data.nativeType || 'button'"
    :style="data.buttonStyle"
    :disabled="data.disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ButtonData } from "./types";

export default defineComponent({
  name: "HtButton",

  props: {
    data: {
      type: Object as PropType<ButtonData>,
      default: () => ({
        type: "default",
        size: "normal",
      }),
    },
  },

  setup(props, { emit }) {
    const onClick = (e: MouseEvent) => {
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
