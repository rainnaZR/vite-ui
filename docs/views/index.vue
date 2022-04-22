<template>
  <!-- 首页 -->
  <div class="g-page f-lt2">
    <video
      class="video"
      autoplay="autoplay"
      preload="auto"
      muted="muted"
      playsinline="true"
      webkit-playsinline="true"
      loop="true"
      src="https://lofter.lf127.net/1611821341381/jwhaideyanjing~1.mp4"
    />
    <!-- 头部 -->
    <div class="m-header">
      <ht-header
        :data="headerData"
        @on-click:logo="onClickLogo"
        @on-click:tab="onClickTab"
      >
        <template #right>
          <div class="f-fs12 s-fc1">
            今天倒计时：<ht-count-down :data="countDownData" />
          </div>
        </template>
      </ht-header>
    </div>

    <!-- 内容 -->
    <div class="m-main f-flexc f-pr">
      <div class="m-list">
        <div
          class="item f-flexc f-mb20"
          v-for="(item, index) in list"
          :key="index"
          @click="onClickCard(item.path)"
        >
          <div class="cover">
            <ht-image
              v-if="item.img"
              class="f-mb20"
              :data="{ src: item.img }"
            />
            <svg v-else viewBox="0 0 780 250" style="width: 100%">
              <path
                fill="#231F20"
                d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"
              />
            </svg>
          </div>
          <div class="f-mb15 f-fs18 s-fc4">{{ item.title }}</div>
          <div class="f-mb15 f-fs14 s-fc6">{{ item.introduce }}</div>
          <ht-button>立即查看</ht-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import { time } from "@htfed/utils";
import { IndexToolsItem } from "../types";

export default defineComponent({
  setup() {
    const headerData = reactive({
      logoUrl: "logo.png",
      logoWidth: 40,
      logoHeight: 40,
      logoAlt: "前端资源管理平台",
      logoText: "前端资源管理平台",
      tabList: [
        {
          label: "指南",
          value: "introduce",
          path: "/doc/introduce",
        },
        {
          label: "组件",
          value: "HtAvatar",
          path: "/doc/HtAvatar",
        },
      ],
    });
    const countDownData = reactive({
      time: time.getTodayLeftTime(),
      unit: "s",
    });
    const list: IndexToolsItem[] = reactive([
      {
        img: "logo.png",
        title: "UI组件库",
        introduce: "一款轻量级、基于Vue3的PC端组件库。",
        path: "/doc",
      },
      {
        title: "包管理",
        introduce: "包列表。",
        path: "https://www.npmjs.com/search?q=%40htfed",
      },
    ]);
    const $router = useRouter();
    const onClickLogo = () => {
      $router.push("/");
    };
    const onClickTab = (tab: any) => {
      $router.push(tab.path);
    };
    const onClickCard = (path: string) => {
      if (path.startsWith("http")) {
        window.open(path, "_blank");
      } else {
        $router.push(path);
      }
    };

    return {
      headerData,
      countDownData,
      list,
      onClickLogo,
      onClickTab,
      onClickCard,
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
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.g-page {
  background: #1274a8;
  .video {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    animation: fadeIn ease-in-out 2s;
  }
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
    padding: 160px 0 100px;
    box-sizing: border-box;
  }
  .m-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100vw;
    .item {
      width: 30%;
      min-width: 250px;
      max-width: 400px;
      padding: 20px;
      margin: 20px;
      box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 16px;
      box-sizing: border-box;
      background: #fff;
      animation: floating ease-in-out 1.6s infinite alternate;
      opacity: 0.9;
    }
    .cover {
      display: flex;
      height: 200px;
    }
  }
}
</style>
