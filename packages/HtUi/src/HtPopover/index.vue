<template>
  <div
    class="ht-popover"
    :style="data.style"
    :tabindex="data.tabIndex || 0"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    @click="onClick"
  >
    <!-- 展示内容插槽 -->
    <slot scope="data">{{ data.content }}</slot>
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
        {
          'popover-tooltip': isTooltip,
        },
        'f-trans',
      ]"
      :style="onGetStyle()"
    >
      <div
        class="box"
        :style="{
          width: data.width,
        }"
      >
        <div class="arrow" :style="data.arrowStyle"></div>
        <div class="content" :style="data.contentStyle">
          <div class="f-tac">{{ data.popContent }}</div>
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
import { isTooltip } from "./hooks";

/**
 * 气泡弹窗提示。
 * */
export default defineComponent({
  name: "HtPopover",

  props: {
    // 弹出窗是否显示
    modelValue: {
      type: Boolean,
      default: false,
    },
    // 配置数据
    data: {
      type: Object as PropType<PopoverData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const show = ref(props.modelValue);
    const trigger = ref(props.data.trigger || "hover");

    /**
     * 鼠标mouseover事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onMouseOver = (e: MouseEvent) => {
      if (trigger.value === "hover") show.value = true;

      /**
       * hover事件触发
       * @param {Boolean} show 弹出窗是否显示
       * @param {Object} event MouseEvent对象
       */
      emit("on-hover", { show: show.value, e });
    };

    /**
     * 鼠标mouseout事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onMouseOut = (e: MouseEvent) => {
      if (trigger.value === "hover") show.value = false;

      /**
       * hover事件触发
       * @param {Boolean} show 弹出窗是否显示
       * @param {Object} event MouseEvent对象
       */
      emit("on-hover", { show: show.value, e });
    };

    /**
     * 点击事件
     * @param {Object} event MouseEvent对象
     * @returns void
     */
    const onClick = (e: MouseEvent) => {
      if (trigger.value === "click") show.value = !show.value;

      /**
       * 点击事件触发
       * @param {Boolean} show 弹出窗是否显示
       * @param {Object} event MouseEvent对象
       */
      emit("on-click", { show: show.value, e });
    };

    /**
     * 获取样式
     * @returns {string} style 样式值
     */
    const onGetStyle = () => {
      const { position = "bottom-center", offset } = props.data;
      if (!offset) return;
      const padding = ["top-left", "top-center", "top-right"].includes(position)
        ? `0 0 ${offset}px`
        : ["bottom-left", "bottom-center", "bottom-right"].includes(position)
        ? `${offset}px 0 0`
        : ["left-top", "left-center", "left-bottom"].includes(position)
        ? `0 ${offset}px 0 0`
        : ["right-top", "right-center", "right-bottom"].includes(position)
        ? `0 0 0 ${offset}px`
        : 0;
      return `padding: ${padding}`;
    };

    watch(show, (value) => {
      /**
       * 弹出窗是否显示
       * @param {Boolean} value 弹出窗是否显示
       */
      emit("update:modelValue", value);
      /**
       * 弹出窗状态变化事件
       * @param {Boolean} show 弹出窗是否显示
       */
      emit("on-popover-change", { show: value });
    });
    watch(
      () => props.modelValue,
      (value) => {
        show.value = value;
      },
      {
        immediate: true,
      }
    );

    return {
      show,
      isTooltip,
      onMouseOver,
      onMouseOut,
      onClick,
      onGetStyle,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
