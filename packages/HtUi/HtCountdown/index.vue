<template>
  <!-- 倒计时 -->
  <div class="ht-count-down" v-if="data && data.timestamp">
    <slot :data="data">
      {{ data.day }}天 {{ data.hour }}时 {{ data.minute }}分 {{ data.second }}秒
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Result } from "./interface";

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

    const numFixed = (num: number) => {
      return num < 10 && num > 0 ? `0${num}` : `${num}`;
    };

    const formatLeftTime = (timestamp: number): Result => {
      const day = Math.floor(timestamp / 1000 / 60 / 60 / 24);
      let leftTime = timestamp % (1000 * 60 * 60 * 24);
      const hour = Math.floor(leftTime / 1000 / 60 / 60);
      leftTime %= 1000 * 60 * 60;
      const minute = Math.floor(leftTime / 1000 / 60);
      leftTime %= 1000 * 60;
      const second = Math.floor(leftTime / 1000);

      return {
        timestamp,
        day,
        hour: numFixed(hour),
        minute: numFixed(minute),
        second: numFixed(second),
      };
    };

    const onCountDown = (timestamp: any, cbFunc: Function) => {
      if (!timestamp) return;
      if (typeof timestamp !== "number") {
        timestamp = Number(timestamp);
      }

      let intervalId: NodeJS.Timeout | undefined; // 定时器
      const change = () => {
        cbFunc(formatLeftTime(timestamp));
        if (timestamp < 1000) {
          clearInterval(intervalId as NodeJS.Timeout);
          return;
        }
        timestamp -= 1000;
      };
      intervalId = setInterval(change, 1000);
      change();
    };

    onCountDown(props.time, (res: Result) => {
      data.value = res;
      if (res.timestamp === 0) emit("on-stop");
    });

    return {
      data,
    };
  },
});
</script>
