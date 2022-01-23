<template>
  <div :class="['ht-tab', `ht-tab-${data.direction}`]">
    <!-- 正文插槽 -->
    <slot :scope="data">
      <div
        v-for="(tab, index) in data.list"
        :key="index"
        :class="[
          'item',
          {
            'item-curr': data.currentValue == tab.value,
          },
        ]"
        :style="onGetStyle(tab)"
        @click="onTabClick(tab, index)"
      >
        {{ tab.label }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TabItem, TabData } from "./types";

// tab导航切换功能。
export default defineComponent({
  name: "HtTab",

  props: {
    data: {
      type: Object as PropType<TabData>,
      required: true,
      default: () => ({
        direction: "row",
        list: [],
      }),
    },
  },

  setup(props, { emit }) {
    /**
     * 获取tab样式
     * @param {Object} tab TabItem对象
     * @returns {Object} tab样式
     */
    const onGetStyle = (tab: TabItem) => {
      const isCurrent = props.data.currentValue === tab.value;
      const color = isCurrent ? props.data.activeColor : props.data.color;
      return {
        color,
        borderColor: isCurrent ? color : "transparent",
      };
    };

    /**
     * tab点击方法
     * @param {Object} tab 当前点击的tabItem对象
     * @param {Number} index 当前点击的tab索引值
     * @returns void
     */
    const onTabClick = (tab: TabItem, index: number) => {
      if (props.data.currentValue === tab.value) return;

      /**
       * 当前tab点击的value值更新
       * @param {String, Number} value 当前点击tab的value值
       */
      emit("update:currentValue", tab.value);

      /**
       * tab事件点击触发
       * @param {Object} tab 当前点击的tabItem对象
       * @param {Number} index 当前点击的tab索引值
       */
      emit("on-change", tab, index);
    };

    return { onGetStyle, onTabClick };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
