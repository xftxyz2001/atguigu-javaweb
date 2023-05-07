<template>
  <div class="login-container">
    <el-form
      :model="loginForm"
      ref="loginForm"
      label-width="80px"
      class="login-form"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="primary" @click="toRegister">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:''
  })
</script>
<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from 'vue-router'
const router = useRouter()

const loginForm = ref({
      username: "",
      password: "",
})

const login = () => {
  console.log('点击登录');
  
  // this.$refs.loginForm.validate((valid) => {
  //   if (valid) {
  //     // 这里可以使用axios或其他HTTP库向服务器发送登录请求
  //     console.log(
  //       `用户名：${this.loginForm.username}，密码：${this.loginForm.password}`
  //     );
  //   } else {
  //     return false;
  //   }
  // });
}

const toRegister = ()=> {
  router.push({ name: "Register" });
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-form {
  width: 400px;
  text-align: center;
}
</style>
