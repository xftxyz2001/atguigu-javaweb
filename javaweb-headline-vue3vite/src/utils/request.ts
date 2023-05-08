import axios, { type AxiosResponse } from "axios";
import { ElMessage } from 'element-plus';

// 配置新建一个 axios 实例
const service = axios.create({
  baseURL: "/app-dev/",
  timeout: 50000,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 从pinia中获取到token
  // const userInfoStore = useUserInfoStore(pinia); //在不是模板中药获取pinia中的数据，需要使用pinia
  // 获取token
  // const token = userInfoStore.token;
  // 在请求头中使用添加token属性。
  // (config.headers as any)["token"] = token; //因为headers没有设置类型，不知道是否可以添加token这个属性
  return config;
});

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 判断响应状态码
    if (response.data.code == 501) {
      return ElMessage.error("用户名有误")
    }else if (response.data.code == 503) {
      return ElMessage.error("密码有误")
    } else if (response.data.code == 505) {
      return ElMessage.error("用户名占用")
    }
    const res = response.data;
    return res.data; /* 返回成功响应数据中的data属性数据 */
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export default service;
