<template>
  <!-- 复制 -->
  <div class="ht-copy">
    <!-- 复制入口 -->
    <div @click="onCopy">
      <slot name="entry">
        <ht-button class="entry" :data="{ size: 'small' }">复制</ht-button>
      </slot>
    </div>

    <!-- 复制内容 -->
    <div ref="contentRef">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HtButton from '../HtButton';
import { dom } from '@htfed/utils';

export default defineComponent({
  name: "HtCopy",

  components: {
    HtButton
  },

  setup(props, { emit }) {
    const contentRef = ref<HTMLDivElement>()
    const onCopy = () => {
      let value = contentRef.value!?.textContent!?.slice(0, -1)
      dom.onCopy(value).then((res?: string) => {
        alert(res);
        emit('on-success', res)
      }, (err?: string) => {
        alert(err);
        emit('on-fail', err)
      })
    }

    return {
      contentRef,
      onCopy,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
