import { createRouter, createWebHistory } from "vue-router";
import { staticRoutes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
});

// 导出路由
export default router;
