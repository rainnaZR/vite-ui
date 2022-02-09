<template>
  <div class="ht-radio f-unselect">
    <div
      v-for="(item, index) in data.options"
      :key="index"
      :class="[
        'item',
        {
          'item-disabled': data.disabled || item.disabled,
        },
        'f-curp',
      ]"
      :style="onGetStyle()"
      @click="onClick(item, index)"
    >
      <ht-icon
        :data="{
          name: onGetIcon(item, 'name'),
          style: onGetIcon(item, 'style'),
        }"
      />
      <div class="label">
        <!-- 默认内容插槽 -->
        <slot :scope="item" :index="index">{{ item.label }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";
import HtIcon from "../HtIcon";
import { RadioItem, RadioData } from "./types";

// 表单中的单选框组件。
export default defineComponent({
  name: "HtRadio",

  components: {
    HtIcon,
  },

  props: {
    // 选择框组选中值
    modelValue: {
      type: [String, Number, Array],
      required: true,
      default: "",
    },
    // 配置数据
    data: {
      type: Object as PropType<RadioData>,
      required: true,
      default: () => ({
        options: [],
      }),
    },
  },

  setup(props, { emit }) {
    const state = reactive({
      checkedValue: Array.isArray(props.modelValue)
        ? props.modelValue
        : [props.modelValue], // 当前选中值
    });
    const defaultIcons = props.data.multiple
      ? ["u-icon-checkbox", "u-icon-checkboxCheck"]
      : ["u-icon-radio", "u-icon-radioCheck"]; // icon图标默认配置项

    /**
     * 获取选择框样式
     * @returns {Object} style 选择框样式
     */
    const onGetStyle = () => {
      const { column } = props.data;
      if (!column) return {};

      return {
        width: `${(100 / ~~column).toFixed(2)}%`,
      };
    };

    /**
     * 获取选择框的icon配置项
     * @param {Object} item 当前点击的选择框数据
     * @param {String} type icon配置类型
     * @returns {String/Object} name/style 选择框icon图标名/选择框icon样式
     */
    const onGetIcon = (item: RadioItem, type: string) => {
      const isChecked = state.checkedValue.includes(item.value);
      if (type === "name") {
        return isChecked
          ? props.data.checkedIcon || defaultIcons[1]
          : props.data.icon || defaultIcons[0];
      }
      return isChecked ? props.data.checkedIconStyle : props.data.iconStyle;
    };

    /**
     * 选择框点击事件
     * @param {Object} item 当前点击的选择框数据
     * @param {Number} index 当前点击的选择框索引
     * @returns void
     */
    const onClick = (item: RadioItem, index: number) => {
      if (props.data.disabled || item.disabled) return;

      const isChecked = state.checkedValue.includes(item.value);
      if (props.data.multiple) {
        // 如果是多选
        // 当前项已包含在选中项，则反选
        if (isChecked) {
          state.checkedValue.splice(state.checkedValue.indexOf(item.value), 1);
        } else {
          state.checkedValue.push(item.value);
        }
      } else {
        // 如果是单选
        // 当前项已包含在选中项
        if (isChecked) return;
        state.checkedValue = [];
        state.checkedValue.push(item.value);
      }
      state.checkedValue = state.checkedValue.filter(
        (i) => i !== undefined && i !== ""
      );

      const value = props.data.multiple
        ? state.checkedValue
        : state.checkedValue[0];
      /**
       * 选择框选中值更新
       * @param {Any} value 选择框组选中值，单选框为选中值/多选框为选中值的数组
       */
      emit("update:modelValue", value);
      /**
       * 选择框选中值更新事件触发
       * @param {Any} value 选择框组选中值，单选框为选中值/多选框为选中值的数组
       * @param {Object} item 当前点击的选择框数据
       * @param {Number} index 当前点击的选择框索引
       */
      emit("on-change", value, item, index);
    };

    watch(
      () => props.modelValue,
      (value) => {
        state.checkedValue = Array.isArray(value) ? value : [value];
      }
    );

    return {
      state,
      onGetStyle,
      onGetIcon,
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
