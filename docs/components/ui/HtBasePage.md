# HtBasePage 基础页

##### `Category: list`

### `Recommend`

## 代码演示

### 基础用法

- 该模块用于配置动态组件。

:::Demo
```vue demo
<template>
  <ht-base-page :data="basePageData" />
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    return {
      basePageData: reactive({
        moduleList: [
          {
            id: 1,
            moduleId: 1001,
            moduleType: "list",
            moduleName: "ht-table-page",
            moduleTitle: "表格页",
            moduleDesc: "表格页面组件。",
            moduleVersion: "0.0.1",
            moduleProps: {
              request: {
                onGetListXhr: {
                  xhr: "",
                  getParams: "",
                  callback: "",
                },
                onDeleteXhr: {
                  xhr: "",
                  getParams: "",
                  callback: "",
                },
              },
              filterForm: {
                hideLoading: true,
                inline: true,
                model: {
                  company_name: "",
                  type: 2,
                },
                fields: [
                  {
                    type: "input",
                    label: "公司名称",
                    prop: "company_name",
                    itemProps: {
                      placeholder: "请输入公司名称",
                      clearable: true,
                    },
                  },
                  {
                    type: "select",
                    label: "状态",
                    prop: "status",
                    itemProps: {
                      placeholder: "请选择状态",
                      filterable: true,
                      clearable: true,
                      options: [
                        {
                          label: "正常",
                          value: 1,
                        },
                        {
                          label: "关闭",
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
              toolbar: [
                {
                  type: "add",
                  content: "新增公司",
                  onClick:
                    "window.open('https://xxx', '_blank')",
                },
              ],
              table: {
                id: "AreaCompanyListTable",
                height: 500,
                size: "small",
                autoResize: true,
                border: false,
                stripe: true,
                align: "left",
                custom: true,
                customConfig: {
                  storage: true,
                },
                columnConfig: {
                  resizable: true,
                },
                rowConfig: {
                  isHover: true,
                },
                columns: [
                  {
                    type: "seq",
                    title: "序号",
                    fixed: "left",
                    width: 50,
                  },
                  {
                    title: "公司名称",
                    field: "company_name",
                    showOverflow: true,
                    sortable: true,
                    width: 200,
                  },
                  {
                    title: "负责人",
                    field: "principal",
                  },
                  {
                    title: "负责人电话",
                    field: "principal_tel",
                    sortable: true,
                  },
                  {
                    title: "对接负责人",
                    field: "docking_principal",
                  },
                  {
                    title: "创建人",
                    field: "user_admin.nickname",
                  },
                  {
                    title: "创建时间",
                    field: "created_at",
                    sortable: true,
                    width: 150,
                  },
                  {
                    title: "状态",
                    slots:
                      "const map={1: '正常',2: '关闭'};return map[data.row.status]",
                  },
                  {
                    title: "操作",
                    width: 180,
                    fixed: "right",
                    actions: [
                      {
                        type: "detail",
                        content: "详情",
                        onClick:
                          "window.open('https://xxx', '_blank')",
                      },
                      {
                        type: "edit",
                        content: "编辑",
                        onClick: "alert(data.action.type)",
                      },
                      "delete",
                      {
                        type: "open",
                        content: "开启",
                        show: {
                          status: 2,
                        },
                        onClick:
                          "proxy.$dialog.show({title: '提示',content: '确认关闭吗？',onConfirm: () => {}});",
                      },
                      {
                        type: "close",
                        content: "关闭",
                        show: {
                          status: 1,
                        },
                        onClick:
                          "proxy.$dialog.show({title: '提示',content: '确认开启吗？',onConfirm: () => {}});",
                      },
                    ],
                  },
                ],
              },
              pager: {
                pageSize: 8,
              },
            },
          },
        ],
      }),
    };
  },
});
</script>
```
:::
