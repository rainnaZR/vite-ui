<template>
  <!-- 详情模式 -->
  <div v-if="data.showType == 'detail'">{{ modelValue ? "是" : "否" }}</div>
  <!-- 编辑模式 -->
  <div
    v-else
    :class="[
      'ht-switch',
      { 'ht-switch-active': !!modelValue },
      { 'ht-switch-disabled': data.disabled || form?.data.disabled },
      'f-curp',
      'f-trans',
    ]"
    :style="onGetStyle()"
    @click="onChange"
  >
    <div
      class="circle f-trans"
      :style="data.circleColor ? `background: ${data.circleColor}` : ''"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject } from "vue";
import { SwitchData } from "./types";
import { FormContext, formKey } from "../HtForm/types";

// 表单中的开关切换组件。
export default defineComponent({
  name: "HtSwitch",

  props: {
    // 开关值，true打开，false关闭
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 配置数据
    data: {
      type: Object as PropType<SwitchData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const form: FormContext | undefined = inject(formKey);
    /**
     * 获取开关按钮样式
     * @returns {Object} style 开关样式对象
     */
    const onGetStyle = () => {
      const { style = {}, activeColor, inActiveColor } = props.data;
      if (activeColor || inActiveColor) {
        style.backgroundColor = props.modelValue ? activeColor : inActiveColor;
      }
      return style;
    };

    /**
     * 开关切换操作
     * @returns void
     */
    const onChange = () => {
      if (props.data.disabled || form?.data.disabled) return;

      const value = !props.modelValue;
      /**
       * 开关切换值更新
       * @param {Boolean} value 开关切换值
       */
      emit("update:modelValue", value);

      /**
       * 开关切换事件触发
       * @param {Boolean} value 开关切换值
       */
      emit("on-change", value);
    };

    return {
      form,
      onGetStyle,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
