<template>
  <!-- 倒计时 -->
  <div class="ht-count-down">
    <slot :data="data">
      {{ data.day }}天 {{ data.hour }}时 {{ data.minute }}分 {{ data.second }}秒
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { time as timeUtil } from "@htfed/utils";
import { Result } from "./types";

export default defineComponent({
  name: "ht-count-down",

  props: {
    time: {
      type: String || Number,
      required: true,
      default: 0,
    },
  },

  setup(props, { emit }) {
    const data = ref();
    timeUtil.getCountDown(props.time, (res: Result) => {
      data.value = res;
      if (res.timestamp === 0) emit("on-stop");
    });

    return {
      data,
    };
  },
});
</script>
