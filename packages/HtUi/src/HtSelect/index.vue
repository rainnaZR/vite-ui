<template>
  <div class="ht-select">
    <!-- 输入框 -->
    <ht-input
      v-model:modelValue="inputData.modelValue"
      :data="inputData"
      @on-focus="onFocus"
      @on-blur="onBlur"
      @on-input="onInput"
    />
    <!-- 筛选项 -->
    <div :class="`list ${showOptions ? 'list-show' : ''} f-trans`">
      <div
        v-for="(item, index) in data.options"
        :key="index"
        :class="[
          'item',
          { 'item-select': selectValue.includes(item.value) },
          { 'item-disabled': data.disabled || item.disabled },
          'f-txtell',
          'f-curp',
          'f-trans',
        ]"
        :style="
          data.focusBorderColor && selectValue.includes(item.value)
            ? `color: ${data.focusBorderColor}`
            : ''
        "
        @click="onChange(item, index)"
      >
        <slot name="option" scope="item" index="index">{{ item.label }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from "vue";
import HtInput from "../HtInput";
import { SelectData, SelectItem } from "./types";

export default defineComponent({
  name: "HtSelect",

  components: {
    HtInput,
  },

  props: {
    data: {
      type: Object as PropType<SelectData>,
      required: true,
      default: () => ({
        modelValue: "",
        options: [],
      }),
    },
  },
  setup(props, { emit }) {
    let selectValue = Array.isArray(props.data.modelValue)
      ? reactive(props.data.modelValue)
      : reactive([props.data.modelValue]); // 下拉框选中值
    const inputData = reactive({
      modelValue: selectValue
        ?.map(
          (value) =>
            props.data.options?.filter((option) => option.value === value)?.[0]
              ?.label
        )
        ?.join(","),
      placeholder: props.data.placeholder || "请选择...",
      borderColor: props.data.borderColor,
      focusBorderColor: props.data.focusBorderColor,
      inputStyle: props.data.inputStyle,
      clearable: props.data.clearable,
      suffixIcon: "u-icon-arrowDown",
      readonly: !props.data.filterable,
      disabled: props.data.disabled,
    });
    const showOptions = ref(false); // 是否显示下拉选项

    /**
     * 输入框focus事件
     */
    const onFocus = () => {
      showOptions.value = true;
      inputData.suffixIcon = "u-icon-arrowUp";
    };

    /**
     * 输入框blur事件
     */
    const onBlur = () => {
      showOptions.value = false;
      inputData.suffixIcon = "u-icon-arrowDown";
    };

    /**
     * 下拉框选项点击事件
     * @param {Object} item 当前点击的下拉框选项
     * @param {Number} index 当前点击的下拉框索引
     * @returns void
     */
    const onChange = (item: SelectItem, index: number) => {
      if (props.data.disabled || item.disabled) {
        showOptions.value = true;
        return;
      }

      if (props.data.multiple) {
        // 如果是多选
        // 当前项已包含在选中项，则反选
        if (selectValue.includes(item.value)) {
          selectValue.splice(selectValue.indexOf(item.value), 1);
        } else {
          selectValue.push(item.value);
        }
      } else {
        // 如果是单选
        // 当前项已包含在选中项
        if (selectValue.includes(item.value)) {
          showOptions.value = true;
          return;
        }
        selectValue = [];
        selectValue.push(item.value);
      }

      const value = props.data.multiple ? selectValue : selectValue[0];
      /**
       * 下拉框选中值更新
       * @param {Any} value 下拉框选中值，单选为选中值/多选为选中值的数组
       */
      emit("update:modelValue", value);
      /**
       * 下拉框选中值更新事件触发
       * @param {Any} value 下拉框选中值，单选为选中值/多选为选中值的数组
       * @param {Object} item 当前点击的下拉框选项
       * @param {Number} index 当前点击的下拉框索引
       */
      emit("on-change", value, item, index);
    };

    /**
     * 输入框input事件
     * @param {String} value 筛选关键字
     * @returns {Array} result 筛选结果列表
     */
    const onInput = (value: string) => {
      value = value?.trim();
      if (!value) return;
    };

    // watch(
    //   () => props.data.modelValue,
    //   (value) => {
    //     selectValue = Array.isArray(value) ? value : [value];
    //     console.log(11, selectValue)
    //     inputData.modelValue = selectValue
    //       ?.map(
    //         (value) =>
    //           props.data.options?.filter(
    //             (option) => option.value === value
    //           )?.[0]?.label
    //       )
    //       ?.join(",");
    //   }
    // );

    return {
      selectValue,
      inputData,
      showOptions,
      onFocus,
      onBlur,
      onInput,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
