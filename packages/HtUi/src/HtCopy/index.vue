<template>
  <div :class="['ht-copy', `ht-copy-${data.buttonPosition}`]">
    <div class="button f-curp" @click="onCopy">
      <!-- 复制的按钮插槽 -->
      <slot name="button">
        <ht-button :data="{ size: 'small' }">复制</ht-button>
      </slot>
    </div>

    <div class="content" ref="contentRef">
      <!-- 复制的内容插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { dom } from "@htfed/utils";
import HtButton from "../HtButton";
import HtToast from "../HtToast";
import { CopyData } from "./types";

/**
 * 复制组件：包括复制的按钮和需要复制的内容两部分。
 * */
export default defineComponent({
  name: "HtCopy",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<CopyData>,
      required: false,
      default: () => ({
        buttonPosition: "top",
      }),
    },
  },

  components: {
    HtButton,
  },

  setup(props, { emit }) {
    const contentRef = ref<HTMLDivElement>();

    /**
     * 复制方法
     * @returns void
     */
    const onCopy = () => {
      const value = contentRef.value!?.textContent;
      dom.onCopy(value).then(
        (res?: string) => {
          HtToast.success(res);
          /**
           * 复制成功触发事件
           * @param {String} value 要复制的内容
           * @returns void
           */
          emit("on-success", value);
        },
        (err?: string) => {
          HtToast.error(err);
          /**
           * 复制失败触发事件
           * @param {String} value 要复制的内容
           * @returns void
           */
          emit("on-failure", value);
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
