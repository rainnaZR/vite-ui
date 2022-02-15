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
      'f-mb25',
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
import { FormItemData, RuleItem, FormItemContext } from "./types";
import { formKey, FormContext } from "../HtForm/types";

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
    const form: FormContext | undefined = inject(formKey);
    const formItemRef = ref<HTMLDivElement>();
    const onGetRules = () => {
      const { prop, required: ruleRequired, rules = [] } = props.data;
      const formRules = form && form.data?.rules;
      const targetFormRules = prop && formRules ? formRules[prop] || [] : [];
      const requiredRule =
        ruleRequired !== undefined ? { required: !!ruleRequired } : {};

      return [...targetFormRules, ...rules, requiredRule];
    };
    const required = computed(() => {
      const rules: RuleItem[] = onGetRules();
      return rules.some((i) => i.required);
    });
    const validateMessage = ref(props.data.error);

    /**
     * 表单项数据验证
     * @returns {Promise} result 表单项验证结果
     */
    const onValidate = () => {
      return new Promise((resolve) => {
        const model = form && form.data.model;
        const { prop, label, showValidMessage = true } = props.data;
        const rules: RuleItem[] = onGetRules();
        const result = {
          valid: true,
          message: "",
          prop,
          model,
        };
        const value = prop && model && model[prop];

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
                ? !!String(value || "").trim()
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
     * @returns void
     */
    const onReset = () => {
      const model = form && form.data.model;
      const { prop } = props.data;
      if (model && prop) {
        model[prop] = "";
      }
      nextTick(() => onClearValidate());
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
      if (props.data.prop) form?.onAddField(formItem);
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
