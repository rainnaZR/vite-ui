<template>
  <div
    :class="[
      'ht-dialog',
      `ht-dialog-${type}`,
      { 'ht-dialog-show': isShow },
      'f-trans',
    ]"
    :style="data.wrapStyle"
  >
    <div
      class="box f-pr"
      :style="{
        ...(data.style || {}),
        width: data.width,
        height: data.height,
      }"
    >
      <ht-icon
        v-if="data.closable"
        class="close f-curp f-trans"
        :data="{ name: 'u-icon-close' }"
        @click="onClose"
      />
      <!-- 顶部内容 -->
      <div
        v-if="!data.hideHeader"
        class="header f-mb5"
        :style="data.headerStyle"
      >
        <!-- 顶部内容插槽 -->
        <slot name="header">
          <ht-icon
            class="icon f-mr10"
            :data="{ name: `u-icon-${type}`, style: { fontSize: '20px' } }"
          />
          <div class="f-fs18 f-f1">{{ data.title }}</div>
        </slot>
      </div>

      <!-- 主体内容 -->
      <div class="content" :style="data.contentStyle">
        <!-- 主体内容插槽 -->
        <slot>{{ data.content }}</slot>
      </div>

      <!-- 底部内容 -->
      <div
        v-if="!data.hideFooter"
        class="footer f-mt30"
        :style="data.footerStyle"
      >
        <div class="f-mr10 f-fs13 s-fc6" v-html="data.footerTips"></div>
        <div class="buttons f-f1 f-tar">
          <!-- 底部内容插槽 -->
          <slot name="footer">
            <ht-button
              :data="{
                ...defaultCancelButton,
                ...(data.cancelButton || {}),
              }"
            />
            <ht-button
              :data="{
                ...defaultConfirmButton,
                ...(data.confirmButton || {}),
              }"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import HtIcon from "../HtIcon";
import HtButton from "../HtButton";
import { DialogData } from "./types";

// dialog对话框组件。
export default defineComponent({
  name: "HtDialog",

  components: {
    HtIcon,
    HtButton,
  },

  props: {
    // 是否显示
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
    // 配置数据
    data: {
      type: Object as PropType<DialogData>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const type = props.data?.type || "warning";
    const isShow = ref(props.visible); // 是否显示
    const defaultConfirmButton = {
      type: "primary",
      content: "确认",
    };
    const defaultCancelButton = {
      type: "text",
      content: "取消",
    };

    watch(
      () => props.visible,
      (value) => {
        isShow.value = value; // 设置 value
      },
      {
        immediate: true,
      }
    );
    watch(isShow, (value) => {
      emit("update:visible", value);
    });

    return { type, isShow, defaultConfirmButton, defaultCancelButton };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
