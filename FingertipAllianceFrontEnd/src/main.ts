import "./assets/css/main.css"
import "./assets/font/iconfont.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import BaiduMap from 'vue-baidu-map-3x';

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.use(pinia)
app.use(router)
app.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥
  ak: '3Upj36jwXmVtMp9banronkP1SLa5PJbk',
});

app.mount('#app')
