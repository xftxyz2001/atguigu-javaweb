
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
      console.log(result.loginUser.nickName,"33333333");
      const token = result.token
      this.nickName = result.loginUser.nickName
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


	},
});