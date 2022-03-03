<template>
  <div
    class="ht-popover"
    :style="data.style"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    @click="onClick"
  >
    <!-- 展示内容插槽 -->
    <slot scope="data">{{ data.text }}</slot>
    <div
      :class="[
        'popover',
        `popover-${data.position || 'bottom-center'}`,
        {
          'popover-hide-arrow': data.hideArrow,
        },
        {
          'popover-show': show,
        },
        'f-trans',
      ]"
    >
      <div
        class="box"
        :style="{
          width: data.width,
        }"
      >
        <div class="arrow" :style="data.arrowStyle"></div>
        <div class="content" :style="data.contentStyle">
          <!-- 弹出内容插槽 -->
          <slot name="popover" scope="data"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { PopoverData } from "./types";

/**
 * 气泡弹窗
 * */
export default defineComponent({
  name: "HtPopover",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<PopoverData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const show = ref(props.data.show);
    const trigger = ref(props.data.trigger || "hover");
    const onMouseOver = (e: MouseEvent) => {
      if (trigger.value === "hover") show.value = true;
      emit("on-hover", { show: show.value, e });
    };
    const onMouseOut = (e: MouseEvent) => {
      if (trigger.value === "hover") show.value = false;
      emit("on-hover", { show: show.value, e });
    };
    const onClick = (e: MouseEvent) => {
      if (trigger.value === "click") show.value = !show.value;
      emit("on-click", { show: show.value, e });
    };
    watch(show, (value) => {
      emit("on-popover-change", { show: value });
    });

    return {
      show,
      onMouseOver,
      onMouseOut,
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
