<template>
  <!-- 筛选项 -->
  <div
    v-if="data.filterForm && data.filterForm?.fields?.length"
    class="m-table-filter f-mb5"
  >
    <ht-form-page :data="data.filterForm" @on-action="onClickFormAction" />
  </div>

  <!-- 工具栏 -->
  <div v-if="data.toolbar?.length" class="m-table-toolbar f-mb5">
    <vxe-toolbar ref="xToolbar" :custom="data.table.custom">
      <template #buttons>
        <ht-action
          :data="{ list: onGetAction(data.toolbar) }"
          @on-action="(action) => onClickAction({ action, from: 'toolbar' })"
        />
      </template>
    </vxe-toolbar>
  </div>

  <!-- 列表区 -->
  <div v-if="data.table" class="ht-table-list f-mb25 f-f1">
    <vxe-table ref="xTable" v-bind="data.table">
      <vxe-column
        v-for="(column, index) in data.table?.columns"
        :key="`column-${index}`"
        v-bind="column"
      >
        <!-- 排除特定属性：比如索引 -->
        <template v-if="column.type != 'seq'" #default="{ row, rowIndex }">
          <!-- render函数渲染 -->
          <template v-if="column.slots">
            <renderComp :column="column" :row="row" :index="rowIndex" />
          </template>

          <!-- 自定义渲染配置 -->
          <template v-else-if="column.showConfig && column.field">
            <div v-if="column.showConfig.type == 'image'">
              <a :href="row[column.field]" target="_blank">
                <img
                  :src="row[column.field]"
                  :width="column.showConfig?.imgWidth"
                  :height="column.showConfig?.imgHeight"
                  :alt="column.showConfig?.imgAlt"
                />
              </a>
            </div>
          </template>

          <!-- 操作按钮 -->
          <template v-else-if="column.actions?.length">
            <div style="margin: -10px 10px -10px 0">
              <ht-action
                :data="{ list: onGetAction(column.actions, row) }"
                @on-action="
                  (action) => onClickAction({ action, row, from: 'table' })
                "
              />
            </div>
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
  </div>

  <!-- 翻页区 -->
  <div v-if="pager" class="m-table-pager f-flexr" style="height: 40px">
    <ht-pager
      v-model:pageIndex="pager.pageIndex"
      v-model:pageSize="pager.pageSize"
      :data="pager"
      @on-page-change="onPageChange"
      @on-size-change="onSizeChange"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  h,
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onMounted,
} from "vue";
import { VxeTableInstance, VxeToolbarInstance } from "vxe-table";
import { tools } from "@htfed/utils";
import HtFormPage from "../HtFormPage";
import HtEmpty from "../HtEmpty";
import HtPager from "../HtPager";
import { TablePageData } from "./types";

// 表格页面组件。
export default defineComponent({
  name: "HtTablePage",

  components: {
    HtFormPage,
    HtEmpty,
    HtPager,
    renderComp: (props, context) => {
      const slots = props.column?.slots;
      let innerHTML;
      if (typeof slots === "string") {
        const newFunc = new Function("data", slots);
        innerHTML = newFunc.call(context, props);
      } else {
        innerHTML = slots?.(props);
      }
      return h(
        "div",
        {
          innerHTML,
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

  setup(props, { emit }) {
    const xTable = ref({} as VxeTableInstance);
    const xToolbar = ref({} as VxeToolbarInstance);
    const proxy: any = getCurrentInstance()?.proxy;
    const { $dialog, $loading, $toast } = proxy || {};

    /**
     * 默认组件配置数据
     */
    const defaultTableData = {
      filterForm: {
        inline: true,
        model: {},
        fields: [],
        hideLoading: true,
      },
      toolbar: [],
      table: {
        columns: [],
      },
      pager: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        pageSizes: [10, 20, 50, 100],
        layout: "total, prev, pager, next, sizes, jumper",
        pageShowLimit: 5,
        sizeOptionsPosition: "top",
      },
    };

    /**
     * 默认行动点数据
     */
    const defaultActions = {
      add: {
        btnType: "default",
        icon: "u-icon-add",
        size: "small",
        content: "新增",
      },
      detail: {
        content: "详情",
      },
      edit: {
        content: "编辑",
      },
      delete: {
        content: "删除",
      },
    };

    const pager = reactive({
      ...defaultTableData.pager,
      ...(props.data.pager || {}),
    });
    const listParams = ref({
      pageIndex: pager.pageIndex,
      pageSize: pager.pageSize,
      ...(props.data.filterForm?.model || {}),
    });

    /**
     * 函数处理
     * @params {String} value 函数主体内容，为字符串
     * @params {Array} paramsKey 参数名组成的字符串数组
     * @params {Array} paramsValue 参数值组成的数组
     * @params {Any} defaultValue 默认返回值
     * @returns {Any} 返回值
     */
    const onExecFunction = (
      value?: any,
      paramsKey?: any,
      paramsValue?: any,
      defaultValue?: any
    ) => {
      if (!value) return defaultValue;

      const type = typeof value;
      if (type === "function") {
        return value(...paramsValue);
      }
      if (type === "string") {
        const newFunc = new Function(...paramsKey, value);
        return newFunc.call(null, ...paramsValue);
      }

      return defaultValue;
    };

    /**
     * 列表数据获取
     * @param {Object} params 列表加载的参数
     * @returns void
     */
    const onGetListData = async (params: any) => {
      const { xhr, getParams, callback } =
        props.data?.request?.onGetListXhr || {};
      if (!xhr) {
        console.error("列表获取接口为空");
        return;
      }

      // eslint-disable-next-line vue/no-mutating-props
      props.data.table.loading = true;
      try {
        const xhrParams = onExecFunction(
          getParams,
          ["params"],
          [params],
          params
        );
        let result = await onExecFunction(
          xhr,
          ["data", "proxy"],
          [xhrParams, proxy]
        );
        result = onExecFunction(callback, ["data"], [result], result);
        const { list = [], pager: listPager } = result.data || {};
        // eslint-disable-next-line vue/no-mutating-props
        props.data.table.data = list;
        Object.assign(pager, listPager);
        listParams.value = params;
      } catch (err) {
        console.error(err);
      }
      // eslint-disable-next-line vue/no-mutating-props
      props.data.table.loading = false;
    };

    /**
     * 重载列表
     * @returns void
     */
    const onReLoadList = () => {
      onGetListData(listParams.value);
    };

    /**
     * 搜索
     * @param {Object} params 搜索参数
     * @returns void
     */
    const onSearch = (params: any = {}) => {
      onGetListData({
        ...listParams.value,
        ...params,
        pageIndex: 1,
      });
    };

    /**
     * 重置
     * @returns void
     */
    const onReset = () => {
      onGetListData({
        pageIndex: 1,
        pageSize: pager.pageSize || pager.pageSizes[0],
      });
    };

    /**
     * 表单操作项点击
     * @param {Object} params 当前点击操作项的配置项
     * @returns void
     */
    const onClickFormAction = (params: any = {}) => {
      const { type, formModel = {} } = params;
      if (type === "submit") onSearch(formModel);
      if (type === "reset") onReset();
      emit("on-action", {
        action: params,
        from: "filterForm",
      });
    };

    /**
     * 判断当前item项是否显示
     * @param {Object} show 展示需要满足的条件
     * @param {Object} row 当前数据项
     * @returns {Boolean} result 是否满足条件
     */
    const hasTargetValue = (show: any, row: any) =>
      Object.keys(show).every((key) => row[key] && row[key] === show[key]);

    /**
     * 筛选表格操作项
     * @param {Array} actions 传入的表格操作项
     * @param {Object} row 当前表格项数据
     * @returns {Array} actions 需要展示的表格项
     */
    const onGetAction = (actions: any[], row?: any) => {
      return actions
        .map((item) => {
          if (typeof item === "string") {
            item = {
              type: item,
              ...(defaultActions[item] || {}),
            };
          }
          if (typeof item === "object") {
            item = {
              ...(defaultActions[item.type] || {}),
              ...item,
            };
          }
          return item;
        })
        ?.filter((i) => {
          const { show } = i;
          return (
            show === undefined ||
            !row ||
            (typeof show === "object" && hasTargetValue(show, row)) ||
            (typeof show === "function" && !!show(row))
          );
        });
    };

    /**
     * 弹窗展示
     * @param {Object} params 弹窗配置项数据
     * @returns void
     */
    const onShowDialog = (params: any) => {
      const { title = "提示", content, xhr, xhrParams } = params || {};
      $dialog.show({
        title,
        content,
        onConfirm: async () => {
          const loading = $loading();
          try {
            const result = await onExecFunction(
              xhr,
              ["data", "proxy"],
              [xhrParams, proxy]
            );
            loading.close();
            if (result.code === 200 || result.code === 0) {
              $toast.success("操作成功");
              $dialog.close();
              onReLoadList();
            }
          } catch (e) {
            console.error(e);
            loading.close();
            $toast.error("接口请求出错，请稍后再试！");
          }
        },
      });
    };

    /**
     * 默认操作项点击事件
     */
    const defaultActionMethods = {
      // 删除
      delete: ({ row = {} }: any) => {
        const { xhr, getParams } = props.data?.request?.onDeleteXhr || {};
        if (!xhr) {
          console.error("删除接口为空");
          return;
        }
        const content = row.title
          ? `确定要删除"${row.title}"的数据吗？`
          : "确定删除当前数据吗？";
        const xhrParams = onExecFunction(getParams, ["params"], [row], {
          id: row?.id,
        });

        onShowDialog({
          content,
          xhr,
          xhrParams,
        });
      },
    };

    /**
     * 操作项点击事件
     */
    const actionMethods = reactive({
      ...defaultActionMethods,
      ...(props.data.actionMethods || {}),
    });

    /**
     * 表格操作项点击
     * @param {Object} params 当前点击操作项的配置数据
     * @returns void
     */
    const onClickAction = (params: any) => {
      const { onClick, type } = params?.action || {};
      if (onClick) {
        onExecFunction(onClick, ["data", "proxy"], [params, proxy]);
      } else if (actionMethods[type]) {
        actionMethods[type](params);
      }

      /**
       * 表格操作项点击事件触发
       * @param {Object} params 回调参数，值为{action, from, row}
       */
      emit("on-action", params);
    };

    /**
     * 页码点击
     * @param {Number} index 当前点击页码值
     * @returns void
     */
    const onPageChange = (pageIndex: number) => {
      onGetListData({
        ...listParams.value,
        pageIndex,
      });
    };

    /**
     * 每页数量点击
     * @param {Number} size 每页数量值
     * @returns void
     */
    const onSizeChange = (pageSize: number) => {
      onGetListData({
        ...listParams.value,
        pageIndex: 1,
        pageSize,
      });
    };

    onMounted(() => {
      onGetListData({
        pageIndex: 1,
        pageSize: pager.pageSize || pager.pageSizes[0],
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
      defaultTableData,
      pager,
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
