<template>
  <form class="ht-form" @submit="onSubmit">
    <!-- 表单内容区域插槽 -->
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormData, RuleItem } from "./types";

// 表单组件。
export default defineComponent({
  name: "HtForm",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<FormData>,
      required: true,
      default: () => ({
        model: {},
        rules: [],
      }),
    },
  },

  setup(props, { emit }) {
    /**
     * 表单数据验证
     * @retruns {Promise} result 表单验证结果
     */
    const onValidate = () => {
      return new Promise((resolve) => {
        const { model, rules } = props.data;
        const result = {
          valid: true,
          message: "",
          key: "",
          value: model,
        };
        Object.keys(model).forEach((key: string) => {
          if (!result.valid) {
            resolve(result);
            return;
          }
          const value: any = model[key];
          const keyRules: RuleItem[] = rules[key];
          // 如果该属性有校验规则
          if (keyRules && keyRules.length) {
            for (let i = 0, l = keyRules.length; i < l; i++) {
              const {
                validator,
                pattern,
                required,
                message = "",
              } = keyRules[i];
              const valid =
                !!validator && typeof validator === "function"
                  ? validator(value)
                  : pattern
                  ? pattern.test(value)
                  : required
                  ? !!String(value).trim()
                  : true;
              // 如果校验没通过，结束此次循环
              if (!valid) {
                result.valid = valid; // 验证规则
                result.message = message; // 错误提示信息
                result.key = key; // 错误字段key
                break;
              }
            }
          }
        });
        resolve(result);
      });
    };

    /**
     * 表单提交
     * @param {Object} event MouseEvent对象
     */
    const onSubmit = (e: Event) => {
      e.preventDefault(); // 取消默认行为，防止form提交
      onValidate().then((result) => {
        /**
         * 表单提交事件触发
         * @param {Object} result 表单返回值
         */
        emit("on-submit", result);
      });
    };

    return {
      onValidate,
      onSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
