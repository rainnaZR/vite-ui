<template>
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
      'f-trans',
    ]"
    :type="data.nativeType || 'button'"
    :style="data.style"
    :disabled="data.disabled"
    @click="onClick"
  >
    <div v-if="data.icon" class="f-dib f-mr5">
      <ht-icon :data="{ name: data.icon, style: data.iconStyle }" />
    </div>
    <!-- 自定义按钮内容 -->
    <slot>{{ data.content }}</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ButtonData } from "./types";

/**
 * 项目中使用的按钮集合。
 * */
export default defineComponent({
  name: "HtButton",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<ButtonData>,
      required: false,
      default: () => ({
        type: "default",
        size: "normal",
      }),
    },
  },

  setup(props, { emit }) {
    /**
     * 按钮点击事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onClick = (e: MouseEvent) => {
      if (!props.data.disabled) {
        /**
         * 按钮事件触发
         * @param {Object} event MouseEvent对象
         */
        emit("on-click", e);
      }
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
