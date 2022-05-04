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
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowsLeft',
                    style: 'color: #444',
                  }"
                />
                <ht-button
                  aria-label="上一月"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowLeft',
                    style: 'margin: 0;color: #444',
                  }"
                />
                <div class="f-f1">
                  <span>{{ yearLabel }}</span>
                  <span>{{ monthLabel }}</span>
                </div>
                <ht-button
                  aria-label="下一年"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowsRight',
                    style: 'color: #444',
                  }"
                />
                <ht-button
                  aria-label="下一月"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowRight',
                    style: 'margin: 0;color: #444',
                  }"
                />
              </div>
              <div class="table f-mt5">
                <date-table
                  v-if="currentView === 'date'"
                  :date="innerDate"
                  :range-state="rangeState"
                  :min-date="minDate"
                  :max-date="maxDate"
                  :selection-mode="selectionMode"
                  :parsed-value="parsedValue"
                  :disabled-date="disabledDate"
                  @on-click="onDateClick"
                />
                <month-table
                  v-if="currentView === 'month'"
                  :date="innerDate"
                  @on-click="onMonthClick"
                />
                <year-table
                  v-if="currentView === 'year'"
                  :date="innerDate"
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
import dayjs from "dayjs";
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
    const innerDate = ref(dayjs().locale("zh-cn"));
    const rangeState = ref({
      endDate: null,
      selecting: false,
    });
    const minDate = ref(null);
    const maxDate = ref(null);
    const selectionMode = ref("day");
    const parsedValue = ref(null);
    const disabledDate = ref(null);

    const onDateClick = (value: Dayjs) => {
      if (selectionMode.value === "day") {
        let newDate = props.parsedValue
          ? (props.parsedValue as Dayjs)
              .year(value.year())
              .month(value.month())
              .date(value.date())
          : value;
        // change default time while out of selectableRange
        if (!checkDateWithinRange(newDate)) {
          newDate = (selectableRange.value[0][0] as Dayjs)
            .year(value.year())
            .month(value.month())
            .date(value.date());
        }
        innerDate.value = newDate;
        emit(newDate, showTime.value);
      } else if (selectionMode.value === "week") {
        emit(value.date);
      } else if (selectionMode.value === "dates") {
        emit(value, true); // set false to keep panel open
      }
    };

    const yearLabel = "2022年";
    const monthLabel = "12月";
    const currentView = ref("date");

    return {
      form,
      inputVal,
      isFocus,
      disabled,
      innerDate,
      rangeState,
      minDate,
      maxDate,
      selectionMode,
      parsedValue,
      disabledDate,
      onDateClick,

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
