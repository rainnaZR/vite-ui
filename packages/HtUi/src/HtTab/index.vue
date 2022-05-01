<template>
  <div :class="['ht-tab', `ht-tab-${data.direction || 'row'}`]">
    <div v-for="(tab, index) in tabList" :key="index">
      <div
        :class="[
          'content',
          {
            'content-curr': state.currentValue[0] == tab.value && spread,
          },
          'f-curp',
        ]"
        :style="onGetStyle(tab, 1)"
        @click="onTabClick(tab, [index])"
      >
        <!-- 左侧图标插槽 -->
        <slot name="icon" :scope="{ tab, index: [index] }">
          <ht-icon v-if="tab.icon" class="f-mr10" :data="{ name: tab.icon }" />
        </slot>
        <!-- 内容默认插槽 -->
        <slot :scope="{ tab, index: [index] }">
          <span class="label">{{ tab.label }}</span>
        </slot>
        <!-- 下拉子菜单 -->
        <ht-icon
          v-if="tab.children && tab.children.length"
          class="icon f-ml10 f-trans"
          :data="{ name: 'u-icon-arrowDown' }"
        />
      </div>

      <!-- 子菜单列表 -->
      <div
        v-if="tab.children && tab.children.length"
        class="children f-trans f-oh"
        :style="{
          height:
            state.currentValue[0] == tab.value && spread
              ? `${tab.children.length * itemHeight}px`
              : '0px',
        }"
      >
        <div
          v-for="(child, childIndex) in tab.children"
          v-bind:key="`${index}-${childIndex}`"
          :class="[
            'child',
            {
              'child-curr':
                state.currentValue[1] && state.currentValue[1] === child.value,
            },
            'f-curp',
          ]"
          :style="onGetStyle(child, 2)"
          @click="onTabClick(child, [index, childIndex])"
        >
          <!-- 二级tab左侧图标插槽 -->
          <slot name="icon" :scope="{ tab: child, index: [index, childIndex] }">
            <ht-icon
              v-if="child.icon"
              class="f-mr10"
              :data="{ name: child.icon }"
            />
          </slot>
          <!-- 二级tab内容默认插槽 -->
          <slot :scope="{ tab: child, index: [index, childIndex] }">
            <span class="label">{{ child.label }}</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, ref, computed } from "vue";
import HtIcon from "../HtIcon";
import { TabItem, TabData } from "./types";

// tab导航切换功能。
export default defineComponent({
  name: "HtTab",

  components: {
    HtIcon,
  },

  props: {
    // tab选中值
    modelValue: {
      type: [String, Number, Array],
      required: false,
      default: "",
    },
    // 配置数据
    data: {
      type: Object as PropType<TabData>,
      required: true,
      default: () => ({
        direction: "row",
        list: [],
      }),
    },
  },

  setup(props, { emit }) {
    const itemHeight = 48;
    const { modelValue } = props;
    const spread = ref(true);

    /**
     * 获取tab列表项
     * @param {Array} list 初始tab列表项
     * @returns {Array} list 过滤后的tab列表项
     */
    const onGetList = (list: TabItem[]) => {
      list = list?.filter((i) => !i.hide);
      list?.forEach((i) => {
        if (i.children?.length) i.children = onGetList(i.children);
      });
      return list;
    };

    const tabList = computed(() => onGetList(props.data.list));
    const state = reactive({
      currentValue: Array.isArray(modelValue) ? modelValue : [modelValue], // 当前选中值
    });

    /**
     * 获取tab样式
     * @param {Object} tab 当前tab对象
     * @param {Number} depth 当前点击的tab深度
     * @returns {String} tab样式
     */
    const onGetStyle = (tab: TabItem, depth: number) => {
      const { style, activeStyle } = props.data;
      const isCurrent = tab.value === state.currentValue?.[depth - 1];
      const currStyle = isCurrent ? activeStyle : style;
      return isCurrent && tab.children && depth === 1
        ? `${currStyle};background:none`
        : currStyle;
    };

    /**
     * tab点击方法
     * @param {Object} tab 当前点击的tab对象
     * @param {Array} indexArray 当前点击的tab索引值数组
     * @returns void
     */
    const onTabClick = (tab: TabItem, indexArray: number[]) => {
      const { currentValue } = state;
      const depth = indexArray.length;
      const value =
        depth === 1 && !tab.children
          ? [tab.value]
          : depth === 1 && tab.children
          ? tab.value === currentValue[0]
            ? [currentValue[0], currentValue[1]]
            : [tab.value, tab.children[0].value]
          : [currentValue[0], tab.value];
      depth === 1 &&
        (spread.value =
          tab.children && currentValue.includes(tab.value)
            ? !spread.value
            : true);
      state.currentValue = value;

      /**
       * 当前tab点击的value值更新
       * @param {Array} value 当前点击tab的value值数组
       */
      emit("update:modelValue", value.length === 1 ? value[0] : value);

      /**
       * tab事件点击触发
       * @param {Object} tab 当前点击的tab对象
       * @param {Array} indexArray 当前点击的tab索引值数组
       */
      emit("on-change", tab, indexArray);
    };

    watch(
      () => props.modelValue,
      (value) => {
        state.currentValue = Array.isArray(value) ? value : [value];
      }
    );

    return {
      itemHeight,
      tabList,
      state,
      spread,
      onGetStyle,
      onTabClick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
