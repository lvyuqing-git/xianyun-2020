<template>
  <div class="img">
    <el-row :gutter="24">
      <el-col :span="15">
        <img src="/img/1.jpeg"
             alt=""
             class="img1">
      </el-col>
      <el-col :span="9">
        <div class="imgbox"
             v-for="(item,index) in imgs"
             :key="index">
          <img :src="item"
               alt=""
               class="imgs">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs: [
        '/img/2.jpeg',
        '/img/3.jpeg',
        '/img/4.jpeg',
        '/img/5.jpeg',
        '/img/6.jpeg',
        '/img/7.jpeg'
      ]
    }
  }
}
</script>

<style lang='less' scoped>
.img {
  .img1 {
    height: 360px;
  }
  .imgbox {
    display: inline-block;
    width: 45%;
    height: 115px;
    padding-right: 18px;
    padding-bottom: 10px;
    .imgs {
      width: 100%;
    }
  }

  img {
    width: 100%;
  }
}
</style>