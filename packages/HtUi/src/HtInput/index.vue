<template>
  <div class="ht-input" :style="`${data.style}`">
    <!-- 输入框左侧图标插槽 -->
    <slot name="prepend"></slot>
    <textarea
      v-if="data.type === 'textarea'"
      class="textarea"
      :style="onGetStyle()"
      v-model="inputVal"
      :placeholder="data.placeholder || '请输入...'"
      :readonly="data.readonly"
      :disabled="data.disabled"
      :maxlength="data.maxLength || -1"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
    >
    </textarea>
    <input
      v-else
      :class="[
        'input',
        `input-${data.type || 'type'}`,
        {
          'input-disabled': data.disabled || data.readonly,
        },
        {
          'input-tips-length': data.maxLength > 0,
        },
        {
          'input-tips-clearable': data.clearable,
        },
      ]"
      :style="onGetStyle()"
      :type="data.type || 'text'"
      v-model="inputVal"
      :placeholder="data.placeholder || '请输入...'"
      :readonly="data.readonly"
      :disabled="data.disabled"
      :maxlength="data.maxLength || -1"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
    />
    <!-- 字数展示 -->
    <span v-if="data.maxLength > 0" class="tips">
      {{ inputVal.length }}/{{ data.maxLength }}
    </span>
    <!-- 清除icon展示 -->
    <span v-if="data.clearable" class="tips f-curp">
      <ht-icon :data="{ name: 'u-icon-clear' }" @click="inputVal = ''" />
    </span>
    <!-- 输入框右侧图标插槽 -->
    <slot name="append"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { InputData } from "./types";
import HtIcon from "../HtIcon";

// 表单中的输入框组件。
export default defineComponent({
  name: "HtInput",

  components: {
    HtIcon,
  },

  props: {
    data: {
      type: Object as PropType<InputData>,
      required: true,
      default: () => ({
        modelValue: "",
        type: "text",
      }),
    },
  },

  setup(props, { emit }) {
    const inputVal = ref<string | number>(""); // 输入框值
    const isFocus = ref(false); // 是否聚焦

    /**
     * 获取输入框样式
     * @returns {Object} style 输入框样式
     */
    const onGetStyle = (): any => {
      return {
        "box-shadow": isFocus.value
          ? `0 0 4px -1px ${
              props.data.focusBorderColor || props.data.borderColor
            }`
          : "",
        borderColor: isFocus.value
          ? props.data.focusBorderColor || props.data.borderColor
          : props.data.borderColor,
        color: props.data.color,
      };
    };

    /**
     * 输入框focus事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onFocus = (e: MouseEvent) => {
      if (props.data.disabled) return;
      isFocus.value = true;
      /**
       * 输入框focus事件触发
       * @param {Object} event MouseEvent对象
       */
      emit("on-focus", e);
    };

    /**
     * 输入框blur事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onBlur = (e: MouseEvent) => {
      if (props.data.disabled) return;
      isFocus.value = false;
      /**
       * 输入框blur事件触发
       * @param {Object} event MouseEvent对象
       */
      emit("on-blur", e);
    };

    /**
     * 输入框change事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onChange = (e: MouseEvent) => {
      if (props.data.disabled) return;
      /**
       * 输入框change事件触发
       * @param {Object} event MouseEvent对象
       */
      emit("on-change", e);
    };

    /**
     * 输入框input事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onInput = (e: MouseEvent) => {
      if (props.data.disabled) return;
      /**
       * 输入框input事件触发
       * @param {Object} event MouseEvent对象
       */
      emit("on-input", e);
    };

    // 监听参数 value 的变化
    watch(
      () => props.data.modelValue,
      (value) => {
        inputVal.value = value; // 设置 value
      },
      {
        immediate: true,
      }
    );

    // 监听输入框的值的变化
    watch(inputVal, (value) => {
      /**
       * 输入框input值更新
       * @param {String} value 输入框input值
       */
      emit("update:modelValue", value);
    });

    return {
      inputVal,
      isFocus,
      onGetStyle,
      onFocus,
      onBlur,
      onChange,
      onInput,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
