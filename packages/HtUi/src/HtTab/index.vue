<template>
  <div :class="['ht-tab', `ht-tab-${data.direction}`]">
    <div v-for="(tab, index) in data.list" :key="index">
      <div
        :class="[
          'content',
          {
            'content-curr': data.currentValue[0] === tab.value,
          },
          'f-curp',
        ]"
        :style="onGetStyle(tab, 0)"
        @click="onTabClick(tab, index, 0)"
      >
        <!-- 左侧图标插槽 -->
        <slot name="icon" :scope="data">
          <span v-if="tab.icon" :class="`u-icon ${tab.icon} f-mr10`"></span>
        </slot>
        <!-- 内容默认插槽 -->
        <slot :scope="data">
          <span class="label">{{ tab.label }}</span>
        </slot>
        <!-- 下拉子菜单 -->
        <span
          v-if="tab.children && tab.children.length"
          class="u-icon u-icon-arrowbottom f-ml10 f-trans"
        ></span>
      </div>

      <!-- 子菜单列表 -->
      <div
        v-if="tab.children && tab.children.length"
        class="children f-trans f-oh"
        :style="{
          height:
            data.currentValue[0] === tab.value
              ? `${tab.children.length * itemHeight}px`
              : '0px',
        }"
      >
        <div
          v-for="(child, childIndex) in tab.children"
          v-bind:key="`${index}-${childIndex}`"
          :class="[
            'child',
            {
              'child-curr': data.currentValue[1] === child.value,
            },
            'f-curp',
          ]"
          :style="onGetStyle(child, 1)"
          @click="onTabClick(child, childIndex, 1)"
        >
          <span class="label">{{ child.label }}</span>
        </div>
      </div>
    </div>
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
    const itemHeight = 48;

    /**
     * 获取tab样式
     * @param {Object} tab 当前tab对象
     * @param {Number} depth 当前点击的tab深度
     * @returns {Object} tab样式
     */
    const onGetStyle = (tab: TabItem, depth: number) => {
      const currentValue: any = props.data?.currentValue;
      const isCurrent = tab.value === currentValue[depth];
      const color = isCurrent ? props.data.activeColor : props.data.color;
      const backgroundColor =
        isCurrent && (depth > 0 || (!depth && !tab.children))
          ? props.data.activeBgColor
          : "transparent";
      return {
        color,
        backgroundColor,
      };
    };

    /**
     * tab点击方法
     * @param {Object} tab 当前点击的tab对象
     * @param {Number} index 当前点击的tab索引值
     * @param {Number} depth 当前点击的tab深度
     * @returns void
     */
    const onTabClick = (tab: TabItem, index: number, depth: number) => {
      const currentValue: any = props.data?.currentValue;
      const params =
        !depth && !tab.children
          ? [tab.value]
          : !depth && tab.children
          ? tab.value === currentValue[0]
            ? [currentValue[0], currentValue[1]]
            : [tab.value, tab.children[0].value]
          : [currentValue[0], tab.value];
      /**
       * 当前tab点击的value值更新
       * @param {Array} params 当前点击tab的value值数组
       */
      emit("update:currentValue", params);

      /**
       * tab事件点击触发
       * @param {Object} tab 当前点击的tab对象
       * @param {Number} index 当前点击的tab索引值
       * @param {Number} depth 当前点击的tab深度
       */
      emit("on-change", tab, index, depth);
    };

    return { itemHeight, onGetStyle, onTabClick };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
