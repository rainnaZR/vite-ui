<template>
  <div style="width: 800px; margin: 50px auto">
    <div class="f-fs24 f-fw1 f-mb20">Ht-Ui</div>

    <div class="f-mb20">
      <h2 class="s-fc1 f-fs18 f-fw1 f-mb10">iconfont</h2>
      <i class="u-icon u-icon-arrowleft"></i>
      <i class="u-icon u-icon-add"></i>
      <i class="u-icon u-icon-spread"></i>
      <i class="u-icon u-icon-eye"></i>
      <i class="u-icon u-icon-import"></i>
      <i class="u-icon u-icon-user"></i>
    </div>

    <div class="f-mb20">
      <h2 class="s-fc1 f-fs18 f-fw1 f-mb10">倒计时组件</h2>
      <ht-count-down v-model:time="time" @on-stop="onStop" />
      <ht-count-down v-model:time="time2" @on-stop="onStop" />
    </div>

    <div class="f-mb20">
      <h2 class="s-fc1 f-fs18 f-fw1 f-mb10">按钮组件</h2>
      <ht-button type="default">默认按钮</ht-button>
      <ht-button type="primary">主要按钮</ht-button>
      <ht-button type="success">成功按钮</ht-button>
      <ht-button type="info">提示按钮</ht-button>
      <ht-button type="warning">警告按钮</ht-button>
      <ht-button type="danger">危险按钮</ht-button>
      <ht-button type="text">文字按钮</ht-button>

      <ht-button type="default" size="mini">默认迷你按钮</ht-button>
      <ht-button type="default" size="small">默认小按钮</ht-button>
      <ht-button type="default" size="normal">默认正常按钮</ht-button>
      <ht-button type="default" size="big">默认大按钮</ht-button>
      <ht-button type="default" size="huge">默认超大按钮</ht-button>

      <ht-button type="default" size="big">禁用状态</ht-button>
      <ht-button type="default" size="huge">自定义样式</ht-button>
    </div>

    <div class="f-mb20">
      <h2 class="s-fc1 f-fs18 f-fw1 f-mb10">图片组件</h2>
      <ht-img
        src="https://img11.360buyimg.com/pop/s1180x940_jfs/t1/115893/29/24341/38397/61c566fdE263704d1/282ee8a9b41ee6eb.jpg.webp"
        width="300px"
        height="300px"
        radius="50%"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HtButton from "~/HtUi/src/HtButton";

export default defineComponent({
  components: {
    HtButton,
  },
  setup() {
    const time = ref(900000);
    const time2 = ref(95000000);
    const onStop = () => {
      console.log("倒计时停止");
    };

    return {
      time,
      time2,
      onStop,
    };
  },
});
</script>
