<template>
  <!-- Md文档中Demo展示, 基于vite-plugin-vuedoc修改 -->
  <div class="ht-md-demo">
    <!-- 操作栏入口 -->
    <slot name="entry">
      <div class="entry">
        <ht-button class="f-mr5" @click="onViewSource" :data="{ size: 'small' }"
          >查看源码</ht-button
        >
        <ht-button @click="onCopy" :data="{ size: 'small' }"
          >复制源码</ht-button
        >
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dom } from "@htfed/utils";
import HtButton from "../HtButton";

export default defineComponent({
  name: "HtMdDemo",

  components: {
    HtButton,
  },

  setup() {
    // 查看源码
    const onViewSource = (e: any) => {
      const node = e.target.parentNode?.parentNode;
      const elem = node?.querySelector(".vuedoc-demo__footer");
      elem && elem.click();
    };

    // 复制源码
    const onCopy = (e: any) => {
      const node = e.target.parentNode?.parentNode;
      const elem = node.querySelector(".vuedoc__code");
      const value = elem?.textContent!?.slice(0, -1);
      dom.onCopy(value).then(
        (res?: string) => alert(res),
        (err?: string) => alert(err)
      );
    };

    return {
      onViewSource,
      onCopy,
    };
  },
});
</script>

<style lang="less">
@import "./index.less";
</style>
