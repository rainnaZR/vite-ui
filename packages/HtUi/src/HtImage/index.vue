<template>
  <div class="ht-image" @click="onClick">
    <img
      :src="data.src"
      :width="data.width"
      :height="data.height"
      :alt="data.alt"
      :style="[`object-fit: ${data.fill || 'cover'};`, data.cssStyle]"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ImageData } from "./types";

// 图片显示与预览。
export default defineComponent({
  name: "HtImage",

  props: {
    data: {
      type: Object as PropType<ImageData>,
      required: true,
      default: () => ({
        src: "",
      }),
    },
  },

  setup(props, { emit }) {
    /**
     * 图片点击方法
     * @param {Object} event MouseEvent对象
     * @returns void
     * */
    const onClick = (e: MouseEvent) => {
      /**
       * 图片点击事件触发
       * @param {Object} data 图片组件data对象
       * @param {Object} event MouseEvent对象
       * @returns void
       * */
      emit("on-click", props.data, e);
    };

    /**
     * 图片加载成功方法
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onLoad = (e: Event) => {
      /**
       * 图片加载完成事件触发
       * @param {Object} data 图片组件data对象
       * @param {Object} event MouseEvent对象
       * @returns void
       */
      emit("on-load", props.data, e);
    };

    /**
     * 图片加载失败方法
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onError = (e: Event) => {
      /**
       * 图片加载失败事件触发
       * @param {Object} data 图片组件data对象
       * @param {Object} event MouseEvent对象
       * @returns void
       */
      emit("on-error", props.data, e);
    };

    return {
      onClick,
      onLoad,
      onError,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
