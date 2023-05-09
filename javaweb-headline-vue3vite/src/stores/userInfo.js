
import { defineStore } from 'pinia';
import { getToken, removeToken, setToken } from '../utils/token-utils';
import { getLogin,getUserInfo } from '../api/index';


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
      const result = await getLogin(loginForm)
      // 请求成功后, 取出token保存  pinia和local中
      const token = result.token
      
      this.token = token
      setToken(token)
    },
    async getInfo () {
      const result = await getUserInfo()
      this.nickName = result.loginUser.nickName
      this.uid = result.loginUser.uid
    },
    initUserInfo(){
      removeToken()
      this.nickName = ""
      this.uid = ""
      console.log('1111111111');
      
    }

  },
  

});