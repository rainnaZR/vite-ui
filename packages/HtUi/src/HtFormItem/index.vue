<template>
  <div
    ref="formItemRef"
    :class="[
      'ht-form-item',
      `ht-form-item-${
        data.labelPosition ||
        (form && form.data && form.data.labelPosition) ||
        'right'
      }`,
      {
        'ht-form-item-error': validateMessage,
      },
      'f-mb20',
    ]"
  >
    <div
      class="form-label"
      :style="{
        ...((form && form.data && form.data.labelStyle) || {}),
        ...(data.labelStyle || {}),
        width: data.labelWidth || (form && form.data && form.data.labelWidth),
      }"
    >
      <div v-if="data.label">
        <!-- 必填图标 -->
        <span v-if="required" class="s-fc2 f-mr5">*</span>
        <!-- 表单label插槽 -->
        <slot name="label">{{ data.label }}</slot>
      </div>
    </div>
    <div
      class="form-content"
      :style="{
        ...((form && form.data && form.data.contentStyle) || {}),
        ...(data.contentStyle || {}),
      }"
    >
      <!-- 表单内容插槽 -->
      <slot></slot>
      <!-- 表单验证错误信息 -->
      <div v-if="validateMessage" class="message s-fc2 f-fs12">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  inject,
  ref,
  computed,
  nextTick,
  reactive,
  toRefs,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { tools } from "@htfed/utils";
import { FormItemData, RuleItem, MessageItem, FormItemContext } from "./types";
import { FormContext, formKey, Model } from "../HtForm/types";

// 表单项组件。
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

  setup(props, { emit }) {
    const form: FormContext | undefined = inject(formKey);
    const formItemRef = ref<HTMLDivElement>();

    /**
     * 获取表单项验证规则
     * @returns {Array} rules 表单项验证规则
     */
    const onGetRules = () => {
      const { prop = "", required: ruleRequired, rules = [] } = props.data;
      const formRules = form?.data?.rules;
      const targetFormRules = formRules?.[prop] || [];
      if (ruleRequired !== undefined) {
        rules.push({
          required: !!ruleRequired,
        });
      }
      return [...targetFormRules, ...rules];
    };
    const required = computed(() => {
      const rules: RuleItem[] = onGetRules();
      return rules.some((i) => i.required);
    });
    const validateMessage = ref(props.data.error);

    /**
     * 表单项数据验证
     * @param {Object} model 指定数据对象，不传取默认表单数据
     * @returns {Promise} result 表单项验证结果
     */
    const onValidate = (model?: Model) => {
      return new Promise((resolve) => {
        model = model || form?.data.model;
        const { prop = "", label, showValidMessage = true } = props.data;
        const rules: RuleItem[] = onGetRules();
        const result: MessageItem = {
          valid: true,
          message: "",
          prop,
          model,
          rule: {},
        };
        const value = tools.onDoValueByProps({ object: model, prop });

        // 如果该属性有验证规则
        if (rules && rules.length) {
          for (let i = 0, l = rules.length; i < l; i++) {
            const {
              validator,
              pattern,
              required: ruleRequired,
              message = "",
            } = rules[i];
            // 解决正则多次执行结果不一致的问题
            pattern && (pattern.lastIndex = 0);
            const valid =
              !!validator && typeof validator === "function"
                ? validator(value)
                : pattern
                ? pattern.test(value)
                : ruleRequired
                ? !!String(value || "").trim()
                : true;
            // 如果当前规则验证没通过，结束此次循环，后续规则不再验证
            if (!valid) {
              result.valid = valid; // 验证结果
              result.message =
                message ||
                (ruleRequired
                  ? `${label || prop}不能为空！`
                  : `${label || prop}验证失败！`); // 验证信息
              result.rule = rules[i]; // 验证规则
              break;
            }
          }
        }
        // 展示错误信息
        validateMessage.value =
          !result.valid && showValidMessage ? result.message : "";
        resolve(result);

        /**
         * 表单项验证事件触发
         * @param {Object} result 表单项验证结果
         */
        emit("on-validate", result);
      });
    };

    /**
     * 表单项清除验证信息
     * @returns void
     */
    const onClearValidate = () => {
      validateMessage.value = "";

      /**
       * 表单项清除验证信息事件触发
       * @param {Object} data 表单项数据对象
       */
      emit("on-clear-validate", props.data);
    };

    /**
     * 表单项数据重置
     * @param {Object} model 指定数据对象，不传取默认表单数据
     * @returns void
     */
    const onReset = (model?: Model) => {
      model = model || form?.data.model;
      const { prop } = props.data;
      if (model && prop)
        tools.onDoValueByProps({
          object: model,
          prop,
          value: undefined,
          type: "set",
        });
      nextTick(() => {
        onClearValidate();
        /**
         * 表单项重置事件触发
         * @param {Object} data 表单项数据对象
         */
        emit("on-reset", props.data);
      });
    };

    const formItem: FormItemContext = reactive({
      ...toRefs(props),
      $el: formItemRef,
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

    onMounted(() => {
      form?.onAddField(formItem);
    });

    onBeforeUnmount(() => {
      form?.onRemoveField(formItem);
    });

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
