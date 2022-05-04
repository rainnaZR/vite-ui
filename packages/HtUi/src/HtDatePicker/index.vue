<template>
  <div class="ht-date-picker f-unselect" :style="data.wrapStyle">
    <!-- 详情模式 -->
    <template v-if="data.showType == 'detail'">
      <div class="preview">{{ inputVal || data.defaultEmptyText }}</div>
    </template>
    <!-- 编辑模式 -->
    <template v-else>
      <ht-popover :data="{ trigger: 'click' }">
        <ht-input
          v-model:modelValue="inputVal"
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
              <div v-show="currentView !== 'time'" class="header f-flexr">
                <ht-button
                  aria-label="上一年"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowsLeft',
                    style: 'color: #444',
                  }"
                  @on-click="onPrevYear"
                />
                <ht-button
                  v-show="currentView === 'date'"
                  aria-label="上一月"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowLeft',
                    style: 'margin: 0;color: #444',
                  }"
                  @on-click="onPrevMonth"
                />
                <div class="f-f1">
                  <span @click="onShowYearPicker">{{ yearLabel }}</span>
                  <span
                    v-show="currentView === 'date'"
                    class="f-ml5"
                    :class="{ active: currentView === 'month' }"
                    @click="onShowMonthPicker"
                  >
                    {{ month + 1 }}月
                  </span>
                </div>
                <ht-button
                  aria-label="下一月"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowsRight',
                    style: 'color: #444',
                  }"
                  @on-click="onNextMonth"
                />
                <ht-button
                  v-show="currentView === 'date'"
                  aria-label="下一年"
                  :data="{
                    type: 'text',
                    icon: 'u-icon-arrowRight',
                    style: 'margin: 0;color: #444',
                  }"
                  @on-click="onNextYear"
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
                  @on-pick="onDateClick"
                />
                <month-table
                  v-if="currentView === 'month'"
                  :date="innerDate"
                  @on-pick="onMonthClick"
                />
                <year-table
                  v-if="currentView === 'year'"
                  :date="innerDate"
                  @on-pick="onYearClick"
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
import { defineComponent, PropType, inject, ref, computed } from "vue";
import dayjs from "dayjs";
import type { ConfigType, Dayjs } from "dayjs";
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
    const extractDateFormat = (format?: string) =>
      format
        ?.replace(/\W?m{1,2}|\W?ZZ/g, "")
        ?.replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "")
        ?.trim();
    const dateFormat = computed(() => {
      return extractDateFormat(props.data?.format);
    });
    const inputVal = ref<string | number | undefined | null>();
    const onInitInputVal = () => {
      if (props.modelValue) return props.modelValue;
      if (!props.data.parsedValue && !props.data.disabledDate) return;
      return ((props.data.parsedValue || innerDate.value) as Dayjs).format(
        dateFormat.value
      );
    };
    inputVal.value = onInitInputVal();
    const disabled = props.data.disabled || form?.data.disabled;
    const lang = ref("zh-cn");
    const currentView = ref("date");
    const innerDate = ref(dayjs().locale(lang.value));
    const year = computed(() => {
      return innerDate.value.year();
    });
    const yearLabel = computed(() => {
      if (currentView.value === "year") {
        const startYear = Math.floor(year.value / 10) * 10;
        return `${startYear} - ${startYear + 9}年`;
      }
      return `${year.value} 年`;
    });
    const month = computed(() => {
      return innerDate.value.month();
    });
    const rangeState = ref({
      endDate: null,
      selecting: false,
    });
    const minDate = ref(null);
    const maxDate = ref(null);
    const selectionMode = computed(() => {
      if (["week", "month", "year", "dates"].includes(props.data.mode)) {
        return props.data.mode;
      }
      return "day";
    });

    const parsedValue = ref(props.data?.parsedValue);
    const disabledDate = computed(() => props.data?.disabledDate);

    const onPanelChange = (mode: "month" | "year") => {
      emit(
        "on-panel-change",
        innerDate.value.toDate(),
        mode,
        currentView.value
      );
    };
    const onPrevYear = () => {
      if (currentView.value === "year") {
        innerDate.value = innerDate.value.subtract(10, "year");
      } else {
        innerDate.value = innerDate.value.subtract(1, "year");
      }
      onPanelChange("year");
    };
    const onPrevMonth = () => {
      innerDate.value = innerDate.value.subtract(1, "month");
      onPanelChange("month");
    };
    const onNextMonth = () => {
      innerDate.value = innerDate.value.add(1, "month");
      onPanelChange("month");
    };
    const onNextYear = () => {
      if (currentView.value === "year") {
        innerDate.value = innerDate.value.add(10, "year");
      } else {
        innerDate.value = innerDate.value.add(1, "year");
      }
      onPanelChange("year");
    };

    const onShowYearPicker = () => {
      // todo: 后续补充
      // currentView.value = "year";
    };
    const onShowMonthPicker = () => {
      // todo: 后续补充
      // currentView.value = "month";
    };
    const selectableRange = ref([]);
    // eslint-disable-next-line no-unused-vars
    const timeWithinRange = (_: ConfigType, __: any, ___: string) => true;
    const checkDateWithinRange = (date: ConfigType) => {
      return selectableRange.value.length > 0
        ? timeWithinRange(
            date,
            selectableRange.value,
            props.data.format || "HH:mm:ss"
          )
        : true;
    };
    const showTime = computed(
      () =>
        props.data.type === "dateTime" || props.data.type === "dateTimeRange"
    );
    const onFormatEmit = (emitDayjs: Dayjs) => {
      if (showTime.value) return emitDayjs.millisecond(0);
      return emitDayjs.startOf("day");
    };
    const onEmit = (value: Dayjs, ...args: any) => {
      if (!value) {
        emit("on-pick", value, ...args);
      } else if (Array.isArray(value)) {
        const dates = value.map(onFormatEmit);
        emit("on-pick", dates, ...args);
      } else {
        emit("on-pick", onFormatEmit(value), ...args);
      }
      inputVal.value = null;
    };
    const onDateClick = (value: Dayjs) => {
      if (selectionMode.value === "day") {
        let newDate = parsedValue
          ? (parsedValue as Dayjs)
              .year(value.year())
              .month(value.month())
              .date(value.date())
          : value;
        if (!checkDateWithinRange(newDate)) {
          newDate = (selectableRange.value[0][0] as Dayjs)
            .year(value.year())
            .month(value.month())
            .date(value.date());
        }
        innerDate.value = newDate;
        onEmit(newDate, showTime.value);
      } else if (selectionMode.value === "week") {
        onEmit(value.date);
      } else if (selectionMode.value === "dates") {
        onEmit(value, true);
      }
    };
    const onMonthPick = (month: any) => {
      innerDate.value = innerDate.value.startOf("month").month(month);
      if (selectionMode.value === "month") {
        onEmit(innerDate.value);
      } else {
        currentView.value = "date";
      }
      onPanelChange("month");
    };

    const onYearPick = (year: any) => {
      if (selectionMode.value === "year") {
        innerDate.value = innerDate.value.startOf("year").year(year);
        onEmit(innerDate.value);
      } else {
        innerDate.value = innerDate.value.year(year);
        currentView.value = "month";
      }
      onPanelChange("year");
    };

    return {
      form,
      inputVal,
      disabled,
      lang,
      currentView,
      innerDate,
      yearLabel,
      month,
      rangeState,
      minDate,
      maxDate,
      selectionMode,
      parsedValue,
      disabledDate,
      onPrevYear,
      onPrevMonth,
      onNextMonth,
      onNextYear,
      onShowYearPicker,
      onShowMonthPicker,
      onDateClick,
      onMonthPick,
      onYearPick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
