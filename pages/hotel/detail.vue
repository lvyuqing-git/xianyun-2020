<template>
  <div class="detail">
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> 酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{detailInfo.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{detailInfo.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 酒店介绍 -->
    <div class="introduce">
      <h2 class="hotailName">{{detailInfo.name}}</h2>
      <p class="pinyin">{{detailInfo.alias}}</p>
      <p class="pinyin el-icon-location">{{detailInfo.address}}</p>
    </div>
    <!-- 酒店图 -->

    <Hotelimg></Hotelimg>

    <!-- 酒店信息表 -->
    <HotelTable :tableData='detailInfo.products'></HotelTable>
    <!-- 酒店资料表 -->
    <HotelDateTable :detailData='detailInfo'></HotelDateTable>
  </div>
</template>

<script>
import Hotelimg from '@/components/hotel/hotelImg'
import HotelTable from '@/components/hotel/hotelTable'
import HotelDateTable from '@/components/hotel/hotelDateTable'
export default {
  data() {
    return {
      detailInfo: {
        products: []
      }
    }
  },
  mounted() {
    //  let id =  this.$route.query.id

    this.$axios({
      url: `/hotels?id=185`
    }).then(res => {
      console.log(res.data.data[0])
      this.detailInfo = res.data.data[0]
    })
  },
  components: {
    Hotelimg,
    HotelTable,
    HotelDateTable
  }
}
</script>

<style lang='less' scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  height: 1800px;
  .introduce {
    margin-top: 20px;
    .hotailName {
      font-weight: normal;
    }
    .pinyin {
      color: #666;
      font-size: 14px;
      line-height: 16px;
      i {
        font-size: 18px;
      }
    }
  }
  .img {
    margin-top: 40px;
  }
}
</style>