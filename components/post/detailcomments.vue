<template>
  <div class="detail-comments">
    <!-- 评论和分享图标 -->
    <div class="comments-operate">
      <el-row type="flex" justify="center">
        <el-col :span="3" class="cursor">
          <i class="iconfont iconpinglun"></i>
          <span>评论(100)</span>
        </el-col>
        <el-col :span="3" @click.native=" $message.warning({message: '暂不支持分享', type: 'warning', offset: 30})" class="cursor">
          <i class="iconfont iconfenxiang"></i>
          <span>分享</span>
        </el-col>
      </el-row>
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
  data () {
      return {
          
      }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.detail-comments {
  .comments-operate {
    padding: 30px 0;
    text-align: center;
    .cursor {
        cursor: pointer;
    }
    i {
      display: block;
      margin-bottom: 8px;
      font-size: 28px;
      color: orange;
    }
    span {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>