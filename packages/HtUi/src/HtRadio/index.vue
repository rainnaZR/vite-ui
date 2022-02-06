<template>
  <div class="ht-radio">
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
import { defineComponent, PropType, ref, watch } from "vue";
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
    const checkedValue = ref(props.data.modelValue || ""); // 当前选中radio值

    /**
     * 获取单选框样式
     * @returns {Object} style 单选框样式
     */
    const onGetStyle = () => {
      const { column } = props.data;
      if (!column) return {};

      return {
        width: `${(100 / ~~column).toFixed(2)}%`,
      };
    };

    /**
     * 获取当前radio的icon配置项
     * @param {Object} item 当前点击的radio数据
     * @param {String} type radio的配置类型
     * @returns {String/Object} name/style 当前radio的icon图标名/当前radio的icon样式
     */
    const onGetIcon = (item: RadioItem, type: string) => {
      if (type === "name") {
        return item.value === checkedValue.value
          ? props.data.checkedIcon || "u-icon-radioCheck"
          : props.data.icon || "u-icon-radio";
      }
      return item.value === checkedValue.value
        ? props.data.checkedIconStyle
        : props.data.iconStyle;
    };

    /**
     * 单选框点击事件
     * @param {Object} item 当前点击的radio数据
     * @param {Number} index 当前点击的radio索引
     * @returns void
     */
    const onClick = (item: RadioItem, index: number) => {
      if (
        props.data.disabled ||
        item.disabled ||
        checkedValue.value === item.value
      )
        return;
      checkedValue.value = item.value;
      /**
       * 单选框组选中值更新
       * @param {String} value 单选框组选中值
       */
      emit("update:modelValue", item.value);
      /**
       * 单选框组值更新事件触发
       * @param {Object} item 当前点击的radio数据
       * @param {Number} index 当前点击的radio索引
       */
      emit("on-change", item, index);
    };

    watch(
      () => props.data.modelValue,
      (value) => {
        checkedValue.value = value;
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
