<template>
  <div class="comment-item">
    <!-- 评论块 -->
    <div class="comment-block" v-for="(item, index) in data" :key="index">
      <!-- 递归组件 判断当前是否有上一层评论 -->
      <!-- 递归组件 监听自定义事件 -->
      <commentItem
        :data="[item.parent]"
        v-if="item.parent && first !== 'one'"
        class="inner-reply"
        @replywho="replyParent"
      />
      <el-row class="cItem-info" type="flex" justify="space-between">
        <!-- 头像 昵称 发布时间 -->
        <el-col class="cItem-head">
          <img :src="$axios.defaults.baseURL+item.account.defaultAvatar" alt v-if="first === 'one'" />
          <span>{{ item.account.nickname }}</span>
          <span>{{ publicTime(item.created_at) }}</span>
        </el-col>
        <el-col :span="3" class="cItem-total"> {{ item.level }} </el-col>
      </el-row>
      <!-- 第一层评论 -->
      <commentItem
        :data="[item.parent]"
        v-if="item.parent && first === 'one'"
        class="inner-reply"
        @replywho="replyParent"
      />
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
          <a href="javascript:;" @click="replyParent(item)">回复</a>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "commentItem",
  props: {
    data: {
      type: Array,
      default: []
    },
    first: {
      type: String,
      default: ""
    }
  },
  methods: {
    // 格式化时间
    publicTime(time) {
      return moment(new Date(time)).format("YYYY-MM-DD HH:mm");
    },
    // 点击回复按钮
    replyParent(item) {
      // console.log(item)
      // 告诉父组件,被点击回复的 评论数据(id, 用户名)
      this.$emit("replywho", item);
    } 
  }
};
</script>

<style lang="less" scoped>
.comment-item {
  .comment-block {
    border-bottom: 1px dashed #ddd;
    &:last-of-type {
      border-bottom: none;
    }
    padding: 2px 15px;
    .cItem-info {
      padding: 10px 0 0 10px;
    }
    .inner-reply {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      a {
        padding-right: 15px;
      }
      .comment-block {
        border: none;
        padding: 2px;
      }
    }
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
      padding-right: 15px;
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