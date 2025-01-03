<template>
    <MapHeader title="位置" />
    <baidu-map class="map" :center="{ lng: 118.454, lat: 32.955 }" :zoom="12" @ready="ready">
    </baidu-map>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import MapHeader from "../../components/PubHeaderComponent.vue"

const ready = ({ BMap, map }:any) => {
  //  对地图进行自定义操作
};

</script>
<style lang="less" scoped>
/* 地图容器必须设置宽和高属性 */
.map {
  width: 100%;
  height: 500px;
}
</style>
