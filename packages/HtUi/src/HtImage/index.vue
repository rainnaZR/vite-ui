<template>
  <div v-loading="loading" class="ht-image" @click="onClick">
    <img
      :src="data.src || data.placeholderSrc || placeholderSrc"
      :width="data.width"
      :height="data.height"
      :alt="data.alt"
      :style="[`object-fit: ${data.fit || 'cover'};`, data.cssStyle]"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ImageData } from "./types";

// 图片显示与预览。
export default defineComponent({
  name: "HtImage",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<ImageData>,
      required: true,
      default: () => ({
        src: "",
      }),
    },
  },

  setup(props, { emit }) {
    const loading = ref(true);
    const placeholderSrc =
      "https://static.360buyimg.com/item/unite/1.0.150/components/default-soa/askAnswer/i/icon-dog.png";

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
      loading.value = false;
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
      loading.value = false;
      /**
       * 图片加载失败事件触发
       * @param {Object} data 图片组件data对象
       * @param {Object} event MouseEvent对象
       * @returns void
       */
      emit("on-error", props.data, e);
    };

    return {
      loading,
      placeholderSrc,
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
