<template>
  <div class="headerContainer">
    <!-- 头部左侧区域 -->
    <div class="left">
      <ul>
        <li @click="HighlightHandler(index,)"  v-for="(item,index) in findAllTypeList" :key="item.tid">
          <a :class="{ active: item.isHighlight }" href="javascript:;">{{item.tname}}</a>
        </li>
      </ul>
    </div>
    <!-- 头部右侧区域 -->
    <div class="right">
      <div class="rightInput" style="margin-right: 50px;">
        <el-input v-model="keywords" placeholder="搜索最新头条"></el-input>
        <!-- <el-button   type="primary">搜索</el-button> -->
      </div>

  
      <!-- 用户登录以后的展示 -->
      <div class="btn-dropdown">
      <!-- 用户没有登录的时候的展示 -->
     
      <div v-if="nickName" style="display: flex; justify-content: center; align-items: center;">
             <el-dropdown>
          <el-button type="primary">
          您好:{{ nickName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handlerNews">发布新闻</el-dropdown-item>
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>浏览记录</el-dropdown-item>
              <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
       <div v-else class="containerButton">
          <el-button size="small" style="background: #212529; color: #aea7a2" @click="toLogin">登录</el-button>
          <el-button size="small" style="background: #ffc107; color: #684802" @click="toRegister">注册</el-button>
        </div>
      
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Header'
})
</script>

<script setup>
import { getfindAllTypes, isUserOverdue } from '../api/index'
import { ref, onMounted , getCurrentInstance ,watch, onUpdated} from "vue"
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'
import { removeToken } from '../utils/token-utils' 
import pinia from '../stores/index';
import { useUserInfoStore } from '../stores/userInfo'
const userInfoStore = useUserInfoStore(pinia)
const nickName = ref("")
// 获取到 全局事件总线
const { Bus } = getCurrentInstance().appContext.config.globalProperties
const router = useRouter()
const keywords = ref("") // 收集搜索最新头条参数
//监视搜索参数的变化 ,当搜索参数变化的时候给HeadlineNews组件传递数据
watch(keywords, (newVal) => {
  Bus.emit('keyword', newVal)
})
const findAllTypeList = ref([])//所有头条分类
const toLogin = () => {
router.push({ name: "Login" });
}
//点击去注册页面
const toRegister = () => {
  router.push({ name: "Register" });
}
const getList = async () => {
  let result = await getfindAllTypes()
  // 遍历数据添加高亮标识
  result.forEach((item) => {
    item.tid = item.tid
    item.tname = item.tname
    item.isHighlight = false
  })
  // 添加微头条数据
  result.unshift({
    isHighlight: true,
    tid: 0,
    tname: "微头条"
  })
  findAllTypeList.value = result
}
// 页面挂载的生命周期回调
onUpdated(() => {
  nickName.value = userInfoStore.nickName
})
onMounted(() => {
  getList()
})

//点击切换高亮的回调(排他思想)
const HighlightHandler = (index) => {
  findAllTypeList.value.forEach((item) => {
    item.isHighlight = false
  })
  // 切换高亮的时候把tid传给HeadlineNews组件
  findAllTypeList.value[index].isHighlight = true
  Bus.emit('tid', findAllTypeList.value[index].tid)
}

// 点击退出登录的回调
const Logout = () => {
  removeToken()
  userInfoStore.initUserInfo()
  nickName.value = ""
  router.go({ name: "HeadlineNews" });
}

//点击发布新闻的回调
const handlerNews = async () => {
  //发送请求判断用户是否token过期
  await isUserOverdue()
  router.push({ name: "addOrModifyNews" });
}
</script>

<style>
.el-dropdown {
  vertical-align: top;
  width: 100px;
}

.el-dropdown+.el-dropdown {
  margin-left: 15px;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>

<style lang="less" scoped>
.headerContainer {
  width: 100%;
  height: 60px;
  background: #212529;
  display: flex;
  justify-content: space-around;
  .left {
    ul {
      display: flex;
      li {
        list-style: none;
        margin-left: 20px;
        a:-webkit-any-link {
          text-decoration: none;
          color: #59646b;
          &.active {
            color: #c0adab;
          }
        }
      }
    }
  }
  .right {
    .containerButton {
      display: flex;
      align-items: center;
    }
    line-height: 60px;
    display: flex;
    flex-wrap: nowrap;
    .rightInput {
      display: flex;
       align-items: center;
      :deep(.el-input__inner) {
        height: 30px;
        width: 150px;
      }
    }
    .btn-dropdown{
      display: flex;
      align-items: center;
    }
    :deep(.el-button) {
      margin: 0 0 0 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}


.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>


















