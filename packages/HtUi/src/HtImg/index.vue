<template>
  <!-- 图片 -->
  <div class="ht-img" @click="onClick">
    <img
      :src="src"
      width="40px"
      height="40px"
      :alt="alt"
      v-if="!fill"
      :style="`width:${width};height:${height};border-radius:${radius};`"
      @load="onLoad"
      @error="onError"
    />
    <span
      :style="`width:${width};height:${height};border-radius:${radius};background:url(${src}) no-repeat center;background-size:${fill};`"
      v-else
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HtImg",
  props: {
    // 图片地址
    src: {
      type: String,
      required: true,
    },
    // 宽度
    width: {
      type: String,
      default: "",
    },
    // 高度
    height: {
      type: String,
      default: "",
    },
    // 填充方式
    fill: {
      type: String,
      default: "",
    },
    // 倒角
    radius: {
      type: String,
      default: "0",
    },
    // 错误显示alt
    alt: {
      type: String,
      default: "",
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
