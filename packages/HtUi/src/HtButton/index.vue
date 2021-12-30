<template>
  <!-- 按钮 -->
  <button
    :class="[
      'ht-button',
      `ht-button-${type}`,
      `ht-button-${size}`,
      {
        'ht-button-disabled': disabled,
      },
    ]"
    :type="nativeType"
    :style="buttonStyle"
    :disabled="disabled"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HtButton",
  props: {
    // 按钮类型
    type: {
      type: String,
      validator: (value: string) =>
        [
          "default",
          "primary",
          "success",
          "info",
          "warning",
          "danger",
          "text",
        ].includes(value),
      default: "default",
    },
    // 按钮尺寸
    size: {
      type: String,
      validator: (value: string) =>
        ["mini", "small", "normal", "big", "huge"].includes(value),
      default: "normal",
    },
    nativeType: {
      type: String,
      validator: (value: string) =>
        ["button", "reset", "submit"].includes(value),
      default: "button",
    },
    // 禁用状态
    disabled: {
      type: Boolean,
    },
    // 按钮样式
    buttonStyle: {
      type: String,
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
