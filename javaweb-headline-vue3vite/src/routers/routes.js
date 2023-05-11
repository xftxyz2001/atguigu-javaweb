
export const staticRoutes = [
  {
    path: "/",
    redirect: "/headlinenews",
  },
  {
    // 头条
    path: "/headlinenews",
    component: () => import("../pages/HeadlineNews/index.vue"),
    name: "HeadlineNews",
  },
  {
    //头条详情
    path: "/detail",
    component: () => import("../pages/Detail/index.vue"),
    name: "Detail",
  },
  {
    // 登录
    path: "/login",
    component: () => import("../pages/Login/index.vue"),
    name: "Login",
  },
  {
    //注册
    path: "/register",
    component: () => import("../pages/Register/index.vue"),
    name: "Register",
  },
   {
    //发布新闻的页面
    path: "/addormodifynews",
    component: () => import("../pages/addOrModifyNews/index.vue"),
    name: "addOrModifyNews",
  },
];
