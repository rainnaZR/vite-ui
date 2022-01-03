<template>
  <!-- 图片 -->
  <div class="ht-image" @click="onClick">
    <div
      v-if="fill"
      :style="`width:${width};height:${height};background:url(${src}) no-repeat center;background-size:${fill};`"
    ></div>
    <img
      v-else
      :src="src"
      :width="width"
      :height="height"
      :alt="alt"
      :style="cssStyle"
      @load="onLoad"
      @error="onError"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HtImage",
  props: {
    // 填充方式
    fill: {
      type: String,
      default: "",
      validator: (value: string) => ["cover", "contain"].includes(value),
    },
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
    // 错误显示alt
    alt: {
      type: String,
      default: "",
    },
    // 图片样式
    cssStyle: {
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
