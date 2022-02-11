<template>
  <div
    :class="`ht-form-item ht-form-item-${data.labelPosition || 'left'} f-mb20`"
  >
    <div
      class="form-label"
      :style="{
        ...(data.labelStyle || {}),
        width: data.labelWidth,
      }"
    >
      <!-- 表单label插槽 -->
      <slot name="label">{{ data.label }}</slot>
    </div>
    <div class="form-content">
      <!-- 表单默认内容插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormItemData } from "./types";

// 表单列表项组件。
export default defineComponent({
  name: "HtFormItem",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<FormItemData>,
      required: true,
      default: () => ({
        label: "",
      }),
    },
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
