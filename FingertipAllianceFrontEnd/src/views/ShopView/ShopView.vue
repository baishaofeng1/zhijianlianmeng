<template>
  <TopNavComponent />
  <SwiperComponent :images="banners" />
  <ShopNavView />
  <div class="ad">
    <div class="ad-one">
      <img src="../../assets/images/ad-1.jpg" alt="">
    </div>
    <div class="ad-two">
      <img src="../../assets/images/ad-2.jpg" alt="">
    </div>
  </div>
  <ShopSeckillView />
  <div class="suit">
    <img src="../../assets/images/t1.jpg" alt="">
  </div>
  <RollComponent :rollInfo="suit">
    <div class="suit-content">
      <div class="suit-item" v-for="(item, index) in suitList">
        <img :src="item.image" alt="">
        <p>{{ item.title }}</p>
        <span>{{ item.price }}元起</span>
      </div>
    </div>
  </RollComponent>
  <div class="discount">
    <h3>特惠专题</h3>
    <img src="../../assets/images/d1.png" alt="">
    <img src="../../assets/images/d2.jpg" alt="">
  </div>
  <CardComponent recommendTitle="单品推荐" :cardData="singleGoods" />
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { getCaroursel, getRecommendgoods } from "../../api/Home/index"
import { getSuit } from "../../api/Shop/index"
import TopNavComponent from "@/components/TopNavComponent.vue";
import SwiperComponent from "@/components/SwiperComponent.vue";
import ShopNavView from "./ShopNavView.vue";
import ShopSeckillView from "./ShopSeckillView.vue";
import RollComponent from "@/components/RollComponent.vue";
import CardComponent from "@/components/CardComponent.vue";

interface IBanners {
  image: string,
  title: string,
  url: string
}
const banners = ref<IBanners[]>([])

onMounted(async () => {
  const res = await getCaroursel()
  if (res.status === 200) {
    banners.value = res.data.data
  }
})

/**
 * 精选套装
 */
interface ISuit {
  title: string,
  all: string
}
const suit: ISuit = reactive({
  title: "精选套装",
  all: "查看全部"
})

interface ISuitList {
  image: string,
  title: string,
  price: string
}
const suitList = ref<ISuitList[]>([])

onMounted(async () => {
  const res = await getRecommendgoods()
  if (res.status === 200) {
    suitList.value = res.data.data
  }
})

/**
 * 单品推荐
 */
interface ISingleGoods {
  id: number,
  image: any,
  title: string,
  price: string
}
const singleGoods = ref<ISingleGoods[]>([])

onMounted(async () => {
  const res = await getRecommendgoods()
  if (res.status === 200) {
    singleGoods.value = res.data.data
  }
})

</script>
<style lang="less" scoped>
.ad {
  width: 100%;
  height: 100px;
  display: flex;
  // margin: 10px 0;
  background-color: #fff;
  overflow: hidden;

  .ad-one {
    margin-right: 2px;

    img {
      width: 100%;
    }
  }

  .ad-two {
    margin-left: 2px;

    img {
      width: 100%;
    }
  }
}

.suit {
  img {
    width: 100%;
  }
}

.suit-content {
  display: flex;
  padding: 10px;
  box-sizing: border-box;

  .suit-item {
    margin-right: 10px;
    width: 100px;

    img {
      width: 100px;
      height: 100px;
    }

    p {
      white-space: normal;
      word-break: break-word;
      font-size: 14px;
      text-align: left;
      margin-top: 5px;
    }

    span {
      font-size: 12px;
      color: #F23D52;
      text-align: left;
      display: block;
      margin-top: 5px;
    }
  }
}

.discount {
  background: #fff;
  margin: 5px 0;

  h3 {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    padding: 15px 0;
  }

  img {
    width: 100%;
    // height: 120px;
  }
}
</style>
