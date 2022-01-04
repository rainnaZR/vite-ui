<template>
  <!-- 文档页 -->
  <div class="g-page f-lt2">
    <!-- 头部 -->
    <div class="m-header">
      <ht-header
        :data="headerData"
        @on-click:logo="onLogoClick"
        @on-click:tab="onTabClick"
      />
    </div>

    <!-- 主体 -->
    <div class="m-main">
      <!-- 边栏 -->
      <div class="m-side">
        <ht-sidebar />
      </div>

      <!-- 正文 -->
      <div class="m-content">
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
    const $router = useRouter();
    const onLogoClick = () => {
      $router.push("/");
    };
    const onTabClick = (tab: any) => {
      $router.push(tab.path);
    };

    return {
      headerData,
      onLogoClick,
      onTabClick,
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
  .m-content{
    flex: 1;
  }
}
</style>
