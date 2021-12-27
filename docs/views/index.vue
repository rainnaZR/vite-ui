<template>
  <div>Ht-Ui</div>

  <div class="f-mb20">
    <h2 class="s-fc1">倒计时组件</h2>
    <ht-count-down v-model:time="time" @on-stop="onStop" />
  </div>

  <div class="f-mb20">
    <h2 class="s-fc1">图片组件</h2>
    <ht-img
      src="https://img11.360buyimg.com/pop/s1180x940_jfs/t1/115893/29/24341/38397/61c566fdE263704d1/282ee8a9b41ee6eb.jpg.webp"
      width="500px"
      height="500px"
      radius="50%"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const time = ref(10000);
    const onStop = () => {
      console.log("倒计时停止");
    };

    return {
      time,
      onStop,
    };
  },
});
</script>
