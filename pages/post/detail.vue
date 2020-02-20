<template>
  <div class="post-detail container">
    <el-row :gutter="30">
      <!-- 文章详情 -->
      <el-col :span="17">
        <!-- 文章内容 -->
        <DetailArticle :data="detailData" />
        <!-- 文章评论 -->
        <DetailComments :data="detailData" />
      </el-col>
      <!-- 文章推荐 -->
      <el-col :span="7">
        <DetailRecommand />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DetailArticle from "@/components/post/detailArticle";
import DetailRecommand from "@/components/post/detailRecommand";
import DetailComments from "@/components/post/detailcomments";
export default {
  data() {
    return {
      detailData: {}
    };
  },
  methods: {
    // 获取攻略详情
    getDetail() {
      if (this.$route.query.id) {
        // 获取攻略id
        let id = Number(this.$route.query.id);
        // console.log(id);
        // 请求文章详情
        this.$axios({
          url: "/posts",
          params: {
            id
          }
        }).then(({ data: { data } }) => {
          console.log(data);
          if (data.length) {
            this.detailData = data[0];
          }
        });
      }
    }
  },
  mounted() {
    // 获取攻略
    this.getDetail();
  },
  components: {
    DetailArticle,
    DetailRecommand,
    DetailComments
  },
  //   组件内的守卫
  beforeRouteUpdate(to, from, next) {
    next();
    // 重新渲染页面数据
    this.getDetail();
  }
};
</script>

<style lang="less" scoped>
.container {
  margin: 15px auto;
  width: 1000px;
}
</style>