<template>
  <!-- 首页 -->
  <div class="g-page f-df f-fdc f-aic">
    <!-- 头部 -->
    <div class="m-header">
      <ht-header
        :data="headerData"
        @on-click:logo="onLogoClick"
        @on-click:tab="onTabClick"
      />
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
import { IndexToolsItem } from "../types/interface";

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
    const list: IndexToolsItem[] = reactive([
      {
        img: "logo.png",
        title: "UI组件库",
        introduce: "一款轻量级、基于Vue3的PC端组件库。",
        path: "/doc",
      },
    ]);
    const $router = useRouter();
    const onLogoClick = () => {
      $router.push("/");
    };
    const onTabClick = (tab: any) => {
      $router.push(tab.path);
    };

    return {
      headerData,
      list,
      onLogoClick,
      onTabClick,
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
  .m-header {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 2;
  }
  .m-main {
    flex: 1;
    padding: 100px 0;
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
