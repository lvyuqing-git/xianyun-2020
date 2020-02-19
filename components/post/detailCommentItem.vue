<template>
  <div class="comment-item">
    <!-- 评论块 -->
    <div class="comment-block" v-for="(item, index) in data" :key="index">
      <el-row class="cItem-info" type="flex" justify="space-between">
        <!-- 头像 昵称 发布时间 -->
        <el-col class="cItem-head">
          <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt />
          <span>{{ item.account.nickname }}</span>
          <span>{{ publicTime(item.created_at) }}</span>
        </el-col>
        <el-col :span="3" class="cItem-total">1</el-col>
      </el-row>
      <el-row class="cItem-content" type="flex" align="bottom">
        <!-- 评论内容 -->
        <el-col class="cItem-text">
          <!-- 文字内容 -->
          <p>{{ item.content }}</p>
          <!-- 图片 -->
          <el-row type="flex" class="cItem-pic" v-if="item.pics.length">
            <el-col v-for="(i,k) in item.pics" :key="k">
              <img :src="$axios.defaults.baseURL+i.url" alt />
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="cItem-reply">
          <a href="javascript:;">回复</a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    publicTime(time) {
      return moment(new Date(time)).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  .comment-block {
    border-bottom: 1px dashed #eee;
    padding: 15px 15px 5px;
    .cItem-head {
      text-align: left;
      img {
        border-radius: 50%;
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span {
        font-size: 12px;
        &:nth-of-type(1) {
          color: #666;
        }
        &:nth-of-type(2) {
          color: #999;
        }
      }
    }
    .cItem-total {
      text-align: right;
      font-size: 12px;
      color: #666;
    }

    .cItem-content {
      padding: 10px 0 0px 30px;
      text-align: left;
      a {
        visibility: hidden;
      }
      &:hover {
        a {
          visibility: visible;
        }
      }
      .cItem-reply {
        font-size: 12px;
        line-height: 20px;
        text-align: right;
        color: #1e50a2;
      }
      .cItem-pic {
        .el-col {
          border-radius: 10px;
          border: 1px dashed #ccc;
          padding: 1px;
          margin-right: 5px;
          width: 80px;
          height: 80px;
          overflow: hidden;
          img {
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }
        }
      }
      .cItem-text {
        padding-bottom: 20px;
        p {
          padding: 0 0 5px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>