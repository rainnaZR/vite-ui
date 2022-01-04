<template>
  <!-- 文档页 -->
  <div class="g-page f-lt2">
    <!-- 头部 -->
    <div class="m-header">
      <ht-header
        :data="headerData"
        @on-click:logo="onClickLogo"
        @on-click:tab="onClickTab"
      />
    </div>

    <!-- 主体 -->
    <div class="m-main">
      <!-- 边栏 -->
      <div class="m-side f-pd20">
        <ht-tab
          v-model:currentValue="tabData.currentValue"
          :data="tabData"
          @on-change="onClickTab"
        />
      </div>

      <!-- 正文 -->
      <div class="m-content f-pd20">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
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
      tabCurrentValue: "",
      tabColor: "#999",
      tabActiveColor: "#f60",
    });
    const tabData = reactive({
      direction: "column",
      list: [
        {
          value: "button",
          label: "按钮",
          path: "/doc/button",
        },
        {
          value: "icon",
          label: "icon",
          path: "/doc/icon",
        },
        {
          value: "introduce",
          label: "introduce",
          path: "/doc/introduce",
        },
      ],
      currentValue: "button",
      color: "#aaa",
      activeColor: "#f60",
    });
    const $router = useRouter();
    const onClickLogo = () => {
      $router.push("/");
    };
    const onClickTab = (tab: any) => {
      $router.push(tab.path);
    };

    return {
      headerData,
      tabData,
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
    min-height: 100vh;
    padding: 60px 0 0;
    box-sizing: border-box;
  }
  .m-side {
    width: 200px;
    box-shadow: 2px 0 5px rgb(197 217 232 / 50%);
  }
  .m-content {
    flex: 1;
  }
}
</style>
