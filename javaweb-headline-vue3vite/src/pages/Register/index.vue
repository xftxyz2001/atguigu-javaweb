<template>
  <div class="register-container">
    <el-form
      :model="registerForm"
      ref="formRef"
      label-width="80px"
      class="register-form"
      :rules="registerRules"
    >
      <h2>用户注册</h2>
          <el-form-item label="姓名" prop="nickName">
          <el-input
            v-model="registerForm.nickName"
            autocomplete="off"
            ref="nickName"
            name="nickName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerForm.username"
          autocomplete="off"
          ref="username"
          name="username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input
          type="password"
          v-model="registerForm.userPwd"
          ref="userPwd"
          name="userPwd"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- prop="confirmPassword" -->
      <el-form-item label="确认密码"  prop="confirmPassword">
        <el-input
          type="password"
          v-model="registerForm.confirmPassword"
          autocomplete="off"
          ref="confirmPassword"
          name="confirmPassword"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button type="danger" @click="resetForm">重置</el-button>
        <el-button type="success" @click="goLogin">去登录</el-button>
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
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance } from 'element-plus';
import { registerValidateApi, registerApi } from "../../api/index"
const router = useRouter()
// 初始化注册参数
const registerForm = ref({
  username: "",
  userPwd: "",
  confirmPassword: "",
  nickName:''
})
const formRef = ref<FormInstance>()
  // 校验规则
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length < 4) {
    callback(new Error('用户名长度不能小于4位'))
  } else {
    callback()
  }
}
// 校验规则
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}
// 校验规则
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    callback()
  }
}
// 校验规则
const validateNickName = (rule: any, value: any, callback: any) => {
  if (value.length >= 2  && value.length  <= 6  ) {
    callback()
  } else {
    callback(new Error('姓名必须在2-6位'))
}
}
// 校验规则
const registerRules = {
  nickName: [{ required: true, trigger: 'blur', validator: validateNickName }],
  username: [{ required: true, validator: validateUsername }],
  userPwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
  confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
}

//点击注册的回调
const register = async () => {
  await formRef.value?.validate()
  if (registerForm.value.userPwd == registerForm.value.confirmPassword) {
    // 调用用户名校验接口
    await registerValidateApi(registerForm.value.username)
    //  整理参数
    const obj = {
      username: "",
      userPwd: "",
      nickName: ''
    }
    obj.username = registerForm.value.username
    obj.userPwd = registerForm.value.userPwd
    obj.nickName = registerForm.value.nickName
    //  调用注册接口
    await registerApi(obj)
    formRef.value?.resetFields()
    ElMessage.success("注册成功")
    } else {
      return ElMessage.error("密码和确定密码必须一致")
    }
    
}
//点击去登录的回调
const goLogin = () => {
  router.push({path:"/login"})
}

//点击重置的回调
const resetForm = () => {
  //重置表单
  formRef.value?.resetFields()
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
