<template>
  <div
    :class="[
      'ht-dialog',
      `ht-dialog-${data.type || 'warning'}`,
      { 'ht-dialog-show': isShow },
      'f-trans',
    ]"
    :style="data.wrapStyle"
    @click="() => data.maskClosable !== false && onCancel()"
  >
    <div
      class="box f-pr"
      :style="{
        ...(data.style || {}),
        width: data.width,
        height: data.height,
      }"
      @click.stop
    >
      <ht-icon
        v-if="data.closable !== false"
        class="close f-curp f-trans"
        :data="{ name: 'u-icon-close' }"
        @click="onCancel"
      />
      <!-- 顶部内容 -->
      <div v-if="!data.hideHeader" class="header" :style="data.headerStyle">
        <!-- 顶部内容插槽 -->
        <slot name="header">
          <ht-icon
            class="icon f-mr10"
            :data="{
              name: `u-icon-${data.type || 'warning'}`,
              style: { fontSize: '20px' },
            }"
          />
          <div class="f-fs18 f-f1">{{ data.title || "提示" }}</div>
        </slot>
      </div>

      <!-- 主体内容 -->
      <div class="content f-mt10 f-mb30" :style="data.contentStyle">
        <!-- 主体内容插槽 -->
        <slot>{{ data.content }}</slot>
      </div>

      <!-- 底部内容 -->
      <div v-if="!data.hideFooter" class="footer" :style="data.footerStyle">
        <div class="f-mr10 f-fs13 s-fc6" v-html="data.footerTips"></div>
        <div class="buttons f-f1 f-tar">
          <!-- 底部内容插槽 -->
          <slot name="footer">
            <ht-button
              v-if="!data.hideCancelButton"
              :data="{
                ...defaultCancelButton,
                ...(data.cancelButton || {}),
              }"
              @click="onCancel"
            />
            <ht-button
              v-if="!data.hideConfirmButton"
              :data="{
                ...defaultConfirmButton,
                ...(data.confirmButton || {}),
              }"
              @click="onConfirm"
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
    const isShow = ref(props.visible); // 是否显示
    const defaultConfirmButton = {
      type: "primary",
      content: "确认",
    };
    const defaultCancelButton = {
      type: "text",
      content: "取消",
    };
    const onCancel = () => {
      isShow.value = false;
      emit("on-cancel");
    };
    const onConfirm = () => {
      emit("on-confirm");
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

    return {
      isShow,
      defaultConfirmButton,
      defaultCancelButton,
      onCancel,
      onConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
