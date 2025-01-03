<template>
  <PubHeaderComponent title="人才详情" />
  <div class="details">
    <div class="left" @click="showImage">
      <img :src="personDetails?.image" alt="">
    </div>
    <div class="right">
      <div class="right-title">
        <span class="name">{{ personDetails?.name }}</span>
        <span class="career">美甲师</span>
      </div>
      <div class="right-content">
        <span>{{ personDetails?.sex }}｜</span>
        <span>{{ personDetails?.age }}岁｜</span>
        <span>{{ personDetails?.birthday }}｜</span>
        <span>{{ personDetails?.education }}</span>
      </div>
      <div class="age">工作经验：{{ personDetails?.age }}</div>
      <div class="price">{{ personDetails?.price }}元/月</div>
    </div>
  </div>
  <div class="introduce">
    <h3>个人介绍</h3>
    <p>{{ personDetails?.descs }}</p>
  </div>
  <div class="btn-content">
    <div class="btn">立即联系</div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { showImagePreview } from 'vant';
import { useRoute } from "vue-router";
import { getPersonDetails } from "../../api/Person/index"
import PubHeaderComponent from "@/components/PubHeaderComponent.vue";

const route = useRoute()

interface IPersonDetails {
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
const personDetails = ref<IPersonDetails>()

onMounted(async () => {
  const res = await getPersonDetails(route.params)
  if (res.status == 200) {
    personDetails.value = res.data.data
  }
})

const showImage = () => {
  if (personDetails.value?.image) {
    showImagePreview({
      images: [
        personDetails.value?.image
      ],
      closeable: true,
    });
  }
}

</script>
<style>
.van-image-preview{
  width: 100%;
}
</style>
<style lang="less" scoped>
.details {
  background: #fff;
  display: flex;
  padding: 15px 10px;
  box-sizing: border-box;

  .left {
    img {
      height: 100px;
      border-radius: 5px;
    }
  }

  .right {
    margin: auto 15px;

    .right-title {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .name {
        font-size: 20px;
        font-weight: 600;
        margin-right: 10px;
      }

      .career {
        height: 15px;
        border: 1px solid #684886;
        color: #684886;
        font-size: 12px;
      }
    }

    .right-content {
      font-size: 14px;
      color: #999999;
      margin-bottom: 5px;
    }

    .age {
      font-size: 14px;
      color: #999999;
      margin-bottom: 10px;
    }

    .price {
      font-size: 14px;
      color: #FF4444;
    }
  }
}

.introduce {
  background: #fff;
  margin-top: 5px;
  padding: 10px;
  box-sizing: border-box;

  h3 {
    font-weight: 400;
    font-size: 16px;
  }

  p {
    color: #999999;
    font-size: 14px;
    padding: 10px 0;
    letter-spacing: 1.5px;
  }
}

.btn-content {
  width: 100%;
  margin-top: 50px;
  text-align: center;

  .btn {
    width: 90%;
    height: 50px;
    line-height: 50px;
    background: #684886;
    color: #fff;
    border-radius: 5px;
    margin: 0 auto;
  }
}
</style>
