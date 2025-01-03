<template>
  <router-view />
</template>
<script setup lang="ts">
import {ref,reactive} from "vue"

console.log(import.meta.env);


</script>
<style lang="less">
// 公共导航返回按钮样式修改
.van-nav-bar__text {
    color: #684886 !important;
}
.van-nav-bar .van-icon {
    color: #684886 !important;
}
// 焦点轮播图样式
.van-swipe__indicator--active {
    background-color: #684886 !important;
}
</style>
