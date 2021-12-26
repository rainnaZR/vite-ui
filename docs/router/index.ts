import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  Router,
} from "vue-router";

const BaseRouter = "/";
// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "Index" },
  },
  {
    path: "/",
    name: "Index",
    component: () => import(`@/views/index.vue`),
  },
];
// 路由实例
const router: Router = createRouter({
  history: createWebHistory(BaseRouter),
  routes,
});
export default router;
