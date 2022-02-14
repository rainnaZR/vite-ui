<template>
  <div
    ref="formItemRef"
    :class="`ht-form-item ht-form-item-${
      data.labelPosition ||
      (form && form.data && form.data.labelPosition) ||
      'right'
    } f-mb25`"
  >
    <div
      class="form-label"
      :style="{
        ...((form && form.data && form.data.labelStyle) || {}),
        ...(data.labelStyle || {}),
        width: data.labelWidth || (form && form.data && form.data.labelWidth),
      }"
    >
      <!-- 必填图标 -->
      <span v-if="required" class="s-fc2 f-mr5">*</span>
      <!-- 表单label插槽 -->
      <slot name="label">{{ data.label }}</slot>
    </div>
    <div class="form-content">
      <!-- 表单默认内容插槽 -->
      <slot></slot>
      <!-- 表单验证错误信息 -->
      <div v-if="validateMessage" class="message s-fc2 f-fs12">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject, ref, toRefs, reactive, nextTick, watch } from "vue";
import { FormItemData } from "./types";
import { formKey } from "../HtForm/types";

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

  setup(props) {
    const form = inject(formKey);
    const formItemRef = ref<HTMLDivElement>();
    const required = ref(false);
    required.value =
      props.data.required || props.data.rules?.some((i) => i.required) || false;
    const validateMessage = ref(props.data.error);

    /**
     * 表单项数据验证
     * @param {Object} model 表单值
     * @returns {Promise} result 表单项验证结果
     */
    const onValidate = (model?: any) => {
      return new Promise((resolve) => {
        const { prop, label, rules, showValidMessage = true } = props.data;
        const result = {
          valid: true,
          message: "",
          prop,
          model,
        };
        const value = prop && model[prop];

        // 如果该属性有校验规则
        if (rules && rules.length) {
          for (let i = 0, l = rules.length; i < l; i++) {
            const {
              validator,
              pattern,
              required: ruleRequired,
              message = "",
            } = rules[i];
            const valid =
              !!validator && typeof validator === "function"
                ? validator(value)
                : pattern
                ? pattern.test(value)
                : ruleRequired
                ? value && !!String(value).trim()
                : true;
            // 如果校验没通过，结束此次循环
            if (!valid) {
              result.valid = valid; // 验证规则
              result.message =
                message ||
                (ruleRequired ? `${label}不能为空！` : `${label}校验失败！`); // 错误提示信息
              break;
            }
          }
        }
        // 展示错误信息
        validateMessage.value =
          !result.valid && showValidMessage ? result.message : "";
        resolve(result);
      });
    };

    /**
     * 表单项清除验证信息
     * @returns void
     */
    const onClearValidate = () => {
      validateMessage.value = "";
    };

    /**
     * 表单项数据重置
     * @param {Object} model 表单值
     * @returns void
     */
    const onReset = (model?: any) => {
      const { prop } = props.data;
      if (model && prop) {
        model[prop] = "";
      }
      nextTick(() => onClearValidate());
    };

    const formItem = reactive({
      ...toRefs(props),
      $el: formItemRef,
      validateMessage,
      onValidate,
      onClearValidate,
      onReset,
    });

    watch(
      () => props.data.error,
      (val) => {
        validateMessage.value = val;
      },
      {
        immediate: true,
      }
    );

    return {
      form,
      formItemRef,
      required,
      validateMessage,
      onValidate,
      onClearValidate,
      onReset,
      formItem,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
