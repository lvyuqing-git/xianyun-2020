<template>
  <div class="detail-recommand">
    <!-- 攻略推荐 -->
    <h3>相关攻略</h3>
    <!-- 攻略简要信息 -->
    <nuxt-link class="detail-brief" to="#" v-for="(item, index) in recommandList" :key="index">
      <el-row type="flex" >
        <el-col :span="16">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <span>2020-02-19 10:49</span>
            <span>阅读 {{ item.watch || 0 }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <!-- 图片资源缺少，此处占位 -->
          <div v-html="item.content" v-show="false"></div>
        </el-col>
      </el-row>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommandList: []
    };
  },
  mounted() {
    // 获取攻略推荐
    this.getRecommand();
  },
  methods: {
    // 获取攻略推荐
    getRecommand() {
      //   console.log(this.$route.query.id);
      if (this.$route.query.id) {
        // 获取文章id
        let id = Number(this.$route.query.id);
        // 请求 攻略推荐的数据
        this.$axios({
          url: "/posts/recommend",
          params: {
            id
          }
        }).then(({ data: { data } }) => {
          //   console.log(data);
          if (data) {
            this.recommandList = data;
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.detail-recommand {
  h3 {
    border-bottom: 1px solid #ddd;
    padding: 0 0 10px;
    font-weight: normal;
  }
  .detail-brief {
    display: block;
    border-bottom: 1px solid #ddd;
    padding: 15px 0 20px;
    .title {
      padding: 5px 0 30px;
    }
    .info {
      font-size: 11px;
      color: #999;
      span {
        margin-right: 8px;
      }
    }
  }
}
</style>