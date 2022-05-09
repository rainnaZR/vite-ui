export const useHandler = ({ useRouter, useRoute }: any) => {
  const $router = useRouter();
  const $route = useRoute();

  const actionMethods = {
    // 新增
    add: () => {
      $router.push(`${$route.path}/detail`);
    },
    // 详情
    detail: ({ row = {}, action = {} }: any) => {
      $router.push(`${$route.path}/detail?type=${action.type}&id=${row.id}`);
    },
    // 编辑
    edit: ({ row = {}, action = {} }: any) => {
      $router.push(`${$route.path}/detail?type=${action.type}&id=${row.id}`);
    },
  };

  return { actionMethods };
};
