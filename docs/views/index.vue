<template>
  <!-- 首页 -->
  <div class="g-page f-lt2">
    <!-- 头部 -->
    <div class="m-header">
      <ht-header
        :data="headerData"
        @on-click:logo="onClickLogo"
        @on-click:tab="onClickTab"
      >
        <template #right>
          距离今天结束还剩：
          <ht-count-down :data="countDownData" />
        </template>
      </ht-header>
    </div>

    <!-- 内容 -->
    <div class="m-main f-flexc">
      <h1 class="f-mb50 f-fs30">前端基础建设平台</h1>
      <div class="m-list">
        <div
          class="item f-flexc f-mb20"
          v-for="(item, index) in list"
          :key="index"
        >
          <ht-image class="f-mb20" :data="{ src: item.img }" />
          <div class="f-mb15 f-fs18">{{ item.title }}</div>
          <div class="f-mb10 f-fs14 s-fc6">{{ item.introduce }}</div>
          <router-link :to="item.path">
            <ht-button>开始使用</ht-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { time } from '@htfed/utils';
import { IndexToolsItem } from "../types";

export default defineComponent({
  setup() {
    const headerData = reactive({
      logoUrl: "logo.png",
      logoWidth: 40,
      logoHeight: 40,
      logoAlt: "前端基础建设平台",
      logoText: "前端基础建设平台",
      tabList: [
        {
          label: "指南",
          value: 1,
          path: "/doc/introduce",
        },
        {
          label: "组件",
          value: 2,
          path: "/doc/button",
        },
      ],
      tabCurrentValue: "",
      tabColor: "#999",
      tabActiveColor: "#f60",
    });
    const countDownData = reactive({
      time: time.getTodayLeftTime(),
    });
    const list: IndexToolsItem[] = reactive([
      {
        img: "logo.png",
        title: "UI组件库",
        introduce: "一款轻量级、基于Vue3的PC端组件库。",
        path: "/doc",
      },
    ]);
    const $router = useRouter();
    const onClickLogo = () => {
      $router.push("/");
    };
    const onClickTab = (tab: any) => {
      $router.push(tab.path);
    };

    return {
      headerData,
      countDownData,
      list,
      onClickLogo,
      onClickTab,
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
  .m-header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 2;
    box-shadow: 0 2px 5px rgb(197 217 232 / 50%);
  }
  .m-main {
    min-height: 100vh;
    padding: 100px 0;
    box-sizing: border-box;
    background: linear-gradient(
      180deg,
      rgba(#ecf6fb, 1),
      rgba(#ecf6fb, 0.8),
      rgba(#ecf6fb, 0.6)
    );
  }
  .m-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
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
</style>
