<template>
  <!-- 文档页 -->
  <div class="g-page">
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

    <!-- 主体 -->
    <div class="m-main">
      <!-- 边栏 -->
      <div class="m-side f-pd20">
        <div v-for="(item, index) in sideData" :key="index" class="f-mb15">
          <div class="f-fw1">{{ item.title }}</div>
          <ht-tab
            :data="{
              direction: 'column',
              list: item.list,
            }"
            @on-change="onClickTab"
          />
        </div>
      </div>

      <!-- 正文 -->
      <div class="m-content f-pd20 f-ml20">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { time } from "@htfed/utils";
import { groupDocs } from "../router/docs";

export default defineComponent({
  setup() {
    const $route = useRoute();
    const $router = useRouter();
    const headerData = reactive({
      logoUrl: "../logo.png",
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
      tabCurrentValue: $route.name,
      tabColor: "",
      tabActiveColor: "",
    });
    const countDownData = reactive({
      time: time.getTodayLeftTime(),
      unit: "s",
    });
    const sideData = computed(() =>
      Object.keys(groupDocs)?.map((key) => ({
        title: key !== "default" ? key : "",
        list: groupDocs[key]?.map((i: any) => ({
          label: i.meta?.title || i.name,
          value: i.name,
          path: `/doc/${i.path}`,
        })),
      }))
    );
    const onClickLogo = () => {
      $router.push("/");
    };
    const onClickTab = (tab: any) => {
      $router.push(tab.path);
    };

    return {
      headerData,
      countDownData,
      sideData,
      onClickLogo,
      onClickTab,
    };
  },
});
</script>

<style scoped lang="less">
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
    display: flex;
    flex-direction: row;
    height: calc(100vh - 60px);
    padding: 60px 0 0;
    box-sizing: border-box;
  }
  .m-side {
    width: 200px;
    height: 100%;
    overflow-y: scroll;
    box-shadow: 2px 0 5px rgb(197 217 232 / 50%);
  }
  .m-content {
    flex: 1;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
<style lang="less">
.ht-md-demo {
  .button-demo {
    .ht-button {
      margin: 0 10px 20px;
    }
  }
  .icon-demo {
    .ht-icon {
      margin: 0 0 10px;
    }
    &-1 .ht-icon {
      display: inline-block;
      margin: 0 30px 0 0;
    }
  }
  .ht-input,
  .ht-select {
    width: 350px;
  }
  .ht-pager {
    .ht-input,
    .ht-select {
      width: auto;
    }
  }
}
</style>
