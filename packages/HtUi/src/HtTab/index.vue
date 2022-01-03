<template>
  <!-- 标签页 -->
  <div class="ht-tab">
    <slot>
      <div class="tabs">
        <div
          v-for="(tab, index) in data.list"
          :key="index"
          :class="[
            'item',
            {
              'item-curr': data.currentValue == tab.value,
            },
          ]"
          :style="`color: ${
            data.currentValue == tab.value ? data.activeColor : data.color
          }`"
          @click="onTabClick(tab, index)"
        >
          {{ tab.label }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TabItem, TabData } from "./types";

export default defineComponent({
  name: "HtTab",

  props: {
    data: {
      type: Object as PropType<TabData>,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    const onTabClick = (tab: TabItem, index: number) => {
      if (props.data.currentValue === tab.value) return;

      emit("update:currentValue", tab.value);
      emit("on-change", tab, index);
    };

    return { onTabClick };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
