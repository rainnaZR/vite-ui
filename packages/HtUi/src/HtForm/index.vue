<template>
  <form
    :class="['ht-form', { 'ht-form-inline': data.inline }]"
    :style="data.formStyle"
  >
    <!-- 表单内容插槽 -->
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, provide } from "vue";
import { FormData, formKey, FormContext } from "./types";
import { FormItemContext, MessageItem } from "../HtFormItem/types";

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
        rules: {},
      }),
    },
  },

  setup(props, { emit }) {
    const fields: FormItemContext[] = [];

    /**
     * 表单批量操作
     * @param {String/Array} targetProps 表单操作的属性列表，不传则操作所有属性
     * @param {Function} callback 操作完成后的回调函数
     * @returns void
     */
    const onFormAction = (
      targetProps: string | string[] = [],
      callback: any = () => {}
    ) => {
      if (!props.data.model) {
        console.error("表单model不能为空！");
        return;
      }
      targetProps = Array.isArray(targetProps) ? targetProps : [targetProps];
      const targetFields = !targetProps.length
        ? fields
        : fields.filter((field) =>
            targetProps.includes(field?.data?.prop || "")
          );
      targetFields.forEach((field: FormItemContext) => callback(field));
    };

    /**
     * 表单新增选项
     * @param {Object} field 表单项
     * @returns void
     */
    const onAddField = (field: FormItemContext) => {
      fields.push(field);

      /**
       * 表单新增选项事件触发
       * @param {Object} field 表单项
       */
      emit("on-add", field);
    };

    /**
     * 表单删除选项
     * @param {Object} field 表单项
     * @returns void
     */
    const onRemoveField = (field: FormItemContext) => {
      fields.splice(fields.indexOf(field), 1);

      /**
       * 表单删除选项事件触发
       * @param {Object} field 表单项
       */
      emit("on-remove", field);
    };

    /**
     * 表单重置选项值
     * @param {String/Array} targetProps 表单操作的属性列表，不传则操作所有属性
     * @returns void
     */
    const onReset = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) => field.onReset());

      /**
       * 表单重置选项值事件触发
       */
      emit("on-reset");
    };

    /**
     * 表单验证选项值
     * @param {String/Array} targetProps 表单操作的属性列表，不传则操作所有属性
     * @returns {Promise} result 验证结果
     */
    const onValidate = (targetProps: string | string[] = []) => {
      return new Promise((resolve) => {
        const results: MessageItem[] = [];
        onFormAction(targetProps, (field: FormItemContext) => {
          field.onValidate().then((result) => {
            results.push(result);
            // 最后一个field，表单全部验证完成
            if (results.length === fields.length) {
              // 将验证失败的结果过滤出来
              const invalidFields = results.filter((i) => !i.valid);
              const validResult: any = {
                valid: invalidFields.length === 0,
                invalidFields,
              };
              resolve(validResult);

              /**
               * 表单验证选项值事件触发
               * @param {Object} validResult 验证结果
               */
              emit("on-validate", validResult);
            }
          });
        });
      });
    };

    /**
     * 表单清除验证信息
     * @param {String/Array} targetProps 表单操作的属性列表，不传则操作所有属性
     * @returns void
     */
    const onClearValidate = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) =>
        field.onClearValidate()
      );
    };

    /**
     * 表单滚动到指定prop的元素位置
     * @param {String} prop 表单操作的属性值
     * @returns void
     */
    const onScrollToField = (prop: string) => {
      fields.forEach(
        (field) => field?.data?.prop === prop && field?.$el?.scrollIntoView()
      );
    };

    const form: FormContext = reactive({
      ...toRefs(props),
      onAddField,
      onRemoveField,
      onReset,
      onValidate,
      onClearValidate,
      onScrollToField,
    });

    provide(formKey, form);

    return {
      onAddField,
      onRemoveField,
      onReset,
      onValidate,
      onClearValidate,
      onScrollToField,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
