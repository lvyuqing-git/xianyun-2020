<template>
  <div class="detail-article">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <!-- 添加动态start和limit，可以回到 原先查看攻略主页的状态 -->
      <el-breadcrumb-item :to="{ path: '/post', query: { start: this.$store.state.post.urlObj.start || 0, limit: this.$store.state.post.urlObj.limit || 3 } }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 文章内容 -->
    <div class="detail-main">
      <!-- 标题 -->
      <h1> {{ data.title }} </h1>
      <div class="detail-data">
        <span>攻略：{{ publishTime }}</span>
        <span>阅读：{{data.watch || 0}} </span>
      </div>
      <!-- 内容 -->
      <div class="detail-content" v-html="data.content"></div>
    </div>
  </div>
</template>

<script>
 // 引入moment插件
import moment from 'moment'
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data () {
      return {
          
      }
  },
  mounted() {
    console.log(this.data);
    // 引入moment插件
    // var moment = require('moment');

  },
  computed: {
      publishTime() {
          // 格式化时间
          return moment(new Date(this.data.created_at)).format('YYYY-MM-DD HH:mm')
      }
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
    /deep/.detail-content {
      & * {
        max-width: 700px!important;
      }
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