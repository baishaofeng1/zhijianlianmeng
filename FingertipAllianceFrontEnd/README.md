# FingertipAllianceFrontEnd

## 项目技术
Vue3 + Vite + TypeScript + ...

## 两个端：
1. FingertipAllianceFrontEnd: 前端
2. FingertipAllianceServer: 后端(Node+Express+MySQL,目的就是提供数据)

## 项目环境搭建
- 工具链: npm create vue@latest
- 安装依赖
    - axios
    - less less-loader
    - vant


### vant UI组件库按需加载
- 安装依赖: `npm i @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import -D`
- 修改`vite.config.ts`文件
```
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
    }
  }
})
```

## Vue2和Vue3的模板
设置 - 用户设置 - 搜索vue.json 修改
```
{
	"vue3": {
		"prefix": "vue3",
		"body": [
			"<template>",
			"  <div class=\"\">",
			"",
			"  </div>",
			"</template>",
			"<script setup lang=\"ts\">",
			"import {ref,reactive} from \"vue\"",
			"",
			"</script>",
			"<style lang=\"less\" scoped>",
			"",
			"</style>",
			""
		],
		"description": "快速创建vue3模板"
	},
	"vue2": {
		"prefix": "vue2",
		"body": [
			"<template>",
			"  <div class=\"\">",
			"",
			"  </div>",
			"</template>",
			"<script>",
			"",
			"</script>",
			"<style lang=\"less\" scoped>",
			"",
			"</style>",
			""
		],
		"description": "快速创建vue2模板"
	}
}
```


## 本地存储持久化
1. 安装依赖：npm install --save pinia-plugin-persist
2. 使用依赖

## 跨域问题
1. 跨域产生的原因：JS不允许同源策略：端口、域名、协议不同，都会引起跨域
2. 解决方案
	- 后端：cors
	- 前端：proxy代理  参考vite.config.ts文件
3. 开发环境与生产环境
	- 后端解决可以用于生产环境
	- 前端解决，只能用于开发环境，如果是生产环境，还需要额外处理

## 百度地图
1. 使用 vue-baidu-map-3x 插件
2. 参考网址：https://map.heifa.site/doc/index.html


## 关于token
参考网址：https://ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html


## 支付宝支付：
大家需要在手机上安装一个支付宝沙箱