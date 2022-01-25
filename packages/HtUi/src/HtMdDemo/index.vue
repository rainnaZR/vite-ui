<template>
  <!-- Md文档中Demo展示, 基于vite-plugin-vuedoc修改 -->
  <div class="ht-md-demo">
    <!-- 工具栏插槽 -->
    <slot name="entry">
      <div class="entry">
        <ht-button class="f-mr5" @click="onViewSource" :data="{ size: 'small' }"
          >查看源码</ht-button
        >
        <ht-button @click="onCopySource" :data="{ size: 'small' }"
          >复制源码</ht-button
        >
      </div>
    </slot>
    <!-- 正文插槽 -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dom } from "@htfed/utils";
import HtButton from "../HtButton";

// md文件中写入vue源码，支持源码预览和源码执行。
export default defineComponent({
  name: "HtMdDemo",

  components: {
    HtButton,
  },

  setup() {
    /**
     * 查看源码方法
     * @param {Object} event MouseEvent对象
     * @returns void
     * */
    const onViewSource = (e: any) => {
      const node = e.target.parentNode?.parentNode;
      const elem = node?.querySelector(".vuedoc-demo__footer");
      elem && elem.click();
    };

    /**
     * 复制源码方法
     * @param {Object} event MouseEvent对象
     * @returns void
     * */
    const onCopySource = (e: any) => {
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
      onCopySource,
    };
  },
});
</script>

<style lang="less">
@import "./index.less";
</style>
