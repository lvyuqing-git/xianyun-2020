<template>
  <div class="detail-article">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/post', query: { start: 0, limit: 3 } }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文章内容 -->
    <div class="detail-main">
      <!-- 标题 -->
      <h1> {{ data.title }} </h1>
      <div class="detail-data">
        <span>攻略：2019-05-22 10:57</span>
        <span>阅读：13745</span>
      </div>
      <!-- 内容 -->
      <div class="detail-content" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style lang="less" scoped>
.detail-article {
  .detail-main {
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .detail-data {
      padding: 20px;
      text-align: right;
      color: #999;
      span {
        margin-left: 20px;
      }
    }
    .detail-content {
      /deep/p {
        margin: 15px auto 10px;
        span {
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>