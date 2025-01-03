<template>
  <div class="nav-container">
    <div class="nav" v-for="(item,index) in navs" :key="index">
      <span class="iconfont" :class="item.icon" :style="{color: item.color}"></span>
      <span class="nav-title">{{ item.name }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"

const navs = [
  {
    name:"甲油胶",
    icon:"icon-a-camerashot",
    color:"#2a83fe"
  },
  {
    name:"潮流饰品",
    icon:"icon-art",
    color:"#fd3761"
  },
  {
    name:"美甲工具",
    icon:"icon-clarity",
    color:"#2b91e2"
  },
  {
    name:"美睫产品",
    icon:"icon-effects",
    color:"#00b478"
  },
  {
    name:"美甲灯",
    icon:"icon-a-Closeupshot",
    color:"#2a83fi"
  },
  {
    name:"笔系列",
    icon:"icon-Shadow",
    color:"#2a8999"
  },
  {
    name:"批发套装",
    icon:"icon-Colors",
    color:"#6753fe"
  },
  {
    name:"全部分类",
    icon:"icon-Scene",
    color:"#2a00fe"
  }
]

</script>
<style lang="less" scoped>
.nav-container{
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  clear: both;
  // text-align: center;
  .nav{
    width: 25%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    .iconfont{
      display: block;
      background-color: #f3f4f5;
      width: 50px;
      height: 50px;
      font-size: 25px;
      text-align: center;
      border-radius: 50%;
      line-height: 50px;
    }
    .nav-title{
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
</style>
