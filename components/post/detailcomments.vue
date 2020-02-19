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
            :action="$axios.defaults.baseURL+'/upload'"
            name="files"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlerPictureList"
            :file-list="picList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="mini" @click="submitComment">提交</el-button>
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
      dialogVisible: false,
      picList: [] // 照片列表
    };
  },
  methods: {
    // 删除图片触发
    handleRemove(file, fileList) {
      //   console.log(file, fileList);
      //  保存照片列表
      this.picList = fileList;
    },
    // 照片墙显示
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 照片上传成功
    handlerPictureList(response, file, fileList) {
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      //  保存照片列表
      this.picList = fileList;
    },
    // 点击提交按钮触发
    submitComment() {
      let content = this.textarea;
      let picsOrg = this.picList;
      let post = this.$route.query.id;
      let token = this.$store.state.user.userInfo.token;
      if (!content) {
        this.$message.error("评论的内容不能为空");
        return;
      }
      //   判断是否登录
      if (!token) {
        // 提示
        this.$message.error("你还没有登录！");
        // 跳转登录页 携带攻略页的url
        this.$router.push({
          path: "/user/login",
          query: {
            returnUrl: `/post/detail?id=${post}`
          }
        });
      }

      let pics = [];
      // 图片列表长度不为零，
      // 处理图片的数据
      if (picsOrg.length) {
        picsOrg.forEach(({ status, uid, response: [arr] }) => {
          // arr 为数组response的第0项
          // console.log(arr)
          arr.status = status;
          arr.uid = uid;
          pics.push(arr);
        });
      }
      // 发起 提交评论请求
      this.putComment(
        {
          content,
          pics,
          post
        },
        token
      );
    },
    // 提交评论 请求
    putComment(data, token) {
      console.log(data, token);
        // this.$axios({
        //     method: 'POST',
        //     url: '/comments',
        //     data,
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     }
        // }).then(res => {
        //     console.log(res)
        // })
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
    /deep/.el-upload,
    /deep/.el-upload-list__item {
      width: 100px;
      height: 100px;
      //   line-height: 100px;
    }
    /deep/.el-upload--picture-card {
      line-height: 100px;
    }
  }
}
</style>