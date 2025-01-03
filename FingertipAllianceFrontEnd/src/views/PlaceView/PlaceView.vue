<template>
  <TopNavComponent />
  <van-dropdown-menu>
    <van-dropdown-item title="位置" ref="location">
      <div class="list" @click="onLocation">
        <h3 value="area" :class="[active == 'area' ? 'active' : '']">区域</h3>
        <h3 value="subway" :class="[active == 'subway' ? 'active' : '']">地铁</h3>
      </div>
      <div class="item">
        <van-cell-group v-if="active == 'area'">
          <van-cell :value=item v-for="(item, index) in areas" :key="index" @click="onItem(item)" />
        </van-cell-group>
        <van-cell-group v-if="active == 'subway'">
          <van-cell :value=item v-for="(item, index) in subways" :key="index" @click="onItem(item)" />
        </van-cell-group>
      </div>
    </van-dropdown-item>
    <van-dropdown-item title="租金" ref="price">
      <van-cell-group>
        <van-cell :value=item v-for="(item, index) in rent" :key="index" @click="onPrice(item)" />
      </van-cell-group>
    </van-dropdown-item>
    <van-dropdown-item title="类型" ref="type">
      <div class="container">
        <div class="title">商铺类型</div>
        <div class="btn" v-for="(item, index) in btnTypes" :key="index" @click="onType(item)">{{ item }}</div>
      </div>
    </van-dropdown-item>
    <van-dropdown-item title="更多" ref="more">
      <div class="container">
        <div class="title">{{ mores1.title }}</div>
        <div :class="[selectBtn1 == item ? 'activeBtn' : '']" class="btn" v-for="(item, index) in mores1.btns"
          :key="index" @click="onMore1(item)">{{ item }}
        </div>
      </div>
      <div class="container">
        <div class="title">{{ mores2.title }}</div>
        <div :class="[selectBtn2 == item ? 'activeBtn' : '']" class="btn" v-for="(item, index) in mores2.btns"
          :key="index" @click="onMore2(item)">{{ item }}
        </div>
      </div>
      <div class="container btnL">
        <div class="clearBtn" @click="clearBtn">清空筛选</div>
        <div class="sureBtn" @click="sureBtn">确定</div>
      </div>
    </van-dropdown-item>
  </van-dropdown-menu>
  <div class="content">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="place-item" v-for="(item, index) in list" :key="item.id" @click="onPlaceItem(item.id)">
        <img :src="item.image" alt="">
        <div class="place-item-desc">
          <p>{{ item.title }}</p>
          <span class="descs">{{ item.descs }}</span>
          <span class="price">{{ item.price }}元/月</span>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { getPlaceList } from "../../api/Place/index"
import TopNavComponent from "@/components/TopNavComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter()

const areas = ["不限", "朝阳区", "东城区", "通州区", "西城区"]
const subways = ["不限", "1号线", "2号线", "3号线", "4号线"]
const rent = ["不限", "2000元以下", "2000-2500元", "2500-3000元"]
const btnTypes = ["不限", "商场/超市", "商业街", "社区底商", "写字楼", "住宅高层", "其他"]
const mores1 = {
  title: "面积",
  btns: ["不限", "20㎡以下", "20~50㎡", "50~100㎡", "100㎡以上"]
}

const mores2 = {
  title: "楼层",
  btns: ["不限", "地下", "一层", "二层", "二层以上"]
}

const location = ref()
const price = ref()
const type = ref()
const more = ref()
const selectBtn1 = ref("不限")
const selectBtn2 = ref("不限")

interface IParams {
  location: string,
  price: string,
  type: string
}

const active = ref<string>("area")
const params: IParams = reactive({
  location: "不限",
  price: "不限",
  type: "不限"
})

const onLocation = (event: Event) => {
  active.value = event.target.getAttribute("value")
}

const onItem = (value: string) => {
  params.location = value
  location.value.toggle()
}
const onPrice = (value: string) => {
  params.price = value
  price.value.toggle()
}
const onType = (value: string) => {
  params.type = value
  type.value.toggle()
}

const onMore1 = (value: string) => {
  selectBtn1.value = value
}
const onMore2 = (value: string) => {
  selectBtn2.value = value
}

const clearBtn = () => {
  selectBtn1.value = "不限"
  selectBtn2.value = "不限"
}

const sureBtn = () => {
  more.value.toggle()
}

/**
 * 列表数据
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

const loading = ref(false)
const finished = ref(false)
const page = ref<number>(1)
const list = ref<IList[]>([])
const onLoad = () => {
  // 异步更新数据
  getPlaceList({ page: page.value }).then(res => {
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

const onPlaceItem = (id: number) => {
  router.push({
    name:"placeDetails",
    params:{id}
  })
}

</script>
<style>
/* 筛选下拉菜单背景设置 */
.van-dropdown-item__content {
  background: #f3f4f5;
}

/* 筛选下拉菜单右侧区域：cell去掉flex内容居左 */
.van-cell__value {
  flex: none;
}
</style>
<style lang="less" scoped>
.list {
  width: 50%;
  float: left;
  background: #f3f4f5;

  h3 {
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    box-sizing: border-box;
  }

  h3.active {
    background: #fff;
  }
}

.item {
  width: 50%;
  float: left;
}

.container {
  background: #fff;
  overflow: hidden;
  clear: both;

  .title {
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .btn {
    float: left;
    width: 71px;
    height: 28px;
    background-color: #f3f4f5;
    margin: 10px;
    margin-top: 0;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
  }

  .clearBtn {
    width: 126px;
    height: 44px;
    line-height: 44px;
    border-radius: 3px;
    text-align: center;
    background-color: #f3f4f5;
    font-size: 14px;
    margin: 10px;
    border: 1px solid rgba(219, 219, 219, 1);
  }

  .sureBtn {
    width: 202px;
    height: 44px;
    line-height: 44px;
    border-radius: 3px;
    font-size: 14px;
    background-color: rgba(111, 68, 138, 1);
    text-align: center;
    margin: 10px;
    color: #fff;
  }
}

.btnL {
  display: flex;
  justify-content: center;
}

.activeBtn {
  background-color: #684886 !important;
  color: #fff;
}

.content {
  background: #fff;
  padding-top: 5px;

  .place-item {
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    border-top: 1px solid #f3f4f5;

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
</style>
