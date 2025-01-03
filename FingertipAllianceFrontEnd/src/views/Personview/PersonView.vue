<template>
  <TopNavComponent />
  <div class="content">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="person-item" v-for="(item, index) in list" :key="item.id" @click="onPersonDetails(item.id)">
        <img :src="item.image" alt="">
        <div class="person-item-desc">
          <div class="item-title">
            <span class="name">{{ item.name }}</span>
            <div class="career">美甲师</div>
          </div>
          <div class="age">工作经验：{{ item.age }}年</div>
          <div class="price">{{ item.price }}元/月</div>
          <div class="descs">{{ item.descs }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { getPersonList } from "@/api/Person";
import { useRouter } from "vue-router";
import TopNavComponent from "@/components/TopNavComponent.vue";

const router = useRouter()

const loading = ref(false)
const finished = ref(false)
const page = ref<number>(1)

interface IList {
  id: number,
  image: string,
  name: string,
  age: string,
  price: string,
  descs: string,
  sex: string,
  birthday: string,
  education: string
}
const list = ref<IList[]>([])

const onLoad = () => {
  // 异步更新数据
  getPersonList({ page: page.value }).then(res => {
    if (res.data.status === 200) {
      page.value++
      // 数据合并
      list.value = list.value.concat(res.data.data)
    }
    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (res.data.status === 500) {
      finished.value = true;
    }

  })
}

const onPersonDetails = (id: number) => {
  router.push({
    name: "personDetails",
    params: { id }
  })
}

</script>
<style lang="less" scoped>
.content {
  background: #fff;
  padding: 10px;
  box-sizing: border-box;

  .person-item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #f3f4f5;

    img {
      width: 100px;
      border-radius: 5px;
    }

    .person-item-desc {
      padding: 10px;
      box-sizing: border-box;

      // width: 250px;
      .item-title {
        display: flex;
        margin-bottom: 5px;
        // height: 30px;
        align-items: center;

        .name {
          font-size: 22px;
          font-weight: 700;
          margin-right: 10px;
        }

        .career {
          height: 15px;
          border: 1px solid #684886;
          color: #684886;
          font-size: 12px;
          font-weight: 400;
        }
      }

      .age {
        font-size: 14px;
        color: #999999;
        margin-bottom: 15px;
      }

      .price {
        font-size: 14px;
        color: #FF4444;
        margin-bottom: 10px;
      }

      .descs {
        font-size: 14px;
        color: #999999;
        // /* 强制文字在同一行显示 */
        // white-space: nowrap;
        // /* 溢出部分隐藏 */
        // overflow: hidden;
        // /* 溢出时显示省略号 */
        // text-overflow: ellipsis;
      }
    }
  }
}
</style>
