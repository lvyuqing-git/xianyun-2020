<template>
  <div class="container">
    <!-- 面包屑模块 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>酒店</el-breadcrumb-item>
        <el-breadcrumb-item>深圳市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 筛选区域模块 -->
    <HotelFiltrate />

    <!--景点区域,地图模块  -->
    <HotelRegion />
  </div>
</template>

<script>
import HotelFiltrate from "@/components/hotel/hotelFiltrate";
import HotelRegion from "@/components/hotel/hotelRegion";
export default {
  components: {
    HotelFiltrate,
    HotelRegion
  }
};
</script>

<style lang='less' scoped>
.container {
  width: 1000px;
  height: 700px;
  margin: 0 auto;
  .breadcrumb {
    padding: 20px 0;
  }
}
</style>