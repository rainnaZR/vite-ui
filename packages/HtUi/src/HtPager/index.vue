<template>
  <div
    :class="[
      'ht-pager',
      {
        'ht-pager-disabled': data.disabled,
      },
    ]"
    :style="data.wrapStyle"
  >
    <div v-for="layout in layoutList" :key="layout" class="f-mr10">
      <div v-if="layout === 'total'" class="total">
        <!-- 总数显示插槽 -->
        <slot name="total" :scope="{ total: data.total }">
          共{{ data.total }}条
        </slot>
      </div>

      <ht-button
        v-if="layout === 'prev'"
        :key="layout"
        :data="{
          type: 'text',
          size: 'small',
          buttonStyle: { color: '#303133' },
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

      <ul v-if="layout === 'pager'" class="list f-df f-unselect">
        <li
          v-for="(item, index) in pager"
          :key="item"
          :class="[
            'item',
            `item-${item.type}`,
            'f-tac',
            'f-curp',
            { 'item-active f-curd': item.value === currentPageIndex },
          ]"
          :style="
            item.value === currentPageIndex
              ? data.activePagerItemStyle
              : data.pagerItemStyle
          "
          @click="onGoPage(item)"
        >
          <span v-if="item.type === 'pageNumber'">
            <!-- 数字页码插槽 -->
            <slot name="pageNumber" :scope="{ pager, index }">
              {{ item.value }}
            </slot>
          </span>
          <ht-icon
            v-if="['pagePrev', 'pageNext'].includes(item.type)"
            class="f-jcc"
            :data="{ name: pagerIconName }"
            @mouseover="onChangePagerIcon(item.type, 'mouseover')"
            @mouseleave="onChangePagerIcon(item.type, 'mouseleave')"
          />
        </li>
      </ul>

      <ht-button
        v-if="layout === 'next'"
        :data="{
          type: 'text',
          size: 'small',
          buttonStyle: { color: '#303133' },
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

      <ht-select
        v-if="layout === 'sizes'"
        v-model:modelValue="currentPageSize"
        :data="{
          options: pageSizeOptions,
          inputStyle: {
            width: '100px',
            height: '28px',
            textAlign: 'center',
            ...(data.sizesSelectStyle || {}),
          },
          optionsStyle: {
            lineHeight: '34px',
          },
        }"
        @on-change="onChangePageSize"
      />

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
              ...(data.jumperInputStyle || {}),
            },
          }"
          @on-blur="onInputBlur"
          @on-change="onInputBlur"
        />
        <span class="f-ml5">页</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import HtButton from "../HtButton";
import HtIcon from "../HtIcon";
import HtSelect from "../HtSelect";
import HtInput from "../HtInput";
import { PagerData } from "./types";

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
      required: false,
    },
  },

  emits: [
    "update:pageIndex",
    "update:pageSize",
    "on-page-change",
    "on-size-change",
  ],

  setup(props, { emit }) {
    const propsData = computed<PagerData>(() => ({
      total: 0,
      pageSizes: [10, 20, 30, 50, 100],
      layout: "total, prev, pager, next, sizes, jumper",
      pageShowLimit: 7,
      ...(props.data || {}),
    }));
    // 当前页码
    const currentPageIndex = ref(props.pageIndex || 1);
    // 当前每页数量
    const currentPageSize = ref(props.pageSize || propsData.value.pageSizes[0]);
    // 翻页icon名
    const pagerIconName = ref("u-icon-more");
    // 跳转输入框值
    const inputPageValue = ref(1);
    // 布局
    const layoutList = computed(() =>
      propsData.value?.layout
        ?.split(",")
        ?.map((v) => v.trim())
        ?.filter((i) => !!i)
    );
    // 分页选项
    const pageSizeOptions = computed(() =>
      propsData.value?.pageSizes?.map((value) => ({
        label: `${value}条/页`,
        value,
      }))
    );
    // 总页数
    const pageCount = computed(() =>
      Math.ceil(~~propsData.value.total / ~~currentPageSize.value)
    );

    // 当前页码
    // const current = computed({
    //   get() {
    //     return currentPageIndex.value;
    //   },
    //   set(value: number) {
    //     value = value || 1;
    //     /**
    //      * 更新分页页码
    //      * @param {Number} value 当前页码
    //      */
    //     emit("update:pageIndex", value);
    //     currentPageIndex.value = value;
    //     inputPageValue.value = value;
    //   },
    // });

    // 每页数量
    // const size = computed({
    //   get() {
    //     return currentPageSize.value;
    //   },
    //   set(value: number) {
    //     value = value || propsData.value.pageSizes[0];
    //     /**
    //      * 更新每页数量
    //      * @param {Number} val 当前分页数量
    //      */
    //     emit("update:pageSize", value);
    //     currentPageSize.value = value;
    //   },
    // });

    // 渲染分页对象
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
      const centerNum = Math.ceil((pageShowLimit + 1) / 2);
      const centerValue = Math.floor(centerNum / 2);
      const center: any[] = new Array(centerNum + 1)
        .fill(undefined)
        .map((value, index) => {
          if (currentPageIndex.value < centerNum + 1)
            return centerValue + index;
          if (currentPageIndex.value > pageCount.value - centerNum)
            return pageCount.value - centerNum - 1 + index;
          return currentPageIndex.value + index - centerValue;
        })
        .map((value) => ({
          type: "pageNumber",
          value,
        }));

      // 判断添加快速跳转按钮
      if (currentPageIndex.value >= centerNum + 1) {
        center.unshift({
          type: "pagePrev",
          value: "",
        });
      }
      if (currentPageIndex.value <= pageCount.value - centerNum) {
        center.push({
          type: "pageNext",
          value: "",
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
     * 点击分页项
     * @param {Object} item 点击的分页信息（类型：分页或快进快退；值：第几页）
     */
    const onGoPage = (item) => {
      if (item.type === "pageNumber" && currentPageIndex.value === item.value)
        return;
      const { pageShowLimit } = propsData.value;
      const centerNum = Math.ceil((pageShowLimit + 1) / 2) + 1;
      const value =
        item.type === "pageNumber"
          ? item.value
          : item.type === "pagePrev"
          ? Math.max(1, currentPageIndex.value - centerNum)
          : item.type === "pageNext"
          ? Math.min(currentPageIndex.value + centerNum, pageCount.value)
          : 0;
      currentPageIndex.value = value;

      /**
       * 更新分页
       * @param {Number} value 当前分页页数
       */
      emit("on-page-change", value);
    };

    /**
     * 点击上一页
     */
    const onGoPrev = () => {
      if (currentPageIndex.value <= 1) return;
      currentPageIndex.value -= 1;

      /**
       * 更新分页
       * @param {Number} num 当前分页页数
       */
      emit("on-page-change", currentPageIndex.value);
    };

    /**
     * 点击下一页
     */
    const onGoNext = () => {
      if (currentPageIndex.value >= pageCount.value) return;
      currentPageIndex.value += 1;

      /**
       * 更新分页
       * @param {Number} num 当前分页页数
       */
      emit("on-page-change", currentPageIndex.value);
    };

    const onChangePagerIcon = (type?: string, eventType?: string) => {
      pagerIconName.value =
        eventType === "mouseleave"
          ? "u-icon-more"
          : type === "pagePrev"
          ? "u-icon-arrowsLeft"
          : "u-icon-arrowsRight";
    };

    /**
     * 切换分页大小
     * @param {Number} value 选择的分页大小值
     */
    const onChangePageSize = (value) => {
      currentPageSize.value = value;
      /**
       * 改变分页大小
       * @param {Number} value 分页大小
       */
      emit("on-size-change", value);
    };

    /**
     * 跳转控件失去焦点事件
     */
    const onInputBlur = () => {
      const value =
        Math.min(inputPageValue.value, pageCount.value) &&
        Math.max(1, inputPageValue.value);
      inputPageValue.value = value;
      currentPageIndex.value = value;
    };

    return {
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
      onInputBlur,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
