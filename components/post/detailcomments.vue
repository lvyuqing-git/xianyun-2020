<template>
  <div class="detail-comments">
    <!-- 评论和分享图标 -->
    <div class="comments-operate">
      <el-row type="flex" justify="center">
        <el-col :span="3" class="cursor">
          <i class="iconfont iconpinglun"></i>
          <span>评论( {{ total }} )</span>
        </el-col>
        <el-col
          :span="3"
          @click.native=" $message.warning({message: '暂不支持分享', type: 'warning', offset: '30px'})"
          class="cursor"
        >
          <i class="iconfont iconfenxiang"></i>
          <span>分享</span>
        </el-col>
      </el-row>
    </div>
    <p class="comments-title">评论</p>
    <!-- 回复谁(哪个用户)的提示  过渡效果: 缩放-->
    <transition name="el-zoom-in-center">
      <div v-show="showWho" class="transition-box reply-who">
        回复 @ {{ whoName }}
        <span class="replay-no" @click="noReply">×</span>
      </div>
    </transition>
    <!-- 评论输入区  -->
    <div class="comments-input" id="comment-area">
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
    <!-- 评论数据显示区 -->
    <div class="coments-list">
      <!-- 评论内容 -->
      <div class="comment-inner" v-if="total">
        <CommentItem
          :data="commentsData"
          @replywho="addParentComment"
          :first="'one'"
          v-show="commentsData.length"
        />
      </div>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-if="total && commentsData.length"
      ></el-pagination>
      <!-- 没有评论时提示 -->
      <div class="no-comment" v-if="!total || !commentsData.length">暂无评论,赶快抢占沙发!</div>
    </div>
  </div>
</template>

<script>
import CommentItem from "@/components/post/detailCommentItem";
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      commentsData: [], // 评论数据数组
      textarea: "", //评论内容输入
      dialogImageUrl: "",
      dialogVisible: false,
      picList: [], // 照片列表
      currentPage: 1, //当前页码默认值
      total: 100, //总页数
      pageSize: 2, //
      showWho: false, //是否显示 回复哪个用户
      whoName: "", // 被回复的用户名
      parentId: "" // 被回复的用户id
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
      let follow = this.parentId; // 被回复的id
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
          post,
          follow
        },
        token
      );
    },
    // 提交评论 请求
    putComment(data, token) {
      //   console.log(data, token);
      this.$axios({
        method: "POST",
        url: "/comments",
        data,
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        // console.log(res);
        if ((res.message = "提交成功")) {
          this.$message.success("评论提交成功！");
          //   重置页码
          this.currentPage = 1;
          // 获取评论数据
          this.getCommentData();
          //   清空输入框内容
          this.textarea = "";
          //   清除图片
          this.picList = [];
          //   清空回复id\名字\隐藏提示
          this.noReply();
        }
        // 其他处理，下边评论数据的再次获取？
      });
    },
    // 分页-每页显示条数改变
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // 重新获取评论数据
      this.getCommentData();
    },
    // 分页-当前页码改变
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      // 重新获取评论数据
      this.getCommentData();
    },
    // 获取评论数据
    getCommentData() {
      let id = this.$route.query.id;
      let _limit = Number(this.pageSize);
      let _start = (Number(this.currentPage) - 1) * _limit;
      //   发起请求 文章评论数据
      this.$axios({
        url: "/posts/comments",
        params: {
          post: id,
          _start,
          _limit
        }
      }).then(({ data: { data, total } }) => {
        // data 评论列表数组
        // total所有评论总条数
        if (data) {
          this.total = total;
          this.commentsData = data;
        }
      });
    },
    // 添加父级评论
    addParentComment(val) {
      //   console.log("监听到了");
      console.log(val);
      // 让回复@谁 显示
      this.whoName = val.account.nickname;
      this.showWho = true;
      this.parentId = val.id;
      //   获取评论输入区的滚动距离
      let textarea = document.getElementById("comment-area");
      //   让页面滚动到 评论输入区的位置
      document.documentElement.scrollTop = textarea.offsetTop;
      // window.pageYOffset = 1000
      // document.body.scrollTop = 1000
    },
    // @谁评论,点击×号时触发 / 清空回复id,回复名字,提示隐藏
    noReply() {
      //   清空 回复id
      this.parentId = "";
      //   清空 回复用户名
      this.whoName = "";
      //   隐藏 回复谁的提示
      this.showWho = false;
    }
  },
  mounted() {
    // 获取评论数据
    this.getCommentData();
  },
  components: {
    CommentItem
  },
  watch: {
    "data.id"(val, oldVal) {
      //   console.log(val, oldVal);
      //   文章id变化,则要刷新评论数据
      this.getCommentData();
    }
  }
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
  .reply-who.transition-box {
    display: inline-block;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 6px 12px;
    font-size: 12px;
    color: #999;
    background-color: #eee;
    .replay-no {
      box-sizing: border-box;
      display: inline-block;
      margin-left: 10px;
      border: 1px solid transparent;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      font-size: 16px;
      line-height: 14px;
      text-align: center;
      &:hover {
        border: 1px solid #ddd;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
      }
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
  .coments-list {
    margin-top: 20px;
    text-align: center;
    .comment-inner {
      //   padding: 0 15px;
      margin-bottom: 20px;
      border: 1px solid #eee;
    }
  }
  .no-comment {
    margin-bottom: 30px;
    border: 1px dashed #ccc;
    padding: 30px 0;
    text-align: center;
    color: #999;
  }
}
</style>