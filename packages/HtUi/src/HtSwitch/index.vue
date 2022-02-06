<template>
  <div
    :class="[
      'ht-switch',
      { 'ht-switch-active': !!data.modelValue },
      { 'ht-switch-disabled': data.disabled },
      'f-curp',
    ]"
    :style="onGetStyle()"
    @click="onChange"
  >
    <span class="circle"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { SwitchData } from "./types";

// 表单中的开关切换组件。
export default defineComponent({
  name: "HtSwitch",

  props: {
    data: {
      type: Object as PropType<SwitchData>,
      required: false,
      default: () => ({
        modelValue: false,
      }),
    },
  },

  setup(props, { emit }) {
    /**
     * 获取开关按钮样式
     * @returns {Object} style 开关样式对象
     */
    const onGetStyle = () => {
      return {
        ...(props.data.style || {}),
        backgroundColor: props.data.modelValue
          ? props.data.activeColor || "#13ce66"
          : props.data.inActiveColor || "#dcdfe6",
      };
    };

    /**
     * 开关切换操作
     * @returns void
     */
    const onChange = () => {
      if (props.data.disabled) return;

      /**
       * 开关切换值更新
       * @param {Boolean} value 开关切换值
       */
      emit("update:modelValue", !props.data.modelValue);

      /**
       * 开关切换事件触发
       * @param {Boolean} value 开关切换值
       */
      emit("on-change", !props.data.modelValue);
    };

    return {
      onGetStyle,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
