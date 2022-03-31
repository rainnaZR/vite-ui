<template>
  <div v-if="data.list" class="ht-action" ref="actionRef">
    <div
      v-for="(action, index) in data.list.slice(0, showMoreIndex)"
      :key="index"
      :class="[
        'item',
        'item-1',
        { 'item-noline': data.hideLine },
        'f-curp',
        'f-trans',
      ]"
      @click="onAction(action, index)"
    >
      <!-- 行动点按钮插槽 -->
      <slot name="button" :detail="action">{{ action.content }}</slot>
    </div>

    <ht-popover
      v-if="showMoreIndex < data.list.length"
      :data="{ width: 'auto' }"
    >
      <div :class="`${data.hideLine ? 'f-ml10' : 'f-ml5'} f-curp`">
        <!-- 更多下拉按钮插槽 -->
        <slot name="more">
          <ht-icon
            :data="{ name: 'u-icon-arrowsBottom', style: 'font-size:12px' }"
          />
        </slot>
      </div>
      <template #popover>
        <div
          v-for="(action, index) in data.list.slice(showMoreIndex)"
          :key="index"
          class="item item-2 f-curp f-trans"
          @click="onAction(action, index)"
        >
          {{ action.content }}
        </div>
      </template>
    </ht-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, onMounted, nextTick } from "vue";
import { dom } from "@htfed/utils";
import { ActionData, ActionItem } from "./types";

// 行动点按钮集合，常用于表格的操作项。
export default defineComponent({
  name: "HtAction",

  props: {
    // 配置数据
    data: {
      type: Object as PropType<ActionData>,
      required: true,
      default: () => ({
        list: [],
      }),
    },
  },

  setup(props, { emit }) {
    const actionRef = ref<HTMLDivElement>();
    const showMoreIndex = ref(props.data?.list?.length);
    const buttonMargin = 10;

    /**
     * 行动点点击
     * @param {Object} action 点击的按钮数据
     * @param {Number} index 点击的按钮索引
     * @returns void
     */
    const onAction = (action: ActionItem, index: number) => {
      /**
       * 行动点点击事件触发
       * @param {Object} action 点击的按钮数据
       * @param {Number} index 点击的按钮索引
       */
      emit("on-action", action, index);
    };

    onMounted(() => {
      nextTick(() => {
        const wrapWidth = dom.getClientWidth(actionRef.value);
        const nodes = actionRef.value?.children;
        if (!nodes || !nodes.length) return;

        const { length } = nodes;
        const marginWidth = props.data.hideLine
          ? (buttonMargin / 2) * 2
          : buttonMargin * 2;
        let showWidth = 0;
        for (let i = 0; i < length; i++) {
          const nodeWidth = dom.getClientWidth(nodes[i]);
          showWidth += ~~(nodeWidth + marginWidth);
          if (showWidth >= wrapWidth) {
            showMoreIndex.value = i;
            break;
          }
        }
      });
    });

    return { actionRef, showMoreIndex, onAction };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
