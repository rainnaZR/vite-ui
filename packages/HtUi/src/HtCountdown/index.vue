<template>
  <!-- 倒计时 -->
  <div class="ht-count-down">
    <slot :scope="detail">
      <span v-if="detail.day > 0">{{ detail.day }}天</span>
      {{ detail.hour || 0 }}时{{ detail.minute || 0 }}分{{
        detail.second || 0
      }}秒
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { time as timeUtil } from "@htfed/utils";
import { CountDownData, Detail } from "./types";

export default defineComponent({
  name: "ht-count-down",

  props: {
    data: {
      type: Object as PropType<CountDownData>,
      default: () => ({
        time: 0,
        unit: "s",
      }),
    },
  },

  setup(props, { emit }) {
    const detail = ref({});
    const time =
      props.data.unit === "s" ? ~~props.data.time * 1000 : ~~props.data.time;

    timeUtil.getCountDown(time, (res: Detail) => {
      detail.value = res;
      res.timestamp === 0 && emit("on-stop");
    });

    return {
      detail,
    };
  },
});
</script>
