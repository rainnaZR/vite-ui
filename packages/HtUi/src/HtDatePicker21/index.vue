<template>
  <div class="ht-date-picker" :style="data.wrapStyle">
    <!-- 详情模式 -->
    <template v-if="data.showType == 'detail'">
      <div class="preview">{{ inputVal || data.defaultEmptyText }}</div>
    </template>
    <!-- 编辑模式 -->
    <template v-else>
      <ht-popover :data="{ trigger: 'click' }">
        <ht-input
          :data="{
            prefixIcon: 'u-icon-calendar',
            clearable: true,
            disabled,
          }"
        />
        <template #popover>
          <!-- 日期范围 -->
          <template v-if="data.type == 'dateRange'"> </template>
          <!-- 日期时间范围 -->
          <template v-else-if="data.type == 'dateTimeRange'"> </template>
          <!-- 月范围 -->
          <template v-else-if="data.type == 'monthRange'"> </template>
          <!-- 日期选择（默认） -->
          <template v-else>
            <div class="calendar">
              <div class="header f-flexr">
                <ht-button
                  aria-label="上一年"
                  :data="{ type: 'text', icon: 'u-icon-arrowsLeft' }"
                />
                <ht-button
                  aria-label="上一月"
                  :data="{ type: 'text', icon: 'u-icon-arrowLeft' }"
                />
                <div class="f-f1">
                  <span>{{ yearLabel }}</span>
                  <span>{{ monthLabel }}</span>
                </div>
                <ht-button
                  aria-label="下一年"
                  :data="{ type: 'text', icon: 'u-icon-arrowsRight' }"
                />
                <ht-button
                  aria-label="下一月"
                  :data="{ type: 'text', icon: 'u-icon-arrowRight' }"
                />
              </div>
              <div class="table f-mt10">
                <date-table
                  v-if="currentView === 'date'"
                  @on-click="onDateClick"
                />
                <month-table
                  v-if="currentView === 'month'"
                  @on-click="onMonthClick"
                />
                <year-table
                  v-if="currentView === 'year'"
                  @on-click="onYearClick"
                />
              </div>
            </div>
          </template>
        </template>
      </ht-popover>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject, ref } from "vue";
import HtPopover from "../HtPopover";
import HtInput from "../HtInput";
import HtButton from "../HtButton";
import DateTable from "./date-table.vue";
import MonthTable from "./month-table.vue";
import YearTable from "./year-table.vue";
import { DatePickerData } from "./types";
import { FormContext, formKey } from "../HtForm/types";

// 表单中的日期选择组件
export default defineComponent({
  name: "HtDatePicker",

  components: {
    HtPopover,
    HtInput,
    HtButton,
    DateTable,
    MonthTable,
    YearTable,
  },

  props: {
    // 日期下拉框中的值
    modelValue: {
      type: [String, Number],
      required: true,
      default: "",
    },
    // 配置数据
    data: {
      type: Object as PropType<DatePickerData>,
      required: true,
      default: () => ({}),
    },
  },

  setup(props, { emit }) {
    const form: FormContext | undefined = inject(formKey);
    const inputVal = ref<string | number>(""); // 输入框值
    const isFocus = ref(false); // 是否聚焦
    const disabled = props.data.disabled || form?.data.disabled;

    const yearLabel = "2022年";
    const monthLabel = "12月";
    const currentView = ref("date");

    return {
      form,
      inputVal,
      isFocus,
      disabled,
      yearLabel,
      monthLabel,
      currentView,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
