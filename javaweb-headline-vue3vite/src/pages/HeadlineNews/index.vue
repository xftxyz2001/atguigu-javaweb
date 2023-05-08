<template>
  <div class="container">
    <div class="listItem">
      <!-- 每一项头条列表 -->
      <div class="containerItem" v-for="item in pageData" :key="item.hid">
        <div>
          <span class="text">{{ item.title }}</span>
        </div>
        <div class="detail">
          <span>{{ item.type == 1 ? "新闻":item.type == 2 ? "体育": item.type == 3 ? "娱乐": item.type == 4 ? "科技" : "其他" }}</span>
          <span>{{item.pageViews}}浏览</span>
          <span>{{item.pastHours}}小时前</span>
        </div>
        <div>
          <el-button @click="toDetail(item.hid)" size="small"
            style="background: #198754; margin-left: 15px; color: #bbd3dc">查看全文</el-button>
          <el-button @click="handlerDelete(item.hid)" size="small" style="background: #dc3545; color: #bbd3dc">删除</el-button>
          <el-button size="small" style="background: #212529; color: #bbd3dc">修改</el-button>
        </div>
      </div>
  
      <!-- 分页器 -->
      <div style="margin-top: 20px">
        <el-pagination 
          v-model:current-page="findNewsPageInfo.pageNum"
          v-model:page-size="findNewsPageInfo.pageSize" 
          @size-change="getPageList"
          @current-change="getPageList"
          :page-sizes="[3,5,7]" 
          background
          layout="prev, pager, next , ->, sizes, total" 
          :total="totalSize" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getfindNewsPageInfo , removeByHid } from "../../api/index"
 import { defineComponent } from 'vue'
  export default  defineComponent({
    name:'HeadlineNews'
  })
</script>
<script lang="ts" setup>
import { ref, onMounted, getCurrentInstance, onBeforeMount, watch } from "vue"
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// const  {Bus}  = getCurrentInstance()?.appContext.config.globalProperties
const  { Bus } = getCurrentInstance()?.appContext.config.globalProperties

const router = useRouter()
// const currentPage = ref(1) // 当前页码
// const pageSize = ref(3) // 每页数量
// const {Bus} = getCurrentInstance()?.appContext.config.globalProperties

const findNewsPageInfo = ref(
  {
    keyWords: "", // 搜索标题关键字
    type: 0,           // 新闻类型
    pageNum: 1,        // 页码数
    pageSize: 3,     // 页大小
  }
)
const totalSize = ref(0)
const pageData = ref<[{
  hid: number,
  pageViews: null,
  pastHours: null,
  publisher: null,
  title: "",
  type: null
}]>()




//接收header组件用户搜索的数据
Bus.on('keyword', (keywords: string) => {
  findNewsPageInfo.value.keyWords = keywords
})
// header点击切换高亮的时候传递过来的tid
Bus.on('tid', (type: number) => {
  findNewsPageInfo.value.type = type
})
// 监视初始化参数type的变化,当type发生改变的时候重新发送请求获取列表数据
watch(() => findNewsPageInfo.value.type, () => {
  getPageList()
},)
// 初始化请求分页列表数据
const getPageList = async () => {
  let result = await getfindNewsPageInfo(findNewsPageInfo.value)
  pageData.value = result.pageInfo.pageData
 findNewsPageInfo.value.pageNum = result.pageInfo.pageNum
 findNewsPageInfo.value.pageSize = result.pageInfo.pageSize
 totalSize.value = +result.pageInfo.totalSize
}
// 组件挂载的生命周期钩子
onMounted(() => {
  getPageList()
})
// 点击查看全文的回调
const toDetail = (hid: any) => {
  router.push({ name: "Detail" ,query:{ hid }});
}

// 点击删除的回调
const handlerDelete = async (id: any) => {
  
  await removeByHid(id)
  ElMessage.success('删除成功!')
  //重新获取列表请求
  getPageList()
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  // 列表样式
  .listItem {
    .containerItem {
      margin-top: 20px;
      border-radius: 10px;
      border: 2px solid #ebebeb;
      width: 600px;
      height: 120px;

      div {
        margin-top: 10px;
      }

      .text {
        margin-left: 15px;
        color: #353a3f;
      }

      .detail {
        span {
          margin-left: 15px;
          color: #8b778a;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
