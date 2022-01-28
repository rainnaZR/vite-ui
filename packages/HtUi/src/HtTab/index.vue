<template>
  <ul :class="['ht-tab', `ht-tab-${data.direction}`]">
    <li v-for="(tab, index) in data.list" :key="index">
      <div
        :class="[
          'content',
          {
            'content-curr': data.currentValue[0] === tab.value,
          },
        ]"
        :style="onGetStyle(data.currentValue[0] === tab.value)"
        @click="onTabClick(tab, index)"
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
          class="u-icon u-icon-arrowbottom f-ml10"
        ></span>
      </div>

      <!-- 子菜单列表 -->
      <ul v-if="tab.children && tab.children.length" class="children">
        <div
          v-for="(child, childIndex) in tab.children"
          v-bind:key="`${index}-${childIndex}`"
          :class="[
            'child',
            {
              'child-curr': data.currentValue[1] === child.value,
            },
          ]"
          :style="onGetStyle(data.currentValue[1] === child.value)"
          @click="onSubTabClick(child, childIndex)"
        >
          <span class="label">{{ child.label }}</span>
        </div>
      </ul>
    </li>
  </ul>
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
     * @param {Boolean} isCurrent 是否是选中状态
     * @returns {Object} tab样式
     */
    const onGetStyle = (isCurrent: Boolean) => {
      const color = isCurrent ? props.data.activeColor : props.data.color;
      return {
        color,
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
