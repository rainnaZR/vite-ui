<template>
  <!-- 图片 -->
  <div class="ht-image" @click="onClick">
    <div
      v-if="data.fill"
      :style="`width:${data.width};height:${data.height};background:url(${data.src}) no-repeat center;background-size:${data.fill};`"
    ></div>
    <img
      v-else
      :src="data.src"
      :width="data.width"
      :height="data.height"
      :alt="data.alt"
      :style="data.cssStyle"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ImageData } from "./types";

export default defineComponent({
  name: "HtImage",

  props: {
    data: {
      type: Object as PropType<ImageData>,
      default: () => ({
        src: "",
      }),
    },
  },

  setup(props, { emit }) {
    // 点击按钮
    const onClick = (e: MouseEvent) => {
      emit("on-click", e);
    };
    // 加载完成
    const onLoad = (e: Event) => {
      emit("on-load", e);
    };
    // 加载失败
    const onError = (e: Event) => {
      emit("on-error", e);
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
