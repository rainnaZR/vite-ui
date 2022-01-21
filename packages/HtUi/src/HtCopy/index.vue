<template>
  <div class="ht-copy">
    <div @click="onCopy">
      <!-- 复制按钮插槽 -->
      <slot name="entry">
        <ht-button class="entry" :data="{ size: 'small' }">复制</ht-button>
      </slot>
    </div>

    <div ref="contentRef">
      <!-- 复制内容插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { dom } from "@htfed/utils";
import HtButton from "../HtButton";

/**
 * 复制组件，包括复制的按钮和需要复制的内容两部分
 * */
export default defineComponent({
  name: "HtCopy",

  components: {
    HtButton,
  },

  setup(props, { emit }) {
    const contentRef = ref<HTMLDivElement>();
    const onCopy = () => {
      const value = contentRef.value!?.textContent!?.slice(0, -1);
      dom.onCopy(value).then(
        (res?: string) => {
          alert(res);
          // 复制成功触发事件
          emit("on-success", res);
        },
        (err?: string) => {
          alert(err);
          // 复制失败触发事件
          emit("on-failure", err);
        }
      );
    };

    return {
      contentRef,
      onCopy,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
