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
    data: {
      type: Object as PropType<RadioData>,
      required: true,
      default: () => ({
        modelValue: "",
        options: [],
      }),
    },
  },

  setup(props, { emit }) {
    let checkedValue = Array.isArray(props.data.modelValue)
      ? reactive(props.data.modelValue)
      : reactive([props.data.modelValue]); // 当前选中值
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
      if (type === "name") {
        return checkedValue.includes(item.value)
          ? props.data.checkedIcon || defaultIcons[1]
          : props.data.icon || defaultIcons[0];
      }
      return checkedValue.includes(item.value)
        ? props.data.checkedIconStyle
        : props.data.iconStyle;
    };

    /**
     * 选择框点击事件
     * @param {Object} item 当前点击的选择框数据
     * @param {Number} index 当前点击的选择框索引
     * @returns void
     */
    const onClick = (item: RadioItem, index: number) => {
      if (props.data.disabled || item.disabled) return;

      if (props.data.multiple) {
        // 如果是多选
        // 当前项已包含在选中项，则反选
        if (checkedValue.includes(item.value)) {
          checkedValue.splice(checkedValue.indexOf(item.value), 1);
        } else {
          checkedValue.push(item.value);
        }
      } else {
        // 如果是单选
        // 当前项已包含在选中项
        if (checkedValue.includes(item.value)) return;
        checkedValue = [];
        checkedValue.push(item.value);
      }

      const value = props.data.multiple ? checkedValue : checkedValue[0];
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
      () => props.data.modelValue,
      (value) => {
        checkedValue = Array.isArray(value) ? value : [value];
      }
    );

    return {
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
