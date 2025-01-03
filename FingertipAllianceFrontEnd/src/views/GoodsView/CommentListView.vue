<template>
  <CommentListHeader :title="title" />
  <CommentView :comment="item" v-for="(item,index) in allComment" :key="index"/>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { getGoodsCommentAll } from "../../api/Goods/index"
import CommentListHeader from "../../components/PubHeaderComponent.vue"
import CommentView from "./CommentView.vue";

const title = "全部评价"

/**
 * 获取商品全部评价
 */
const allComment = ref([])
onMounted(async () => {
  const res = await getGoodsCommentAll();
  if (res.data.status === 200) {
    allComment.value = res.data.data;
  }
})

</script>
<style lang="less" scoped></style>
