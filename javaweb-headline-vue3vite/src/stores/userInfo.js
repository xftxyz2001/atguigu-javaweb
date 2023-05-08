
import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import { getUserInfo } from '../api/index';
import { ElMessage } from 'element-plus';


/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfoStore = defineStore('userInfo', {

	state: () => ({
    token: getToken(),
    nickName: '',
    uid: '',
  }),

	actions: {
    // 登陆的异步action
    async login (loginForm) {
       // 发送登陆的请求
      const result = await getUserInfo(loginForm)
      // 请求成功后, 取出token保存  pinia和local中
      const token = result.token
      this.nickName = result.nickName
      this.token = token
      setToken(token)
    },
    // 获取用户信息
    async loginForm (loginForm) {
      // 请求获取用户信息
      // const result = await getUserInfo(loginForm)
      // 请求成功后, 读取用户信息name和avatar, 保存到state
      // const {name, avatar, } = result
      // this.name = name
      // this.avatar = avatar

    },

    async reset () {

      // 如果当前有用户名, 请求退出登陆接口
        if (this.name) {
          //退出登录
        // await logoutApi() // 加await后, 下面的代码是在请求成功后执行的
      }

      // 删除local中保存的token
      removeToken()
      // 提交重置用户信息的mutation
      this.token = ''
      this.name = ''
      this.avatar = ''

      this.menuRoutes = [] // 清空菜单路由列表
      this.buttons = [] // 按钮权限列表
      // 重置注册的路由 => 只注册静态路由, 清除动态注册的路由
      resetRoute()
    },
	},
});