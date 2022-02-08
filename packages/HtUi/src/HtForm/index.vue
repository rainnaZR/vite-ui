<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormData } from "./types";

export default defineComponent({
  name: "HtForm",

  props: {
    data: {
      type: Object as PropType<FormData>,
      required: true,
      default: () => ({
        model: {},
        rules: [],
      }),
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
