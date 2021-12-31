<template>
  <!-- 倒计时 -->
  <div class="ht-count-down">
    <slot :data="data">
      <span v-if="data.day > 0">{{ data.day }}天</span>
      {{ data.hour || 0 }}时{{ data.minute || 0 }}分{{ data.second || 0 }}秒
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
    unit: {
      type: String,
      validator: (value: string) => ["s", "ms"].includes(value),
      default: "s",
    },
  },

  setup(props, { emit }) {
    const data = ref({});
    const time = props.unit === "s" ? Number(props.time) * 1000 : props.time;
    timeUtil.getCountDown(time, (res: Result) => {
      data.value = res;
      if (res.timestamp === 0) emit("on-stop");
    });

    return {
      data,
    };
  },
});
</script>
