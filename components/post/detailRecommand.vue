<template>
  <div class="detail-recommand">
    <!-- 攻略推荐 -->
    <h3>相关攻略</h3>
    <!-- 攻略简要信息 -->
    <nuxt-link
      class="detail-brief"
      :to="'/post/detail?id='+ item.id"
      v-for="(item, index) in recommandList"
      :key="index"
    >
      <el-row type="flex">
        <el-col :span="14">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <span>{{publishTime(item.created_at)}}</span>
            <span>阅读 {{ item.watch || 0 }}</span>
          </div>
        </el-col>
        <el-col :span="10" class="recommand-img">
          <img :src="item.images[0]" alt v-show="item.images.length" />
        </el-col>
      </el-row>
    </nuxt-link>
  </div>
</template>

<script>
// 引入moment插件
import moment from "moment";
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
      // console.log(this.$route.query.id);
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
    },
    // 格式化时间
    publishTime(time) {
      return moment(new Date(time)).format("YYYY-MM-DD HH:mm");
    }
  },
  computed: {
    // 监听id变化, --- 弃用，改用 watch监听 $route
    test () {
      // 延时获取 攻略推荐信息，
      // 以便跟左边文章详情  “阅读量” 达到同步
      setTimeout(() => {
        // 获取攻略推荐
        this.getRecommand();
      }, 100);
      return this.$route.query.id
    }
  },
  watch: {
    // 监听route（针对 query.id）变化
    '$route.query.id'(val, oldVal) {
      // 延时获取 攻略推荐信息，
      // 以便跟左边文章详情  “阅读量” 达到同步
      setTimeout(() => {
        this.getRecommand()
      }, 100);
    }
  }
};
</script>

<style lang="less" scoped>
.detail-recommand {
  margin-right: -15px;
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
      position: relative;
      margin: 5px 0 30px;
      line-height: 1.4em;
      /* 2 times the line-height to show 2 lines */
      height: 2.8em;
      overflow: hidden;
    }
    .info {
      font-size: 11px;
      color: #999;
      span {
        margin-right: 8px;
      }
    }
  }
  .recommand-img {
    margin-left: 8px;
    padding-top: 10px;
    width: 100px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>