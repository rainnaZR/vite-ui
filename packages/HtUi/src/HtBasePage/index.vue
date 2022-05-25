<template>
  <div class="ht-base-page">
    <component
      v-for="(module, index) in data.moduleList"
      :ref="`${module.moduleName}-${index}`"
      :key="index"
      :is="module.moduleName"
      v-bind="module"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted } from "vue";
import { BasePageData } from "./types";

// 动态页面配置组件。
export default defineComponent({
  name: "HtBasePage",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<BasePageData>,
      required: true,
      default: () => ({
        moduleList: [],
      }),
    },
  },

  setup() {
    onMounted(() => {
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 50);
    });
  },
});
</script>
