<template>
  <form class="ht-form" @submit="onSubmit">
    <!-- 表单内容区域插槽 -->
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from "vue";
import { FormData } from "./types";
import { FormItemContext } from "../HtFormItem/types";

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
        : fields.filter(
            (field) => field.prop && targetProps.includes(field.prop)
          );
      targetFields.forEach((field: FormItemContext) => callback(field));
    };

    const onAddField = (field: FormItemContext) => fields.push(field);

    const onRemoveField = (field: FormItemContext) =>
      field.prop && fields.splice(fields.indexOf(field), 1);

    const onResetFields = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) => field.onReset());
    };

    const onValidateFields = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) => field.onValidate());
    };

    const onClearValidate = (targetProps: string | string[] = []) => {
      onFormAction(targetProps, (field: FormItemContext) =>
        field.onClearValidate()
      );
    };

    const onScrollToField = (prop: string) => {
      fields.forEach(
        (field) => field.prop === prop && field.$el.scrollIntoView()
      );
    };

    return {
      onAddField,
      onRemoveField,
      onResetFields,
      onValidateFields,
      onClearValidate,
      onScrollToField,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
