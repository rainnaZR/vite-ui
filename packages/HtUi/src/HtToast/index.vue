<template>
  <div
    v-if="!isDestroy"
    :class="[
      'ht-toast',
      `ht-toast-${data.type || 'info'}`,
      { 'ht-toast-show': isShow },
    ]"
    :style="{
      ...(data.style || {}),
      transform: isShow
        ? `translate(-50%, ${data.offset || defaultData.offset}px)`
        : 'translate(-50%, 0)',
    }"
  >
    <div class="box">
      <!-- 图标 -->
      <ht-icon
        v-if="data.icon || data.type"
        class="f-mr10"
        :data="{ name: data.icon || `u-icon-${data.type}` }"
      />
      <!-- 内容 -->
      <div v-html="data.content"></div>
      <!-- 关闭按钮 -->
      <ht-icon
        v-if="data.closable"
        class="f-ml20 f-curp"
        :data="{ name: 'u-icon-close', style: 'color: #999' }"
        @click="onHide"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import HtIcon from "../HtIcon";
import { ToastData } from "./types";

// toast提示信息组件。
export default defineComponent({
  name: "HtToast",

  components: {
    HtIcon,
  },

  props: {
    // 配置数据
    data: {
      type: Object as PropType<ToastData>,
      required: true,
      default: () => ({}),
    },
  },

  setup(props) {
    const isShow = ref(false); // 是否显示
    const isDestroy = ref(false); // 是否销毁
    const intervalId: any = ref(null);
    const defaultData = {
      offset: 20,
      duration: 3000,
    };

    /**
     * 提示消失
     * @returns void
     */
    const onHide = () => {
      isShow.value = false;
      intervalId.value && clearTimeout(intervalId.value);
      setTimeout(() => {
        isDestroy.value = true;
      }, 500); // 500ms 为渐隐动画执行时间，元素渐隐后删除元素
    };

    /**
     * 提示显示
     * @returns void
     */
    const onShow = () => {
      isShow.value = true;
      if (props.data.duration <= 0) return;
      intervalId.value = setTimeout(
        onHide,
        props.data.duration || defaultData.duration
      );
    };

    onMounted(() => {
      setTimeout(onShow);
    });

    return { isShow, isDestroy, intervalId, defaultData, onShow, onHide };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
