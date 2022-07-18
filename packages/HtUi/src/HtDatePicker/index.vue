<template>
  <div
    :class="`ht-date-picker ht-date-picker-${
      form?.data?.size || 'normal'
    } f-unselect`"
    :style="data.wrapStyle"
  >
    <!-- 详情模式 -->
    <template v-if="data.showType == 'detail'">
      <div class="preview">{{ inputVal || data.defaultEmptyText }}</div>
    </template>
    <!-- 编辑模式 -->
    <template v-else>
      <ht-popover ref="popoverRef" :data="{ trigger: 'click' }">
        <ht-input
          v-model:modelValue="inputVal"
          :data="{
            prefixIcon: data.prefixIcon || 'u-icon-calendar',
            disabled,
            readonly: data.readonly,
            placeholder: data.placeholder || '请选择',
            clearable: true,
            name: data.name,
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
            <div class="calendar f-tac">
              <div v-show="currentView !== 'time'" class="header f-flexr">
                <ht-icon
                  aria-label="上一年"
                  class="f-curp"
                  :data="{ name: 'u-icon-arrowsLeft' }"
                  @on-click="onPrevYear"
                />
                <ht-icon
                  aria-label="上一月"
                  class="f-curp f-ml5"
                  :data="{ name: 'u-icon-arrowLeft' }"
                  @on-click="onPrevMonth"
                />
                <div class="f-f1">
                  <span @click="onShowYearPicker">{{ yearLabel }}</span>
                  <span
                    v-show="currentView === 'date'"
                    class="f-ml5"
                    @click="onShowMonthPicker"
                  >
                    {{ month + 1 }}月
                  </span>
                </div>
                <ht-icon
                  aria-label="下一月"
                  class="f-curp"
                  :data="{ name: 'u-icon-arrowRight' }"
                  @on-click="onNextMonth"
                />
                <ht-icon
                  aria-label="下一年"
                  class="f-curp f-ml5"
                  :data="{ name: 'u-icon-arrowsRight' }"
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
                  @on-pick="onDatePick"
                />
                <month-table
                  v-if="currentView === 'month'"
                  :date="innerDate"
                  @on-pick="onMonthPick"
                />
                <year-table
                  v-if="currentView === 'year'"
                  :date="innerDate"
                  @on-pick="onYearPick"
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
import { defineComponent, PropType, inject, ref, computed, watch } from "vue";
import dayjs from "dayjs";
import type { ConfigType, Dayjs } from "dayjs";
import HtPopover from "../HtPopover";
import HtInput from "../HtInput";
import HtIcon from "../HtIcon";
import DateTable from "./date-table.vue";
import MonthTable from "./month-table.vue";
import YearTable from "./year-table.vue";
import { DatePickerData } from "./types";
import { FormContext, formKey } from "../HtForm/types";

// 表单中的日期选择组件。
export default defineComponent({
  name: "HtDatePicker",

  components: {
    HtPopover,
    HtInput,
    HtIcon,
    DateTable,
    MonthTable,
    YearTable,
  },

  props: {
    // 选中的日期
    modelValue: {
      type: [String],
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
    const popoverRef = ref(null);
    const form: FormContext | undefined = inject(formKey);
    const inputVal = ref<string | number>("");
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
      if (["week", "month", "year", "dates"].includes(props.data.type)) {
        return props.data.type;
      }
      return "day";
    });
    const parsedValue = ref(props.data?.parsedValue);
    const disabledDate = computed(() => props.data?.disabledDate);
    const showTime = computed(() =>
      ["dateTime", "dateTimeRange"].includes(props.data.type)
    );

    /**
     * 点击上一年
     * @returns void
     */
    const onPrevYear = () => {
      if (currentView.value === "year") {
        innerDate.value = innerDate.value.subtract(10, "year");
      } else {
        innerDate.value = innerDate.value.subtract(1, "year");
      }
    };

    /**
     * 点击上一月
     * @returns void
     */
    const onPrevMonth = () => {
      innerDate.value = innerDate.value.subtract(1, "month");
    };

    /**
     * 点击下一月
     * @returns void
     */
    const onNextMonth = () => {
      innerDate.value = innerDate.value.add(1, "month");
    };

    /**
     * 点击下一年
     * @returns void
     */
    const onNextYear = () => {
      if (currentView.value === "year") {
        innerDate.value = innerDate.value.add(10, "year");
      } else {
        innerDate.value = innerDate.value.add(1, "year");
      }
    };

    /**
     * 展示年份面板
     * @returns void
     */
    const onShowYearPicker = () => {
      // todo: 后续补充
      // currentView.value = "year";
    };

    /**
     * 展示月份面板
     * @returns void
     */
    const onShowMonthPicker = () => {
      // todo: 后续补充
      // currentView.value = "month";
    };

    const selectableRange = ref([]);

    /**
     * 检查当前日期是否在选中范围内
     * @returns void
     */
    const checkDateWithinRange = (date: ConfigType) => {
      // todo: 逻辑待补充
      return !selectableRange.value?.length;
    };

    /**
     * 初始化date对象
     * @param {Object} dayjs 日期对象
     * @returns {Object} dayjs 初始化后的日期对象
     */
    const onFormatDayjs = (emitDayjs: Dayjs) => {
      if (showTime.value) return emitDayjs.millisecond(0);
      return emitDayjs.startOf("day");
    };

    /**
     * 格式转换
     * @param {String} format 格式字符串
     * @returns {String} format 转换后的格式字符串
     */
    const extractDateFormat = (format?: string) =>
      format
        ?.toUpperCase()
        ?.replace(/\W?m{1,2}|\W?ZZ/g, "")
        ?.replace(/\W?h{1,2}|\W?s{1,3}|\W?a/gi, "")
        ?.trim();
    const dateFormat = computed(() => {
      return extractDateFormat(props.data?.format || "YYYY-MM-DD");
    });

    /**
     * 日期格式处理
     * @param {Object} dayjs 日期对象
     * @returns void
     */
    const onEmit = (value: Dayjs, ...args: any) => {
      const newValue = value ? onFormatDayjs(value) : value;
      inputVal.value = newValue?.format(dateFormat.value);
      const popoverRefValue: any = popoverRef.value;
      popoverRefValue.onVisibleChange(false);

      /**
       * 日期选择事件触发
       * @param {String} inputVal 输入框展示的日期字符串
       * @param {Object} dayjs 日期对象
       */
      emit("on-pick", inputVal.value, newValue, ...args);
    };

    /**
     * 日期选择
     * @param {Object} dayjs 日期对象
     * @returns void
     */
    const onDatePick = (value: Dayjs) => {
      if (selectionMode.value === "day") {
        let newDate = parsedValue.value
          ? (parsedValue.value as Dayjs)
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
        parsedValue.value = newDate;
        onEmit(newDate, showTime.value);
      } else if (selectionMode.value === "week") {
        onEmit(value);
      } else if (selectionMode.value === "dates") {
        onEmit(value, true);
      }
    };

    /**
     * 月份选择
     * @param {String} month 月份
     * @returns void
     */
    const onMonthPick = (pickMonth: any) => {
      innerDate.value = innerDate.value.startOf("month").month(pickMonth);
      if (selectionMode.value === "month") {
        onEmit(innerDate.value);
      } else {
        currentView.value = "date";
      }
    };

    /**
     * 年份选择
     * @param {String} year 年份
     * @returns void
     */
    const onYearPick = (pickYear: any) => {
      if (selectionMode.value === "year") {
        innerDate.value = innerDate.value.startOf("year").year(pickYear);
        onEmit(innerDate.value);
      } else {
        innerDate.value = innerDate.value.year(pickYear);
        currentView.value = "month";
      }
    };

    // 监听参数 value 的变化
    watch(
      () => props.modelValue,
      (value) => {
        inputVal.value = value; // 设置 value
      },
      {
        immediate: true,
      }
    );

    // 监听输入框的值的变化
    watch(inputVal, (value) => {
      /**
       * 输入框input值更新
       * @param {String} value 输入框input值
       */
      emit("update:modelValue", value);
    });

    return {
      popoverRef,
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
      onDatePick,
      onMonthPick,
      onYearPick,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
