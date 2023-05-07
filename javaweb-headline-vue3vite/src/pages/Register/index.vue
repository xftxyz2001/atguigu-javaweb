<template>
  <div class="register-container">
    <el-form
      :model="registerForm"
      ref="registerForm"
      label-width="80px"
      class="register-form"
    >
      <h2>用户注册</h2>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerForm.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="registerForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          autocomplete="off"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:'Register'
  })
</script>
<script lang="ts" setup>
import { ref } from "vue"
  const registerForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
})

//点击注册的回调
const  register = () => {
  // this.$refs.registerForm.validate((valid) => {
  //   if (valid) {
  //     // 这里可以使用axios或其他HTTP库向服务器发送注册请求
  //     console.log(
  //       `用户名：${this.registerForm.username}，密码：${this.registerForm.password}`
  //     );
  //   } else {
  //     return false;
  //   }
  // });
  console.log('点击了注册');
  
}

//点击重置的回调
const resetForm = () => {
  console.log('点击了重置');
  
  // this.$refs.registerForm.resetFields();
}
  
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.register-form {
  width: 400px;
  text-align: center;
}
</style>
