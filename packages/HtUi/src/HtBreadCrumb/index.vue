<template>
  <div class="ht-bread-crumb">
    <div
      v-for="(item, index) in data.list"
      :key="index"
      class="item"
      @click="onItemClick(item, index)"
    >
      <span v-if="index !== 0" class="separator">{{
        data.separator || defaultSeparator
      }}</span>
      <span
        class="name"
        :style="`color: ${
          index === data.list.length - 1
            ? data.activeColor || data.color
            : data.color
        }`"
      >
        <!-- 默认内容插槽 -->
        <slot :scope="data">
          {{ item.name }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BreadCrumbData, BreadCrumbItem } from "./types";

/**
 * 项目中使用到的面包屑。
 * */
export default defineComponent({
  name: "HtBreadCrumb",

  props: {
    data: {
      type: Object as PropType<BreadCrumbData>,
      required: true,
      default: () => ({
        list: [],
        separator: "/",
      }),
    },
  },

  setup(props, { emit }) {
    const defaultSeparator = "/";

    /**
     * 面包屑点击事件
     * @param {Object} item 点击的面包屑item对象
     * @param {Number} index 点击的面包屑索引值
     * @returns void
     */
    const onItemClick = (item: BreadCrumbItem, index: number) => {
      /**
       * 面包屑点击事件触发
       * @param {Object} item 点击的面包屑item对象
       * @param {Number} index 点击的面包屑索引值
       */
      emit("on-click", item, index);
    };

    return {
      defaultSeparator,
      onItemClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
