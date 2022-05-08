<template>
  <div class="ht-table-page">
    <!-- 筛选项 -->
    <div
      v-if="data.filterForm && data.filterForm?.fields?.length"
      class="box f-mb15"
    >
      <ht-form-page :data="data.filterForm" @on-action="onClickFormAction" />
    </div>

    <!-- 表格区 -->
    <div class="box">
      <!-- 工具栏 -->
      <vxe-toolbar
        v-if="data.toolbar?.length"
        class="f-mb15"
        ref="xToolbar"
        :custom="data.table.custom"
      >
        <template #buttons>
          <ht-action
            :data="{ list: onGetAction(data.toolbar) }"
            @on-action="(action) => onClickAction({ action, from: 'toolbar' })"
          />
        </template>
      </vxe-toolbar>

      <!-- 列表区 -->
      <vxe-table
        v-if="data.table"
        class="f-mb25 f-f1"
        ref="xTable"
        v-bind="data.table"
      >
        <vxe-column
          v-for="(column, index) in data.table?.columns"
          :key="`column-${index}`"
          v-bind="column"
        >
          <!-- 排除特定属性：比如索引 -->
          <template v-if="column.type != 'seq'" #default="{ row, rowIndex }">
            <!-- render函数渲染 -->
            <template v-if="column.slot">
              <renderComp :column="column" :row="row" :index="rowIndex" />
            </template>

            <!-- 操作按钮 -->
            <template v-else-if="column.actions?.length">
              <ht-action
                :data="{ list: onGetAction(column.actions, row) }"
                @on-action="
                  (action) => onClickAction({ action, row, from: 'table' })
                "
              />
            </template>

            <!-- 内容展示 -->
            <template v-else>
              {{
                onDoValueByProps({ object: row, prop: column.field }) ||
                column.placeholder ||
                data.table.columnPlaceholder ||
                "--"
              }}
            </template>
          </template>
        </vxe-column>
        <template #empty>
          <ht-empty />
        </template>
      </vxe-table>

      <!-- 翻页区 -->
      <div v-if="data.pager" class="f-flexr" style="height: 40px">
        <ht-pager
          v-model:pageIndex="data.pager.pageIndex"
          v-model:pageSize="data.pager.pageSize"
          :data="data.pager"
          @on-page-change="onPageChange"
          @on-size-change="onSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  h,
  ref,
  getCurrentInstance,
  onMounted,
  nextTick,
} from "vue";
import {
  Toolbar as vxeToolbar,
  Table as vxeTable,
  Column as vxeColumn,
  VxeTableInstance,
  VxeToolbarInstance,
} from "vxe-table";
import { tools } from "@htfed/utils";
import HtFormPage from "../HtFormPage";
import HtEmpty from "../HtEmpty";
import HtPager from "../HtPager";
import { TablePageData } from "./types";
import { useHandler } from "./hooks";
import "vxe-table/lib/style.css";

// 表格页面组件，包括筛选项，表格内容，表格分页内容。
export default defineComponent({
  name: "HtTablePage",

  components: {
    vxeToolbar,
    vxeTable,
    vxeColumn,
    HtFormPage,
    HtEmpty,
    HtPager,
    renderComp: (props) => {
      const defaultSlot = props.column?.slot?.(props);
      return h(
        "div",
        {
          innerHTML: defaultSlot,
        },
        []
      );
    },
  },

  props: {
    // 配置数据
    data: {
      type: Object as PropType<TablePageData>,
      required: true,
      default: () => ({}),
    },
  },

  setup(props) {
    const xTable = ref({} as VxeTableInstance);
    const xToolbar = ref({} as VxeToolbarInstance);
    const proxy = getCurrentInstance()?.proxy;

    const {
      listParams,
      onGetListData,
      onReLoadList,
      onSearch,
      onReset,
      onClickFormAction,
      onGetAction,
      onClickAction,
      onPageChange,
      onSizeChange,
    } = useHandler(props, proxy);

    onMounted(() => {
      onGetListData({
        pageIndex: 1,
        pageSize: props.data.pager.pageSizes[0],
        ...(props.data.filterForm?.model || {}),
      });
    });

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value;
      const $toolbar = xToolbar.value;
      $table.connect($toolbar);
    });

    return {
      xTable,
      xToolbar,
      listParams,
      onGetListData,
      onReLoadList,
      onSearch,
      onReset,
      onClickFormAction,
      onGetAction,
      onClickAction,
      onPageChange,
      onSizeChange,
      onDoValueByProps: tools.onDoValueByProps,
    };
  },
});
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
