<template>
  <form
    :class="['ht-form', { 'ht-form-inline': data.inline }]"
    :style="data.formStyle"
  >
    <!-- 表单内容区域插槽 -->
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, provide } from "vue";
import { FormData, formKey } from "./types";
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
        rules: [],
      }),
    },
  },

  setup(props, { emit }) {
    const fields: FormItemContext[] = [];
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

    const onAddField = (field: FormItemContext) => fields.push(field);

    const onRemoveField = (field: FormItemContext) =>
      fields.splice(fields.indexOf(field), 1);

    const onReset = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) => field.onReset());
    };

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
              resolve({
                valid: invalidFields.length === 0,
                invalidFields,
              });
            }
          });
        });
      });
    };

    const onClearValidate = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) =>
        field.onClearValidate()
      );
    };

    const onScrollToField = (prop: string) => {
      fields.forEach(
        (field) => field?.data?.prop === prop && field?.$el?.scrollIntoView()
      );
    };

    const form = reactive({
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
