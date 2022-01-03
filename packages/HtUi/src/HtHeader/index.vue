<template>
  <div class="ht-header">
    <!-- 头部左边区域 -->
    <div class="header-left">
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

    <!-- 头部中间区域 -->
    <div class="header-center">
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

    <!-- 头部右边区域 -->
    <div class="header-right">
      <slot name="right" :scope="data"> Github </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import HtImage from "../HtImage";
import HtTab from "../HtTab";
import { HeaderData } from "./types";

export default defineComponent({
  name: "HtHeader",

  components: {
    HtImage,
    HtTab,
  },

  props: {
    data: {
      type: Object as PropType<HeaderData>,
      default: () => {},
    },
  },

  setup(props, { emit }) {
    const onClickLogo = () => {
      emit("on-click:logo", props.data);
    };
    const onClickTab = (item: any, index: number) => {
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
