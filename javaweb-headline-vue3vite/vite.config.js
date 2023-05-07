import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(
  () => {
    return{
      plugins: [vue()],
       // 这个不用一点点写, 但每个配置都要理解
    server: {
      port: 8001,
      open: true,
      proxy: {
        '/app-dev': {
          target: 'http://localhost:8080/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/app-dev/, '')
        }
      }
    }
    }
  }
 )
