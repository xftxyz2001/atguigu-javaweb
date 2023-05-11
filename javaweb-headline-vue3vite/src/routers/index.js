import { createRouter, createWebHistory } from "vue-router";
import { staticRoutes } from "./routes";
import { useUserInfoStore } from '../stores/userInfo';
import pinia from '../stores';
import { getToken, removeToken } from '../utils/token-utils';
import { ElMessage } from 'element-plus';



const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
});

const userInfoStore = useUserInfoStore(pinia)

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const userInfo = !!userInfoStore.nickName
  if (token) {
    if (to.path == "/login") {
      next({ path: "/" })
    } else {
       if (userInfo) {
      next()
       } else {
         try {
        await userInfoStore.getInfo()
       next()
      } catch (error) {
        removeToken()
      }
    }
    }
  } else {
   next()
  }
});

// //使用全局后置钩子配置关闭进度条
// router.afterEach(() => {
//   NProgress.done();
// });

// 导出路由
export default router;
