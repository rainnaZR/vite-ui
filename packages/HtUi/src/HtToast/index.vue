<template>
  <div
    v-if="!isDestroy"
    :class="[
      'ht-toast',
      `ht-toast-${data.type || 'success'}`,
      { 'ht-toast-show': isShow },
    ]"
    :style="data.style"
  >
    <!-- 图标插槽 -->
    <slot name="icon">
      <ht-icon v-if="data.icon" class="f-mr10" :data="{ name: data.icon }" />
    </slot>
    <!-- 内容插槽 -->
    <slot name="content">{{ data.content }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted } from "vue";
import { ToastData } from "./types";

// toast提示信息组件。
export default defineComponent({
  name: "HtToast",

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
    const duration = 1500;

    /**
     * 提示消失
     * @returns void
     */
    const onHide = () => {
      isShow.value = false;
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
      setTimeout(onHide, props.data.duration || duration);
    };

    onMounted(() => onShow());

    return { isShow, isDestroy };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
