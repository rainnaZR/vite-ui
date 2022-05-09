# HtTablePage 表格页

##### `Category: list`

### `Recommend`

## 代码演示

### 基础用法

- 组件是基于 [vxe-table](https://vxetable.cn/#/table/start/install) 二次封装。
- 组件包括`筛选项`，`工具栏`，`表格`，`分页`四个模块。

:::Demo
```vue demo
<template>
  <ht-table-page :data="data" @on-action="onAction" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { request } from "@htfed/utils";

export default defineComponent({
  setup() {
    const data = reactive({
      request: {
        onGetListXhr: {
          xhr: (data) =>
            request
              .get("http://localhost:4029/api/htwww/news/list", data)
              .then((res) => res.data),
        },
        onDeleteXhr: {
          xhr: (data) =>
            request
              .post("http://localhost:4029/api/htwww/news/del", data)
              .then((res) => res.data),
        },
      },
      filterForm: {
        hideLoading: true,
        inline: true,
        model: {
          type: 0,
        },
        fields: [
          {
            type: "select",
            label: "新闻类型",
            prop: "type",
            itemProps: {
              filterable: true,
              clearable: true,
              options: [
                {
                  label: "全部",
                  value: 0,
                },
                {
                  label: "公司动态",
                  value: 1,
                },
                {
                  label: "业务动态",
                  value: 2,
                },
              ],
            },
          },
        ],
        actions: [
          {
            type: "submit",
            content: "搜索",
          },
          "reset",
        ],
      },
      toolbar: ["add"],
      table: {
        id: "NewsListTable",
        height: 400,
        size: "small",
        autoResize: true,
        border: false,
        stripe: true,
        align: "left",
        custom: true,
        customConfig: { storage: true },
        columnConfig: { resizable: true },
        rowConfig: { isHover: true },
        columns: [
          { type: "seq", title: "序号", fixed: "left", width: 50 },
          {
            title: "标题",
            field: "title",
            showOverflow: true,
            sortable: true,
          },
          {
            title: "新闻类型",
            slots: ({ row }: any = {}) => row.type,
          },
          {
            title: "发布时间",
            field: "time",
            sortable: true,
          },
          {
            title: "操作",
            width: 180,
            fixed: "right",
            actions: ["detail", "edit", "delete"],
          },
        ],
      },
    });
    const onAction = (value) => alert(`'${value.action.type}'类型按钮点击`);

    return { data, onAction };
  },
});
</script>
```
:::
