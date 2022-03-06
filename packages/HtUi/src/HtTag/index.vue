<template>
  <div class="ht-tag f-trans f-unselect" :style="data.style" @click="onClick">
    <!-- 前缀图标插槽 -->
    <slot name="prefix">
      <ht-icon v-if="data.icon" class="f-mr5" :data="{ name: data.icon }" />
    </slot>

    <!-- 默认内容插槽 -->
    <slot></slot>

    <!-- 关闭操作 -->
    <ht-icon
      v-if="data.closable"
      class="f-ml5 f-curp"
      :data="{ name: 'u-icon-close', style: 'font-size: 14px' }"
      @on-click.stop="onClose"
    />
    <!-- 后缀插槽 -->
    <slot name="suffix"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TagData } from "./types";

/**
 * 标签组件，标签可删除。
 * */
export default defineComponent({
  name: "HtTag",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<TagData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    /**
     * 标签点击事件
     * @returns void
     */
    const onClick = () => {
      /**
       * 标签点击事件触发
       */
      emit("onClick");
    };

    /**
     * 标签关闭事件
     * @returns void
     */
    const onClose = () => {
      /**
       * 标签关闭事件触发
       */
      emit("on-close");
    };

    return {
      onClick,
      onClose,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
