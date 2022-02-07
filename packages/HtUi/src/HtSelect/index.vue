<template>
  <div class="ht-select" :tabindex="data.tabIndex || 0" @blur="onBlur">
    <!-- 输入框 -->
    <ht-input
      v-model:modelValue="state.inputData.modelValue"
      :data="state.inputData"
      @on-focus="onFocus"
      @on-blur="onBlur('input')"
      @on-input="onInput"
      @on-action="onAction"
    />
    <!-- 筛选项 -->
    <div
      :class="[
        'list',
        {
          'list-show': state.showOptions,
        },
        'f-trans',
      ]"
    >
      <div
        v-for="(item, index) in state.options"
        :key="index"
        :class="[
          'item',
          { 'item-select': state.selectValue.includes(item.value) },
          { 'item-disabled': data.disabled || item.disabled },
          'f-txtell',
          'f-curp',
          'f-trans',
        ]"
        :style="{
          color:
            data.disabled || item.disabled
              ? '#ccc'
              : state.selectValue.includes(item.value)
              ? data.focusBorderColor || data.borderColor || '#606266'
              : '#606266',
        }"
        @click="onChange(item, index)"
      >
        <slot name="label" :scope="item" :index="index">
          <div class="f-f1">{{ item.label }}</div>
        </slot>
        <slot
          name="status"
          :scoped="item"
          :status="state.selectValue.includes(item.value)"
        >
          <ht-icon
            v-if="state.selectValue.includes(item.value)"
            :data="{ name: 'u-icon-select' }"
          />
        </slot>
      </div>
      <div
        v-if="!state.options || !state.options.length"
        class="item item-empty"
      >
        {{ data.emptyText || "暂无数据" }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";
import HtInput from "../HtInput";
import HtIcon from "../HtIcon";
import { SelectData, SelectItem } from "./types";

export default defineComponent({
  name: "HtSelect",

  components: {
    HtInput,
    HtIcon,
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
    const state = reactive({
      selectValue: Array.isArray(props.data.modelValue)
        ? props.data.modelValue
        : [props.data.modelValue], // 下拉框选中值
      inputData: {
        modelValue: "",
        placeholder: props.data.placeholder || "请选择...",
        borderColor: props.data.borderColor,
        focusBorderColor: props.data.focusBorderColor,
        inputStyle: props.data.inputStyle,
        clearable: props.data.clearable,
        suffixIcon: "u-icon-arrowDown",
        readonly: !props.data.filterable,
        disabled: props.data.disabled,
      },
      showOptions: false, // 是否显示下拉选项
      options: props.data.options, // 下拉选项
    });

    /**
     * 获取输入框value值
     * @returns {String} value 输入框显示的value值
     */
    const onGetInputValue = () => {
      return state.selectValue
        ?.map(
          (value) =>
            props.data.options?.filter((option) => option.value === value)?.[0]
              ?.label
        )
        ?.join(",");
    };
    state.inputData.modelValue = onGetInputValue();

    /**
     * 输入框focus事件
     * @returns void
     */
    const onFocus = () => {
      state.inputData.suffixIcon = "u-icon-arrowUp";
      state.showOptions = true;
      /**
       * 下拉框显示/隐藏时触发事件
       * @param {Boolean} isShow 下拉框是否显示，true为显示，false为隐藏
       */
      emit("on-popup", state.showOptions);
    };

    /**
     * 元素blur事件
     * @param {String} type blur事件触发的元素类型
     * @returns void
     */
    const onBlur = (type?: string) => {
      if (
        (type !== "input" && props.data.multiple) ||
        (type === "input" && !props.data.multiple)
      ) {
        state.inputData.suffixIcon = "u-icon-arrowDown";
        state.showOptions = false;
        /**
         * 下拉框显示/隐藏时触发事件
         * @param {Boolean} isShow 下拉框是否显示，true为显示，false为隐藏
         */
        emit("on-popup", state.showOptions);
      }
    };

    /**
     * 输入框input筛选事件
     * @param {String} value 筛选关键字
     * @returns {Array} result 筛选结果列表
     */
    const onInput = (value: string) => {
      value = value?.trim();
      state.options = props.data.options?.filter(
        (i) => i.label?.toString()?.indexOf(value) > -1
      );
    };

    /**
     * 输入框操作按钮点击事件
     * @param {String} type 操作行为类型
     * @returns void
     */
    const onAction = (type: string) => {
      // 清空icon点击
      if (type === "clearable") {
        state.selectValue = [];
        state.options = props.data.options;
        /**
         * 下拉框选中值更新
         * @param {Any} value 下拉框选中值，单选为选中值/多选为选中值的数组
         */
        emit("update:modelValue", props.data.multiple ? [] : "");
      }
    };

    /**
     * 下拉框选项点击事件
     * @param {Object} item 当前点击的下拉框选项
     * @param {Number} index 当前点击的下拉框索引
     * @returns void
     */
    const onChange = (item: SelectItem, index: number) => {
      if (props.data.disabled || item.disabled) {
        state.showOptions = true;
        return;
      }

      const isSelect = state.selectValue.includes(item.value);
      if (props.data.multiple) {
        // 如果是多选
        // 当前项已包含在选中项，则反选
        if (isSelect) {
          state.selectValue.splice(state.selectValue.indexOf(item.value), 1);
        } else {
          if (
            props.data.maxCount &&
            state.selectValue.length >= ~~props.data.maxCount
          )
            return;
          state.selectValue.push(item.value);
        }
      } else {
        // 如果是单选
        // 当前项已包含在选中项
        if (isSelect) return;
        state.selectValue = [];
        state.selectValue.push(item.value);
      }
      state.inputData.modelValue = onGetInputValue();

      const value = props.data.multiple
        ? state.selectValue
        : state.selectValue[0];
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

    watch(
      () => props.data.modelValue,
      (value) => {
        state.selectValue = Array.isArray(value) ? value : [value];
        state.inputData.modelValue = onGetInputValue();
        state.options = props.data.options;
      }
    );

    return {
      state,
      onFocus,
      onBlur,
      onInput,
      onAction,
      onChange,
    };
  },
});
</script>

<style lang="less">
@import "./index.less";
</style>
