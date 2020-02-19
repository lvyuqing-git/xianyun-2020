<template>
  <div class="detail-comments">
    <!-- 评论和分享图标 -->
    <div class="comments-operate">
      <el-row type="flex" justify="center">
        <el-col :span="3" class="cursor">
          <i class="iconfont iconpinglun"></i>
          <span>评论(100)</span>
        </el-col>
        <el-col
          :span="3"
          @click.native=" $message.warning({message: '暂不支持分享', type: 'warning', offset: 30})"
          class="cursor"
        >
          <i class="iconfont iconfenxiang"></i>
          <span>分享</span>
        </el-col>
      </el-row>
    </div>
    <p class="comments-title">评论</p>
    <!-- 评论输入区  -->
    <div class="comments-input">
      <!-- 输入框-文本域 -->
      <el-input type="textarea" :rows="2" placeholder="说点什么吧..." v-model="textarea" resize="none"></el-input>
      <!-- 照片墙+按钮 -->
      <el-row type="flex" justify="space-between">
        <el-col class="comments-upload">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" size="mini">提交</el-button>
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
  data() {
    return {
      textarea: "", //评论内容输入
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
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
  .comments-title {
    margin: 15px 0 8px;
    font-size: 20px;
  }
  .comments-input {
      /deep/textarea {
          margin-bottom: 10px;
      }
  }
  .comments-upload {
      /deep/.el-upload, /deep/.el-upload-list__item {
          width: 100px;
          height: 100px;
          line-height: 100px;
      }
  }
}
</style>