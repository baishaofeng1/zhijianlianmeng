<template>
  <div class="roll">
    <div class="roll-header">
      <h3>{{ props.rollInfo.title }}</h3>
      <span class="all">{{ props.rollInfo.all }}<span class="iconfont icon-jiantouyou"></span></span>
    </div>
    <div class="roll-main">
      <slot>默认内容</slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"

interface IRoll {
  title: string,
  all: string
}

const props = defineProps<{
  rollInfo: IRoll
}>()

</script>
<style lang="less" scoped>
// 左右滚动
.roll {
  background-color: #fff;
  margin-top: 5px;

  .roll-header {
    width: 100%;
    padding: 10px;
    height: 40px;
    // line-height: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 16px;
      font-weight: 400;
    }

    .all {
      color: #999;
      font-size: 14px;

      span {
        font-size: 12px;
      }
    }
  }

  .roll-main {
    text-align: center;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  }
}
</style>
