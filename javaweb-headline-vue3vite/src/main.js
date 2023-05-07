
import router from "./routers/index";
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import App from './App.vue'
import mitt from 'mitt'
const app = createApp(App)
app.config.globalProperties.Bus = mitt()



app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(router)
app.mount('#app')

