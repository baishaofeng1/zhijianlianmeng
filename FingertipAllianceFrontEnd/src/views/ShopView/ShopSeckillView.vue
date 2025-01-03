<template>
  <div class="seckill">
    <h3 class="title">限时秒杀</h3>
    <div class="list">
      <div class="item" v-for="(item, index) in seckillList" :key="index">
        <img :src="item.images" alt="">
        <p>{{ item.name }}</p>
        <span>{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import image1 from "../../assets/images/k1.png"
import image2 from "../../assets/images/k2.png"
import image3 from "../../assets/images/k3.png"
import image4 from "../../assets/images/k4.png"
import image5 from "../../assets/images/k5.png"
import image6 from "../../assets/images/k6.png"

const seckillList = [
  {
    images: image1,
    name: "北欧408色",
    price: "13.5元起"
  },
  {
    images: image2,
    name: "北欧408色",
    price: "13.5元起"
  },
  {
    images: image3,
    name: "北欧408色",
    price: "13.5元起"
  }
  , {
    images: image4,
    name: "北欧408色",
    price: "13.5元起"
  },
  {
    images: image5,
    name: "北欧408色",
    price: "13.5元起"
  },
  {
    images: image6,
    name: "北欧408色",
    price: "13.5元起"
  }
]

</script>
<style lang="less" scoped>
.seckill {
  background: #fff;

  .title {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    padding: 10px 0;
  }

  .list {
    // display: flex;
    overflow: hidden;
    clear: both;
    padding: 10px;
    padding-top: 0;

    .item {
      width: 32%;
      float: left;
      margin-right: 2%;
      margin-bottom: 20px;

      img {
        width: 100%;
        border-radius: 5px;
      }

      p {
        text-align: center;
        font-size: 14px;
        padding: 5px;
      }

      span {
        display: block;
        text-align: center;
        font-size: 14px;
        color: #F23D52;
      }
    }

    .item:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
