<template>
  <div class="place-details-container">
    <div class="pd-header">
      <span @click="onBack" class="iconfont icon-fanhui"></span>
      <img class="img" :src="list?.image" alt="">
      <h3 class="title">{{ list?.title }}</h3>
    </div>
    <div class="pd-body">
      <van-grid :column-num="3">
        <van-grid-item>
          <span class="pd-grid-text">租金</span>
          <span class="pd-grid-price">{{ list?.price }}元</span>
        </van-grid-item>
        <van-grid-item>
          <span class="pd-grid-text">转让费</span>
          <span class="pd-grid-price">{{ list?.afee }}</span>
        </van-grid-item>
        <van-grid-item>
          <span class="pd-grid-text">面积</span>
          <span class="pd-grid-price">{{ list?.size }}</span>
        </van-grid-item>
      </van-grid>
      <div class="pd-info">
        <div class="pd-info-header">
          <div class="title">{{ list?.location }}</div>
          <div class="map" @click="onMap">地图<span class="iconfont icon-jiantouyou"></span></div>
        </div>
        <div class="pd-info-body">
          <div class="info-body-item">
            <div class="item-left"><span>租赁类型：</span>商铺转让</div>
            <div class="item-right"><span>商铺类型：</span>社区住宅底商</div>
          </div>
          <div class="info-body-item">
            <div class="item-left"><span>所在楼层：</span>一层</div>
            <div class="item-right"><span>所在区县：</span>石景山区</div>
          </div>
          <div class="info-body-item">
            <div class="item-left"><span>所在环线：</span>4-5环</div>
            <div class="item-right"><span>所在商圈：</span>鲁谷</div>
          </div>
        </div>
        <div class="pd-info-footer">
          <div class="btn">铺源详细信息</div>
        </div>
      </div>
      <div class="facility">
        <h3>配套设施</h3>
        <div class="facility-list">
          <div class="facility-item">
            <span class="iconfont icon-shangshui-"></span>
            <span class="title">上水</span>
          </div>
          <div class="facility-item">
            <span class="iconfont icon-xiashui"></span>
            <span class="title">下水</span>
          </div>
        </div>
      </div>
      <div class="recommend">
        <h3>商铺推荐</h3>
        <div class="place-item" v-for="(item, index) in list1" :key="item.id">
          <img :src="item.image" alt="">
          <div class="place-item-desc">
            <p>{{ item.title }}</p>
            <span class="descs">{{ item.descs }}</span>
            <span class="price">{{ item.price }}元/月</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pd-footer">
      <div class="collect">
        <span class="iconfont icon-shoucang"></span>
        <span class="collect-text">收藏</span>
      </div>
      <div class="call">
        <div class="btn">联系业主</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router";
import { getPlaceDetails, getPlaceList } from "../../api/Place/index"

const route = useRoute()
const router = useRouter()

/**
 * 商铺详情
 */
interface IList {
  id: number,
  image: string,
  title: string,
  descs: string,
  price: string,
  afee: string,
  size: string,
  location: string
}
const list = ref<IList>()

onMounted(async () => {
  const res = await getPlaceDetails({ id: route.params.id });
  if (res.data.status === 200) {
    list.value = res.data.data
  }
})

const onBack = () => {
  history.back()
}

const onMap = () => {
  router.push("/placeMap")
}

/**
 * 商铺推荐
 */
const page = ref<number>(1)
const list1 = ref<IList[]>([])

onMounted(async () => {
  const res = await getPlaceList({ page: page.value });
  if (res.data.status === 200) {
    list1.value = res.data.data
  }
})

</script>
<style lang="less" scoped>
.place-details-container {
  .pd-header {
    background: #fff;

    .iconfont {
      position: absolute;
      font-size: 18px;
      padding: 10px;
      font-weight: 700;
    }

    .img {
      width: 100%;
    }

    .title {
      padding: 10px;
      box-sizing: border-box;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .pd-body {
    .pd-grid-text {
      font-size: 14px;
      color: #666666;
    }

    .pd-grid-price {
      font-size: 14px;
      color: #FF4444;
      margin-top: 10px;
    }

    .pd-info {
      .pd-info-header {
        height: 50px;
        line-height: 50px;
        background: #FAFAFA;
        display: flex;
        padding: 0 10px;

        .title {
          flex: 1;
          font-size: 14px;
        }

        .map {
          flex: 1;
          text-align: right;
          font-size: 12px;
          color: #999999;

          .iconfont {
            font-size: 12px;
            margin-left: 5px;
          }
        }
      }

      .pd-info-body {
        background: #fff;
        padding: 10px;

        .info-body-item {
          display: flex;
          margin: 10px 0;
          font-size: 14px;

          .item-left {
            flex: 1;

            span {
              color: #999999;
            }
          }

          .item-right {
            flex: 1;

            span {
              color: #999999;
            }
          }
        }
      }

      .pd-info-footer {
        background: #fff;
        padding: 0 0 10px 0;

        .btn {
          width: 90%;
          height: 50px;
          line-height: 50px;
          margin: 0 auto;
          border: 1px solid #BBBBBB;
          text-align: center;
          color: #684886;
        }
      }
    }

    .facility {
      background: #fff;
      padding: 10px;
      box-sizing: border-box;
      margin-top: 10px;

      h3 {
        font-size: 15px;
      }

      .facility-list {
        display: flex;
        margin: 10px 0;
        flex-wrap: wrap;

        .facility-item {
          display: flex;
          flex-direction: column;
          margin: 0 15px;
          justify-content: center;
          align-items: center;

          .iconfont {
            font-size: 30px;
          }

          .title {
            font-size: 14px;
            margin-top: 5px;
          }
        }
      }
    }

    .recommend {
      background: #fff;
      margin-top: 10px;
      padding: 10px;
      box-sizing: border-box;

      h3 {
        font-size: 16px;
      }

      .place-item {
        display: flex;
        padding: 10px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #f3f4f5;

        img {
          width: 144px;
          height: 113px;
          border-radius: 5px;
        }

        .place-item-desc {
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          p {
            font-size: 14px;
          }

          .descs {
            font-size: 12px;
            color: #999999;
          }

          .price {
            font-size: 14px;
            color: #FF4444;
          }
        }
      }
    }
  }
  .pd-footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #fff;
    display: flex;
    .collect{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .iconfont{
        font-size: 20px;
      }
      .collect-text{
        font-size: 14px;
      }
    }
    .call{
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .btn{
        width: 90%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background-color: #684886;
        color: #fff;
        text-align: center;
      }
    }
  }
}
</style>
