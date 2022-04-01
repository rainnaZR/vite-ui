<template>
  <div class="ht-loading f-flexc f-trans" :style="data.style">
    <div class="wrap f-tac">
      <!-- loading动画插槽 -->
      <slot name="media">
        <!-- 自定义图片数据 -->
        <ht-image v-if="data.media" :data="data.media" />
        <!-- 类型1 -->
        <div v-else-if="data.type == 1" class="media1">
          <div class="line">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="circle"></div>
        </div>
        <!-- 类型2 -->
        <div v-else-if="data.type == 2" class="media2">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <!-- 类型3 -->
        <div v-else-if="data.type == 3" class="media3">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <!-- 类型4 -->
        <div v-else-if="data.type == 4" class="media4">
          <div class="item"></div>
        </div>
        <!-- 默认样式 -->
        <svg v-else viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </slot>
      <div v-if="data.content || $slots.content" class="content f-mt15">
        <!-- loading内容插槽 -->
        <slot name="content">
          <div v-html="data.content"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LoadingData } from "./types";

// 加载组件，数据加载时的过渡效果，包括加载动画和加载内容。
export default defineComponent({
  name: "HtLoading",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<LoadingData>,
      required: true,
      default: () => ({}),
    },
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
