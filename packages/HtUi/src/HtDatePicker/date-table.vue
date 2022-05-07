<template>
  <table
    class="ht-date-table f-curp f-trans"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    @click="onClick"
    @mousemove="onMouseMove"
  >
    <tbody>
      <tr>
        <th v-for="(item, index) in WEEKS_TITLE" :key="index">
          <div class="title f-mb5">{{ item }}</div>
        </th>
      </tr>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="row">
        <td
          v-for="(cell, cellIndex) in row"
          :key="`${rowIndex}-${cellIndex}`"
          :class="getCellClasses(cell)"
        >
          {{ cell?.text }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import dayjs from "dayjs";
import type { PropType } from "vue";
import type { Dayjs } from "dayjs";

export default defineComponent({
  props: {
    date: {
      type: Object as PropType<Dayjs>,
    },
    minDate: {
      type: Object as PropType<Dayjs>,
    },
    maxDate: {
      type: Object as PropType<Dayjs>,
    },
    parsedValue: {
      type: [Object, Array] as PropType<Dayjs | Dayjs[]>,
    },
    selectionMode: {
      type: String,
      default: "day",
    },
    disabledDate: {
      type: Function,
    },
    rangeState: {
      type: Object,
      default: () => ({
        endDate: null,
        selecting: false,
      }),
    },
  },

  setup(props, { emit }) {
    const lang = ref("zh-cn");
    const firstDayOfWeek = (props.date as any).$locale().weekStart || 7;
    const WEEKS_CONSTANT = ["一", "二", "三", "四", "五", "六", "日"];
    const WEEKS_TITLE = computed(() =>
      WEEKS_CONSTANT?.concat(WEEKS_CONSTANT).slice(
        firstDayOfWeek,
        firstDayOfWeek + 7
      )
    );

    const offsetDay = computed(() => {
      return (firstDayOfWeek > 3 ? 7 - firstDayOfWeek : -firstDayOfWeek) - 1;
    });

    const tableRows = ref([[], [], [], [], [], []]);
    const lastRow = ref(-1);
    const lastColumn = ref(null);

    const startDate = computed(() => {
      const startDayOfMonth = props?.date?.startOf("month");
      return startDayOfMonth?.subtract(startDayOfMonth.day() || 7, "day");
    });

    const cellMatchesDate = (cell: any, date: any) => {
      if (!date) return false;
      return dayjs(date)
        .locale(lang.value)
        .isSame(props.date?.date(Number(cell.text)), "day");
    };

    const isCurrent = (cell: any): boolean => {
      return (
        props.selectionMode === "day" &&
        (cell.type === "normal" || cell.type === "today") &&
        cellMatchesDate(cell, props.parsedValue)
      );
    };

    const rows = computed(() => {
      const startOfMonth = props?.date?.startOf("month");
      const startOfMonthDay = startOfMonth?.day() || 7; // day of first day
      const dateCountOfMonth = startOfMonth?.daysInMonth() || 30;
      const dateCountOfLastMonth =
        startOfMonth?.subtract(1, "month")?.daysInMonth() || 30;
      const offset = offsetDay.value;
      const newRows = tableRows.value;
      let count = 1;

      const selectedDate: Dayjs[] = [];

      const calNow = dayjs().locale(lang.value).startOf("day");

      for (let i = 0; i < 6; i++) {
        const row: any = newRows[i];

        for (let j = 0; j < 7; j++) {
          let cell: any = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
              inRange: false,
              start: false,
              end: false,
            };
          }
          const index = i * 7 + j;
          const calTime: any = startDate.value?.add(index - offset, "day");
          cell.dayjs = calTime;
          cell.date = calTime?.toDate();
          cell.timestamp = calTime?.valueOf();
          cell.type = "normal";

          const minDate: any = props.minDate;
          const calEndDate =
            props.rangeState.endDate ||
            props.maxDate ||
            (props.rangeState.selecting && minDate);

          cell.inRange =
            (minDate &&
              calTime?.isSameOrAfter(minDate, "day") &&
              calEndDate &&
              calTime?.isSameOrBefore(calEndDate, "day")) ||
            (minDate &&
              calTime?.isSameOrBefore(minDate, "day") &&
              calEndDate &&
              calTime?.isSameOrAfter(calEndDate, "day"));

          if (minDate?.isSameOrAfter(calEndDate)) {
            cell.start = calEndDate && calTime?.isSame(calEndDate, "day");
            cell.end = minDate && calTime?.isSame(minDate, "day");
          } else {
            cell.start = minDate && calTime?.isSame(minDate, "day");
            cell.end = calEndDate && calTime?.isSame(calEndDate, "day");
          }

          const isToday = calTime?.isSame(calNow, "day");

          if (isToday) {
            cell.type = "today";
          }

          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth =
              startOfMonthDay + offset < 0
                ? 7 + startOfMonthDay + offset
                : startOfMonthDay + offset;
            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++;
            } else {
              cell.text =
                dateCountOfLastMonth -
                (numberOfDaysFromPreviousMonth - (j % 7)) +
                1 +
                i * 7;
              cell.type = "prev-month";
            }
          } else if (count <= dateCountOfMonth) {
            cell.text = count++;
          } else {
            cell.text = count++ - dateCountOfMonth;
            cell.type = "next-month";
          }

          const cellDate = calTime?.toDate();
          cell.selected = selectedDate.find(
            (_) => _.valueOf() === calTime?.valueOf()
          );
          cell.isSelected = !!cell.selected;
          cell.isCurrent = isCurrent(cell);
          cell.disabled = props.disabledDate && props.disabledDate(cellDate);
          row[j] = cell;
        }
      }
      return newRows;
    });

    const getCellClasses = (cell: any) => {
      const classes: string[] = [];
      if ((cell.type === "normal" || cell.type === "today") && !cell.disabled) {
        classes.push("available");
        if (cell.type === "today") {
          classes.push("today");
        }
      } else {
        classes.push(cell.type);
      }

      if (isCurrent(cell)) {
        classes.push("current");
      }

      if (
        cell.inRange &&
        (cell.type === "normal" ||
          cell.type === "today" ||
          props.selectionMode === "week")
      ) {
        classes.push("in-range");

        if (cell.start) {
          classes.push("start-date");
        }

        if (cell.end) {
          classes.push("end-date");
        }
      }

      if (cell.disabled) {
        classes.push("disabled");
      }

      if (cell.selected) {
        classes.push("selected");
      }

      if (cell.customClass) {
        classes.push(cell.customClass);
      }

      return classes.join(" ");
    };

    const getDateOfCell = (row: number, column: number) => {
      const offsetFromStart = row * 7 + column - offsetDay.value;
      return startDate.value?.add(offsetFromStart, "day");
    };

    const onClick = (event: any) => {
      let target = event?.target;

      while (target) {
        if (target.tagName === "TD") {
          break;
        }
        target = target.parentNode;
      }

      if (!target || target.tagName !== "TD") return;

      const row = target.parentNode.rowIndex - 1;
      const column = target.cellIndex;
      const cell: any = rows.value[row][column];

      if (cell.disabled || cell.type === "week") return;

      const newDate = getDateOfCell(row, column);

      if (props.selectionMode === "day") {
        emit("on-pick", newDate);
      }
    };

    const onMouseMove = (event: any) => {
      if (!props.rangeState.selecting) return;

      const target = event?.target;
      if (target.tagName !== "TD") return;

      const row = target.parentNode.rowIndex - 1;
      const column = target.cellIndex;
      const rowValue: any = rows.value[row][column];
      if (rowValue?.disabled) return;
      if (row !== lastRow.value || column !== lastColumn.value) {
        lastRow.value = row;
        lastColumn.value = column;
        emit("on-range-change", {
          selecting: true,
          endDate: getDateOfCell(row, column),
        });
      }
    };

    return {
      WEEKS_TITLE,
      tableRows,
      startDate,
      rows,
      getCellClasses,
      onClick,
      onMouseMove,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./date-table.less";
</style>
