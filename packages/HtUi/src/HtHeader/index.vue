<template>
  <div class="ht-header">
    <div class="header-left">
      <!-- 顶部左边区域 -->
      <slot name="left" :scope="data">
        <div class="logo" @click="onClickLogo">
          <ht-image
            :data="{
              src: data.logoUrl,
              width: data.logoWidth || 40,
              height: data.logoHeight || 40,
              alt: data.logoAlt || data.logoText,
            }"
          />
          <div class="text">{{ data.logoText }}</div>
        </div>
      </slot>
    </div>

    <div class="header-center">
      <!-- 顶部中间区域 -->
      <slot name="center" :scope="data">
        <ht-tab
          class="tabs"
          v-model:currentValue="data.tabCurrentValue"
          :data="{
            list: data.tabList,
            currentValue: data.tabCurrentValue,
            color: data.tabColor,
            activeColor: data.tabActiveColor,
          }"
          @on-change="onClickTab"
        />
      </slot>
    </div>

    <div class="header-right">
      <!-- 顶部右边区域 -->
      <slot name="right" :scope="data"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import HtImage from "../HtImage";
import HtTab from "../HtTab";
import { HeaderData } from "./types";

// 通用顶部内容：包含左边logo区域，中间tab导航区域，右侧自定义区域。
export default defineComponent({
  name: "HtHeader",

  components: {
    HtImage,
    HtTab,
  },

  props: {
    data: {
      type: Object as PropType<HeaderData>,
      required: true,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    /**
     * logo点击事件
     * @returns void
     */
    const onClickLogo = () => {
      /**
       * logo事件触发
       * @param {Object} data 通用顶部数据
       */
      emit("on-click:logo", props.data);
    };

    /**
     * tab导航点击事件
     * @param {Object} tabItem 单个tab数据
     * @param {Number} index tab导航点击的索引值
     * @returns void
     */
    const onClickTab = (item: any, index: number) => {
      /**
       * tab导航事件触发
       * @param {Object} tabItem 单个tab数据
       * @param {Number} index tab导航点击的索引值
       */
      emit("on-click:tab", item, index);
    };

    return {
      onClickLogo,
      onClickTab,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
