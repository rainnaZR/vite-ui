<template>
  <div class="ht-code-input">
    <ht-input
      v-model:modelValue="inputVal"
      :data="{
        type: 'text',
        wrapStyle: data.wrapStyle,
        inputStyle: data.inputStyle,
        placeholder: data.placeholder,
        disabled: data.disabled || form.data.disabled,
        color: data.color,
        borderColor: data.borderColor,
        focusBorderColor: data.focusBorderColor,
        clearable: data.clearable,
      }"
    />
    <div class="f-df f-ml10 f-curp" @click="onGetCode">
      <img
        :width="data.verifyImgWidth || 120"
        :height="data.verifyImgHeight || 40"
        :src="data.verifyImgUrl"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject, ref, watch, onMounted } from "vue";
import HtInput from "../HtInput";
import { CodeInputData } from "./types";
import { FormContext, formKey } from "../HtForm/types";

// 表单中的验证码输入框组件。
export default defineComponent({
  name: "HtCodeInput",

  components: {
    HtInput,
  },

  props: {
    // input输入框中的值
    modelValue: {
      type: [String, Number],
      required: true,
      default: "",
    },
    // 配置数据
    data: {
      type: Object as PropType<CodeInputData>,
      required: true,
      default: () => ({
        type: "text",
      }),
    },
  },

  setup(props, { emit }) {
    const form: FormContext | undefined = inject(formKey);
    const inputVal = ref<string | number>(""); // 输入框值

    /**
     * 获取验证码信息
     * @returns void
     */
    const onGetCode = () => {
      /**
       * 获取验证码信息事件触发
       */
      emit("on-get-code");
    };

    // 监听参数 value 的变化
    watch(
      () => props.modelValue,
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

    onMounted(() => {
      onGetCode();
    });

    return {
      form,
      inputVal,
      onGetCode,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
