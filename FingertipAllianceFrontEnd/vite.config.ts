import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  //访问路径--防止打包后放在服务器的子目录，这里需要配置
  base:"/h5/iwenwiki",
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    host:"0.0.0.0",
    proxy:{
      "^/api":{
        target:"http://192.168.0.103:3000/",
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/,"")
      }
    }
  }
})
