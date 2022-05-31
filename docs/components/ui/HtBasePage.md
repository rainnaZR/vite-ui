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
                  xhr: "return fetch(`https://test.api.dahuangf.com/admin/company?${Object.keys(data).map((i) => i + '=' + data[i]).join('&')}`,{headers: {token:'Hj6Y5EZ57NBK0PRXNRxCXvBQg-oeGZb2iQUfi6IJOK6tPVNq8Dy12wT4PKw5khd8xry3TO12XwxWsVlxwduwRbhDv69Iz4QaAzN78elbvfF77hXXJaWaB6_G3nZGwJzBoRDQQn-CsMSY5p7b_8SNZLHZjycWi9D1maBgcrQeTmKerJ-3wZxWvschRpoFJPBcsJOD67GDVn3TQE9PVLjrNx5YW89q_udLhNvrw8aIrxVpbeM6ZwODVF6PRQD-LphBRuNI-FR1_YXahKcE0LBga0stawIZ26-JEsV8Z44CSdW6EactORFAndWQAHLoDFaWF35TkIAecQIXb2h2Uc49kg..'}}).then(res => res.json());",
                  getParams:
                    "let data={...params,skip: params.pageIndex,num: params.pageSize,type:2};delete data.pageIndex;delete data.pageSize;return data;",
                  callback:
                    "data.data.pager = {pageIndex: data.data.skip-1,total: data.data.count};return data;",
                },
                onDeleteXhr: {
                  xhr: "return fetch(`https://test.api.dahuangf.com/admin/company/${data.id}`,{method: 'delete',headers: {token:'Hj6Y5EZ57NBK0PRXNRxCXvBQg-oeGZb2iQUfi6IJOK6tPVNq8Dy12wT4PKw5khd8xry3TO12XwxWsVlxwduwRbhDv69Iz4QaAzN78elbvfF77hXXJaWaB6_G3nZGwJzBoRDQQn-CsMSY5p7b_8SNZLHZjycWi9D1maBgcrQeTmKerJ-3wZxWvschRpoFJPBcsJOD67GDVn3TQE9PVLjrNx5YW89q_udLhNvrw8aIrxVpbeM6ZwODVF6PRQD-LphBRuNI-FR1_YXahKcE0LBga0stawIZ26-JEsV8Z44CSdW6EactORFAndWQAHLoDFaWF35TkIAecQIXb2h2Uc49kg..'}}).then(res => res.json());",
                  getParams: "let data = {id: params.id};return data;",
                  callback: "return res;",
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
                    "window.open('https://test.admin.dahuangf.com/qt/#/purchaseManage/partsApplyEdit', '_blank')",
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
                          "window.open(`https://test.admin.dahuangf.com/qt/#/area/companyDetail?id=${data.row.id}`, '_blank')",
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
                          "proxy.$dialog.show({title: '提示',content: '确认关闭吗？',onConfirm: () => {fetch(`https://test.api.dahuangf.com/admin/company/update-status`,{method: 'POST',body: JSON.stringify({company_id: data.row.id, status: 1}),headers: {'Content-Type': 'application/json',token:'Hj6Y5EZ57NBK0PRXNRxCXvBQg-oeGZb2iQUfi6IJOK6tPVNq8Dy12wT4PKw5khd8xry3TO12XwxWsVlxwduwRbhDv69Iz4QaAzN78elbvfF77hXXJaWaB6_G3nZGwJzBoRDQQn-CsMSY5p7b_8SNZLHZjycWi9D1maBgcrQeTmKerJ-3wZxWvschRpoFJPBcsJOD67GDVn3TQE9PVLjrNx5YW89q_udLhNvrw8aIrxVpbeM6ZwODVF6PRQD-LphBRuNI-FR1_YXahKcE0LBga0stawIZ26-JEsV8Z44CSdW6EactORFAndWQAHLoDFaWF35TkIAecQIXb2h2Uc49kg..'}}).then(res => res.json()).then(res => {if(res.code == 0) {proxy.$toast.success('操作成功');proxy.onReLoadList()}});}});",
                      },
                      {
                        type: "close",
                        content: "关闭",
                        show: {
                          status: 1,
                        },
                        onClick:
                          "proxy.$dialog.show({title: '提示',content: '确认开启吗？',onConfirm: () => {fetch(`https://test.api.dahuangf.com/admin/company/update-status`,{method: 'POST',body: JSON.stringify({company_id: data.row.id, status: 2}),headers: {'Content-Type': 'application/json',token:'Hj6Y5EZ57NBK0PRXNRxCXvBQg-oeGZb2iQUfi6IJOK6tPVNq8Dy12wT4PKw5khd8xry3TO12XwxWsVlxwduwRbhDv69Iz4QaAzN78elbvfF77hXXJaWaB6_G3nZGwJzBoRDQQn-CsMSY5p7b_8SNZLHZjycWi9D1maBgcrQeTmKerJ-3wZxWvschRpoFJPBcsJOD67GDVn3TQE9PVLjrNx5YW89q_udLhNvrw8aIrxVpbeM6ZwODVF6PRQD-LphBRuNI-FR1_YXahKcE0LBga0stawIZ26-JEsV8Z44CSdW6EactORFAndWQAHLoDFaWF35TkIAecQIXb2h2Uc49kg..'}}).then(res => res.json()).then(res => {if(res.code == 0) {proxy.$toast.success('操作成功');proxy.onReLoadList()}});}});",
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
