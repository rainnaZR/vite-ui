<template>
  <!-- Markdown文件里的Demo宏 -->
  <div class="ht-md-demo">
    <ht-button
      @click="isShowCode = !isShowCode"
      :data="{ type: 'primary', full: true }"
      >查看源码</ht-button
    >
    <ht-copy v-if="isShowCode"><slot></slot></ht-copy>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HtButton from "../HtButton";
import HtCopy from "../HtCopy";

export default defineComponent({
  name: "HtMdDemo",

  components: {
    HtButton,
    HtCopy,
  },

  setup(props, { emit }) {
    const isShowCode = ref(false);

    return {
      isShowCode,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
