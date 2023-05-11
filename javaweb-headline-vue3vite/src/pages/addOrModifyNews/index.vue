<template>
  <el-card class="box-card AddNewsContainer">
    <el-form size="default">
      <el-form-item label="文章标题">
        <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item style="margin: 50px 0;" label="文章内容">
        <el-input v-model="formData.article" type="textarea" rows="8"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-select v-model="formData.type" placeholder="请选择文章类别">
          <el-option v-for="item in article" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form-item>
      <el-button   @click="handlerCancel">取消</el-button>
      <el-button type="primary"  @click="handlerSave">保存</el-button>
    </el-form-item>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isUserOverdue } from '../../api/index'
export default defineComponent({
  name: 'AddNews'
})
</script>
<script lang="ts" setup>
import { getFindHeadlineByHid , saveOrAddNews, issueNews } from "../../api/index"
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ElMessage, FormInstance } from 'element-plus'
const router = useRouter() 
const route = useRoute() 


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


const formData = ref({
  title: "",   // 文章标题
  article: "", // 文章内容
  type: ""     // 文章类别
})
//初始化文章类别数据
const article = [
  {
    type: "1",
    name: "新闻"
  },
  {
    type: "2",
    name: "体育"
  },
  {
    type: "3",
    name: "娱乐"
  },
  {
    type: "4",
    name: "科技"
  },
  {
    type: "5",
    name: "其他"
  }
]
// 如果是点击修改的话 路由就会携带hid参数  就要发送请求 获取数据回显
const clickModifyEcho = async () => {
  if (!route.query.hid)  return
    let result = await getFindHeadlineByHid(route.query.hid)
    formData.value.title = result.headline.titlex
  formData.value.article = result.headline.article
     
    formData.value.type = result.headline.type === 1 ? "新闻" : result.headline.type === 2 ? "体育" : result.headline.type === 3 ? "娱乐" : result.headline.type === 4 ? "科技" : "其他" 
}
//页面挂载生命周期
onMounted(() => {
  clickModifyEcho()
})
//点击取消的回调
const handlerCancel = () => {
  router.back()
}
//点击保存的回调
const handlerSave = async () => {
    //发送请求判断用户是否token过期
  await isUserOverdue()
const Obj = {...formData.value}

  //整理请求参数
//  Obj.hid = userInfoStore.uid.toString()  //添加用户id 让后端知道谁添加的
 Obj.hid = route.query.hid  //添加用户id 让后端知道谁添加的
// 判断type类型
 if(Obj.type == "新闻" ) Obj.type = "1"
 if(Obj.type == "体育" ) Obj.type = "2"
 if(Obj.type == "娱乐" ) Obj.type = "3"
 if(Obj.type == "科技" ) Obj.type = "4"
 if (Obj.type == "其他") Obj.type = "5"
  //发送请求
  if (route.query.hid) {
    await saveOrAddNews(Obj)
    ElMessage.success("修改成功")
  }
  else {
    await issueNews(formData.value)
    ElMessage.success("添加成功")
    }
    router.push({ name: "HeadlineNews" });
}


</script>

<style lang="less" scoped>
.AddNewsContainer {
  width: 600px;
  margin: 150px auto;
}
</style>