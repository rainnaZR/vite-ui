<template>
  <div
    v-if="!hidePager && data.total > 0"
    class="ht-pager"
    :style="data.wrapStyle"
  >
    <div v-for="layout in layoutList" :key="layout" class="f-mr10">
      <!-- 总数模块 -->
      <div v-if="layout === 'total'" class="total">
        <!-- 总数显示插槽 -->
        <slot name="total" :scope="{ total: data.total }">
          共{{ data.total }}条
        </slot>
      </div>

      <!-- 上一页按钮模块 -->
      <ht-button
        v-if="layout === 'prev'"
        :key="layout"
        :data="{
          type: 'text',
          size: 'small',
          style: {
            color: '#303133',
            ...(data.pagerItemStyle || {}),
          },
          ...(data.buttonConfigData || {}),
          disabled: currentPageIndex <= 1,
        }"
        @click="onGoPrev"
      >
        <!-- 上一页按钮插槽 -->
        <slot name="prev" :scope="{ currentPageIndex }">
          <ht-icon :data="{ name: 'u-icon-arrowLeft' }" />
        </slot>
      </ht-button>

      <!-- 页码模块 -->
      <div v-if="layout === 'pager'" class="list f-df f-unselect">
        <div
          v-for="item in pager"
          :key="item"
          :class="[
            'item',
            `item-${item.type}`,
            'f-ml5',
            'f-mr5',
            'f-tac',
            'f-curp',
            { 'item-active f-curd': item.value === currentPageIndex },
            'f-trans',
          ]"
          :style="
            item.value === currentPageIndex
              ? {
                  ...(data.pagerItemStyle || {}),
                  ...(data.activePagerItemStyle || {}),
                }
              : data.pagerItemStyle
          "
          @click="onGoPage(item)"
        >
          <span v-if="item.type === 'pageNumber'">
            <!-- 数字页码插槽 -->
            <slot name="pageNumber" :scope="{ value: item.value }">
              {{ item.value }}
            </slot>
          </span>
          <ht-icon
            v-if="['pagePrev', 'pageNext'].includes(item.type)"
            class="f-jcc"
            :data="{ name: pagerIconName[item.type] }"
            @mouseover="onChangePagerIcon(item.type, 'mouseover')"
            @mouseleave="onChangePagerIcon(item.type, 'mouseleave')"
          />
        </div>
      </div>

      <!-- 下一页按钮模块 -->
      <ht-button
        v-if="layout === 'next'"
        :data="{
          type: 'text',
          size: 'small',
          style: {
            color: '#303133',
            ...(data.pagerItemStyle || {}),
          },
          ...(data.buttonConfigData || {}),
          disabled: currentPageIndex >= pageCount,
        }"
        @click="onGoNext"
      >
        <!-- 下一页按钮插槽 -->
        <slot name="next" :scope="{ currentPageIndex }">
          <ht-icon :data="{ name: 'u-icon-arrowRight' }" />
        </slot>
      </ht-button>

      <!-- 每页数量下拉模块 -->
      <ht-select
        v-if="layout === 'sizes'"
        v-model:modelValue="currentPageSize"
        :data="{
          options: pageSizeOptions,
          optionsPosition: data.sizeOptionsPosition,
          inputStyle: {
            width: '105px',
            height: '28px',
            textAlign: 'center',
          },
          optionsStyle: {
            lineHeight: '34px',
          },
          borderColor: data.sizeBorderColor,
        }"
        @on-change="onChangePageSize"
      />

      <!-- 页码输入模块 -->
      <div v-if="layout === 'jumper'" class="jumper f-df f-aic">
        <span class="f-mr5">前往</span>
        <ht-input
          v-model:modelValue="inputPageValue"
          :data="{
            type: 'number',
            placeholder: '1',
            inputStyle: {
              width: '50px',
              height: '28px',
              textAlign: 'center',
            },
            borderColor: data.inputBorderColor,
          }"
          @on-blur="onValidInput"
          @on-change="onValidInput"
        />
        <span class="f-ml5">页</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, reactive, ref, watch } from "vue";
import HtButton from "../HtButton";
import HtIcon from "../HtIcon";
import HtSelect from "../HtSelect";
import HtInput from "../HtInput";
import { PagerData, PagerItem } from "./types";

// 翻页组件，用于列表的数据分页处理。
export default defineComponent({
  name: "HtPager",

  components: {
    HtButton,
    HtIcon,
    HtSelect,
    HtInput,
  },

  props: {
    // 当前页码
    pageIndex: {
      type: Number,
      required: false,
      default: 1,
    },
    // 每页数量
    pageSize: {
      type: Number,
      required: false,
      default: 10,
    },
    // 配置数据
    data: {
      type: Object as PropType<PagerData>,
      required: true,
    },
  },

  emits: [
    "update:pageIndex",
    "update:pageSize",
    "on-page-change",
    "on-size-change",
  ],

  setup(props, { emit }) {
    const propsData = computed(() => ({
      pageSizes: [10, 20, 30, 50, 100],
      layout: "total, prev, pager, next, sizes, jumper",
      pageShowLimit: 7,
      ...(props.data || {}),
    }));
    // 初始化时且开启hideSinglePage时 隐藏分页
    const hidePager = computed(() => {
      return (
        propsData.value.total <= propsData.value.pageSizes[0] &&
        propsData.value.hideSinglePage
      );
    });
    // 当前页码
    const currentPageIndex = ref(~~props.pageIndex || 1);
    // 当前每页数量
    const currentPageSize = ref(props.pageSize || propsData.value.pageSizes[0]);
    // 翻页icon名
    const pagerIconName = reactive({
      pagePrev: "u-icon-more",
      pageNext: "u-icon-more",
    });
    // 输入框页码值
    const inputPageValue = ref(1);
    // 模块布局
    const layoutList = computed(() =>
      propsData.value.layout
        ?.split(",")
        ?.map((v) => v.trim())
        ?.filter((i) => !!i)
    );
    // 分页下拉选项
    const pageSizeOptions = computed(() =>
      propsData.value.pageSizes?.map((value) => ({
        label: `${value}条/页`,
        value,
      }))
    );
    // 总页数
    const pageCount = computed(() =>
      Math.ceil(~~propsData.value.total / ~~currentPageSize.value)
    );

    // 渲染分页页码对象
    const pager = computed(() => {
      const { pageShowLimit } = propsData.value;
      // 如果总页数小于指定页码数量限制pageShowLimit（默认是7）
      if (pageCount.value <= pageShowLimit) {
        return new Array(pageCount.value)
          .fill(undefined)
          .map((item, index) => ({
            type: "pageNumber",
            value: index + 1,
          }));
      }
      // 如果总页数大于指定页码数量限制pageShowLimit（默认是7）
      // 除去首尾页码，剩余显示页码数量为 pageShowLimit-2
      const count = pageShowLimit - 2;
      // 页码显示均分，每侧显示的数量
      const symmetryCount = Math.ceil((count - 1) / 2);
      // 中间页码值
      const center: any[] = new Array(count)
        .fill(undefined)
        .map((value, index) => {
          // 如果当前页码为首页，则顺移显示下一页
          if (currentPageIndex.value === 1)
            return currentPageIndex.value + index + 1;
          // 如果当前页码与中轴数量首部无缝衔接时
          if (currentPageIndex.value < symmetryCount + 2) return 2 + index;
          // 如果当前页码与中轴数量尾部无缝衔接时
          if (currentPageIndex.value > pageCount.value - count)
            return pageCount.value - count + index;
          return currentPageIndex.value - symmetryCount + index;
        })
        .map((value) => ({
          type: "pageNumber",
          value,
        }));
      // 判断添加快速跳转按钮
      if (
        currentPageIndex.value > 2 &&
        currentPageIndex.value > symmetryCount + 2
      ) {
        center.unshift({
          type: "pagePrev",
          value: -1,
        });
      }
      if (
        currentPageIndex.value < pageCount.value - 1 &&
        currentPageIndex.value <= pageCount.value - count
      ) {
        center.push({
          type: "pageNext",
          value: -1,
        });
      }
      return [
        {
          type: "pageNumber",
          value: 1,
        },
        ...center,
        {
          type: "pageNumber",
          value: pageCount.value,
        },
      ];
    });

    /**
     * 点击页码值
     * @param {Object} item 当前点击的分页信息（类型：页码/快进/快退；值：第几页）
     * @returns void
     */
    const onGoPage = (item: PagerItem) => {
      if (item.type === "pageNumber" && currentPageIndex.value === item.value)
        return;
      const { pageShowLimit } = propsData.value;
      const count = pageShowLimit - 2;
      const value =
        item.type === "pageNumber"
          ? item.value
          : item.type === "pagePrev"
          ? Math.max(1, currentPageIndex.value - count)
          : item.type === "pageNext"
          ? Math.min(currentPageIndex.value + count, pageCount.value)
          : 0;
      currentPageIndex.value = value;
    };

    /**
     * 点击上一页
     */
    const onGoPrev = () => {
      if (currentPageIndex.value <= 1) return;
      currentPageIndex.value -= 1;
    };

    /**
     * 点击下一页
     */
    const onGoNext = () => {
      if (currentPageIndex.value >= pageCount.value) return;
      currentPageIndex.value += 1;
    };

    /**
     * 获取快速翻页icon名称
     * @param {String} type 快速翻页类型，值为前进翻页/后退翻页
     * @param {String} eventType 事件名称类型，值为鼠标hover或鼠标移出
     * @returns void
     */
    const onChangePagerIcon = (type: string, eventType: string) => {
      pagerIconName[type] =
        eventType === "mouseleave"
          ? "u-icon-more"
          : type === "pagePrev"
          ? "u-icon-arrowsLeft"
          : "u-icon-arrowsRight";
    };

    /**
     * 切换分页器每页的数量
     * @param {Number} value 选择的分页大小值
     * @returns void
     */
    const onChangePageSize = (value: number) => {
      currentPageSize.value = value;
    };

    /**
     * 输入框页码值做校验
     * @returns void
     */
    const onValidInput = () => {
      let value = Math.min(inputPageValue.value, pageCount.value);
      value = Math.max(1, value);
      currentPageIndex.value = value;
      inputPageValue.value = value;
    };

    watch(
      () => props.pageIndex,
      (value) => {
        currentPageIndex.value = value;
      },
      {
        immediate: true,
      }
    );

    watch(currentPageIndex, (value) => {
      inputPageValue.value = value;
      /**
       * 页码索引值更新
       * @param {Number} value 当前页码值
       */
      emit("update:pageIndex", value);

      /**
       * 页码更新事件触发
       * @param {Number} value 当前页码值
       */
      emit("on-page-change", value);
    });

    watch(
      () => props.pageSize,
      (value) => {
        currentPageSize.value = value;
      }
    );

    watch(currentPageSize, (value) => {
      /**
       * 每页数量值更新
       * @param {Number} value 页面大小值
       */
      emit("update:pageSize", value);

      /**
       * 分页器每页的数量更新事件触发
       * @param {Number} value 分页大小值
       */
      emit("on-size-change", value);
    });

    return {
      hidePager,
      currentPageIndex,
      currentPageSize,
      pagerIconName,
      inputPageValue,
      layoutList,
      pageSizeOptions,
      pageCount,
      pager,
      onGoPage,
      onGoPrev,
      onGoNext,
      onChangePagerIcon,
      onChangePageSize,
      onValidInput,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
