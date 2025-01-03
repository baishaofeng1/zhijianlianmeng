<template>
  <TopNavComponent />
  <SwiperComponent :images="banners" />
  <div class="nav">
    <div v-for="(item, index) in navData" :key="index" class="item" @click="onItem(item.id)">
      <img :src="item.image" alt="">
      <span>{{ item.text }}</span>
    </div>
  </div>
  <div class="info" @click="onBeautyInfo">
    <h3>美甲资讯</h3>
    <p>年会不能错过的款，美呆了~</p>
    <span class="iconfont icon-jiantouyou"></span>
  </div>
  <div class="recommend">
    <div class="hot">
      <h3>热门活动</h3>
    </div>
    <div class="opt">
      <h3>优选店铺</h3>
    </div>
  </div>
  <RollComponent :rollInfo="newShopInfo">
    <div class="new-shop-content" v-if="newGoodsLoading">
      <div class="new-shop-item" v-for="(item, index) in newGoods" :key="index">
        <img :src="item.image" alt="">
        <p class="new-shop-title">{{ item.title }}</p>
        <span class="new-shop-price">{{ item.price }}元/月</span>
      </div>
    </div>
    <div class="skeleton-newShop" v-else>
      <div class="skeleton-item" v-for="(index) in 2" :key="index">
        <van-skeleton-image class="image" />
        <van-skeleton-paragraph />
        <van-skeleton-paragraph />
      </div>
    </div>
  </RollComponent>
  <div class="ad">
    <img src="../../assets/images/onlineimg.png" alt="">
  </div>
  <RollComponent :rollInfo="personStoreInfo">
    <div class="person-content" v-if="personLoading">
      <div class="person-item" v-for="(item, index) in personStore" :key="index">
        <img :src="item.image" alt="">
        <p class="person-title">{{ item.name }}</p>
        <span class="person-price">{{ item.desc }}</span>
      </div>
    </div>
    <div class="skeleton-newShop" v-else>
      <div class="skeleton-item" v-for="(index) in 2" :key="index">
        <van-skeleton-image class="image" />
        <van-skeleton-paragraph />
        <van-skeleton-paragraph />
      </div>
    </div>
  </RollComponent>
  <div class="recommend-main">
    <CardComponent :cardData="recommendgoods" recommendTitle="为你推荐" v-if="recommendgoodsLoading" />
    <van-empty v-else image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" image-size="80"
      description="等待加载..." />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { useRouter } from "vue-router";
import TopNavComponent from "@/components/TopNavComponent.vue";
import SwiperComponent from "@/components/SwiperComponent.vue";
import RollComponent from "@/components/RollComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import { getCaroursel, getNewGoods, getPersonStore, getRecommendgoods } from "../../api/Home/index";
import nav1 from "../../assets/images/nav1.png"
import nav2 from "../../assets/images/nav2.png"
import nav3 from "../../assets/images/nav3.png"
import nav4 from "../../assets/images/nav4.png"
import nav5 from "../../assets/images/nav5.png"

const router = useRouter();

interface IImage {
  image: string,
  title: string,
  url: string
}

const banners = ref<IImage[]>([])

onMounted(async () => {
  const res = await getCaroursel();
  if (res.data.status === 200) {
    banners.value = res.data.data;
  }
  // getCaroursel().then(res =>{
  //   console.log(res.data.data);
  // })
})

/**
 * 最新商品
 */
const newGoodsLoading = ref<boolean>(false)

interface INewGoods {
  id: number,
  image: string,
  title: string,
  price: string
}
const newGoods = ref<INewGoods[]>([])
const newShopInfo: IRoll = {
  title: "最新商铺",
  all: "查看全部"
}

onMounted(async () => {
  const res = await getNewGoods();
  if (res.data.status === 200) {
    newGoods.value = res.data.data;
    newGoodsLoading.value = true
  }
})

/**
 * 人才库
 */
const personLoading = ref<boolean>(false)

interface IPersonStore {
  image: string,
  name: string,
  desc: string
}
interface IRoll {
  title: string,
  all: string
}
const personStore = ref<IPersonStore[]>([])
const personStoreInfo: IRoll = {
  title: "人才库",
  all: "查看全部"
}
onMounted(async () => {
  const res = await getPersonStore();
  if (res.data.status === 200) {
    personStore.value = res.data.data;
    personLoading.value = true
  }
})

/**
 * 为你推荐
 */
interface IRecommendgoods {
  id: number,
  image: any,
  title: string,
  price: string
}

const recommendgoodsLoading = ref<boolean>(false)
const recommendgoods = ref<IRecommendgoods[]>([])
onMounted(async () => {
  const res = await getRecommendgoods();
  if (res.data.status === 200) {
    recommendgoods.value = res.data.data;
    recommendgoodsLoading.value = true
  }
})

// 导航数据
const navData = [
  {
    id: 1,
    text: "转让出租",
    image: nav1
  },
  {
    id: 2,
    text: "招聘求职",
    image: nav2
  },
  {
    id: 3,
    text: "流行产品",
    image: nav3
  },
  {
    id: 4,
    text: "培训课程",
    image: nav4
  },
  {
    id: 5,
    text: "批发进货",
    image: nav5
  }
]

/**
 * nav点击事件
 */
const onItem = (value: number) => {
  console.log(value);
}

/**
 * 美甲资讯详情页跳转
 */
const onBeautyInfo = () => {
  router.push("/beauty")
}


</script>
<style lang="less" scoped>
.nav {
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 40px;
    }

    span {
      display: block;
      font-size: 12px;
      margin-top: 10px;
    }
  }
}

.info {
  background: #fff;
  display: flex;
  padding: 10px 0;
  align-items: center;
  border-top: 1px solid #f3f4f5;

  h3 {
    font-size: 14px;
    color: #999;
    font-weight: 400;
    padding: 0 20px;
    border-right: 1px solid #f3f4f5;
  }

  p {
    font-size: 14px;
    margin-left: 10px;
  }

  span {
    flex: 1;
    text-align: right;
    padding-right: 10px;
  }
}

.recommend {
  width: 100%;
  background-color: #fff;
  margin-top: 5px;
  display: flex;
  padding: 10px;
  box-sizing: border-box;

  div {
    flex: 1;
    height: 80px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hot {
    background: url("../../assets/images/home-cb1.png");
    background-position: center;
    background-size: cover;
    margin-right: 5px;
  }

  .opt {
    background: url("../../assets/images/home-cb2.png");
    background-position: center;
    background-size: cover;
    margin-left: 5px;
  }
}

// 最新商品样式
.new-shop-content {
  display: flex;

  .new-shop-item {
    margin-right: 15px;

    img {
      display: block;
      width: 230px;
      height: 130px;
    }

    .new-shop-title {
      white-space: normal;
      word-break: break-word;
      font-size: 14px;
      text-align: left;
      padding: 10px;
    }

    .new-shop-price {
      display: block;
      font-size: 14px;
      width: 100%;
      text-align: left;
      padding: 0 10px 10px 10px;
      color: #820085;
    }
  }
}

.skeleton-newShop {
  height: 208px;
  width: 100%;
  display: flex;

  .skeleton-item {
    margin: 10px;
    width: 230px;

    image {
      width: 230px;
    }
  }
}

// 广告图
.ad {
  background: #fff;
  margin: 5px auto;

  img {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
  }
}

// 人才库
.person-content {
  display: flex;

  .person-item {
    margin-left: 10px;

    img {
      width: 110px;
      height: 170px;
      border-radius: 5px;
    }

    p {
      font-size: 16px;
      margin: 5px 0;
    }

    span {
      display: block;
      font-size: 14px;
      color: #999;
      padding-bottom: 10px;
    }
  }
}
</style>
