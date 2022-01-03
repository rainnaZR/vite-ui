<template>
  <!-- 首页 -->
  <div class="g-page f-df f-fdc f-aic">
    <!-- 头部 -->
    <ht-header class="m-header" />

    <!-- 内容 -->
    <div class="m-main f-f1 f-df f-fdc f-jcc">
      <h1 class="m-title f-mb50 f-fs30 f-tac">前端基础建设平台</h1>
      <div class="m-list f-df f-jcsa f-fww">
        <div
          class="item f-mb20 f-tac"
          v-for="(item, index) in list"
          :key="index"
        >
          <ht-image class="f-mb20" :src="item.img" />
          <div class="f-mb15 f-fs18">{{ item.title }}</div>
          <div class="f-mb10 f-fs14 s-fc6">{{ item.introduce }}</div>
          <ht-button type="primary">
            <router-link :to="item.path">开始使用</router-link>
          </ht-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { IndexToolsItem } from "../types/interface";
import HtHeader from "~/HtUi/src/HtHeader";
import HtButton from "~/HtUi/src/HtButton";

export default defineComponent({
  components: {
    HtHeader,
    HtButton,
  },
  setup() {
    const list: IndexToolsItem[] = reactive([
      {
        img: "logo.png",
        title: "UI组件库",
        introduce: "一款轻量级、基于Vue3的PC端组件库。",
        path: "/doc",
      },
    ]);

    return {
      list,
    };
  },
});
</script>

<style scoped lang="less">
@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(15px);
  }
}
.g-page {
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(#ecf6fb, 1),
    rgba(#ecf6fb, 0.8),
    rgba(#ecf6fb, 0.6)
  );
  .m-main {
    .m-list {
      width: 100vw;
      .item {
        width: 30%;
        min-width: 250px;
        max-width: 400px;
        padding: 15px;
        box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        box-sizing: border-box;
        background: #fff;
        animation: floating ease-in-out 1.6s infinite alternate;
      }
    }
  }
}
</style>
