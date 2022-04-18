import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  Router,
} from "vue-router";
import docs from "./docs";

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    redirect: {
      name: "index",
    },
  },
  {
    path: "/",
    name: "index",
    component: () => import(`@/views/index.vue`),
  },
  {
    path: "/doc",
    redirect: {
      name: "introduce",
    },
    component: () => import(`@/views/doc.vue`),
    children: docs as any[],
  },
];

// 路由实例
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
