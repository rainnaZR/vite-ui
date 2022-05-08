import { ref } from "vue";

/**
 * 默认表格数据
 */
export const defaultTableData = {
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
    pageSize: 10,
    total: 0,
    pageSizes: [10, 20, 50, 100],
    layout: "total, prev, pager, next, sizes, jumper",
    pageShowLimit: 5,
    sizeOptionsPosition: "top",
  },
};

/**
 * 默认表格操作项
 */
export const defaultActions = {
  add: {
    btnType: "primary",
    icon: "u-icon-add",
    size: "normal",
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

export const useHandler = (props: any, proxy: any) => {
  const { $dialog, $loading, $toast } = proxy;
  const { pageIndex, pageSize } = props.data.pager;
  const listParams = ref({
    pageIndex,
    pageSize,
    ...(props.data.filterForm?.model || {}),
  });

  /**
   * 列表数据获取
   */
  const onGetListData = async (params: any) => {
    const { xhr, getParams, callback } = props.data?.request?.onGetListXhr;
    if (!xhr) {
      console.error("列表获取接口为空");
      return;
    }

    props.data.table.loading = true;
    try {
      const xhrParams =
        typeof getParams === "function" ? getParams(params) : params;
      let result = await xhr(xhrParams);
      result = typeof callback === "function" ? callback(result) : result;
      const { list = [], pager = {} } = result.data || {};
      props.data.table.data = list;
      Object.assign(props.data.pager, pager);
      listParams.value = params;
    } catch (err) {
      console.error(err);
    }
    props.data.table.loading = false;
  };

  /**
   * 重载列表
   */
  const onReLoadList = () => {
    onGetListData(listParams.value);
  };

  /**
   * 搜索
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
   */
  const onReset = () => {
    const { pageSizes } = props.data.pager;
    onGetListData({
      pageIndex: 1,
      pageSize: pageSizes[0],
    });
  };

  /**
   * 表单操作项点击
   */
  const onClickFormAction = (options: any = {}) => {
    const { type, formModel = {} } = options;
    if (type === "submit") onSearch(formModel);
    if (type === "reset") onReset();
  };

  /**
   * 页码点击
   */
  const onPageChange = (index: number) => {
    onGetListData({
      ...listParams.value,
      pageIndex: index,
    });
  };

  /**
   * 每页数量点击
   */
  const onSizeChange = (size: number) => {
    onGetListData({
      ...listParams.value,
      pageIndex: 1,
      pageSize: size,
    });
  };

  /**
   * 弹窗展示
   */
  const onShowDialog = (options: any) => {
    const { title = "提示", content, xhr, xhrParams } = options || {};
    $dialog.show({
      title,
      content,
      onConfirm: async () => {
        const loading = $loading();
        try {
          const result = await xhr(xhrParams);
          loading.close();
          if (result.code === 200) {
            $toast.success("操作成功");
            $dialog.close();
            onReLoadList();
          }
        } catch (e) {
          loading.close();
          $toast.error("接口请求出错，请稍后再试！");
        }
      },
    });
  };

  const hasTargetValue = (show: any, row: any) =>
    Object.keys(show).every((key) => row[key] && row[key] === show[key]);

  /**
   * 获取表格操作项
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

  // /**
  //  * 表格操作项集合
  //  */
  // const actionMethods = {
  //   // 新增
  //   add: () => {
  //     // $router.push(`${$route.path}/detail`);
  //   },
  //   // 详情
  //   detail: (row: any = {}, action: any = {}) => {
  //     // $router.push(`${$route.path}/detail?type=${action.type}&id=${row.id}`);
  //   },
  //   // 编辑
  //   edit: (row: any = {}, action: any = {}) => {
  //     // $router.push(`${$route.path}/detail?type=${action.type}&id=${row.id}`);
  //   },
  //   // 删除
  //   delete: (row: any = {}) => {
  //     const { xhr, getParams } = props.data?.request?.onDeleteXhr;
  //     if (!xhr) {
  //       console.error("删除接口为空");
  //       return;
  //     }
  //     const content = row.title
  //       ? `确定要删除"${row.title}"的数据吗？`
  //       : "确定删除当前数据吗？";
  //     const xhrParams =
  //       typeof getParams === "function" ? getParams(row) : { id: row?.id };
  //     onShowDialog({
  //       content,
  //       xhr,
  //       xhrParams,
  //     });
  //   },
  // };

  /**
   * 表格操作项点击
   */
  const onClickAction = (options = {}) => {
    // const { type, onClick } = options.action;
    // if (onClick) {
    //   onClick(row, action);
    //   return;
    // }
    // if (actionMethods[type]) {
    //   actionMethods[type](row, action);
    // }
  };

  return {
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
  };
};
