<template>
  <div class="draft">
    <p class="title">草稿箱({{articleInfo.length}})</p>
    <ul>
      <li v-for="(item,index) in articleInfo"
          :key="index"
          @click="onclick(item)">
        <p>{{item.title}} <i class="el-icon-edit"></i> </p>
        <span class="date">&nbsp;{{item.date}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    onclick(item) {
      console.log(item)
      this.$emit('caogao',item)
    }
  },
  data() {
    return {
      articleInfo: []
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$store.state.post)
      this.articleInfo = this.$store.state.post.articleInfo
    }, 0)
  }
}
</script>

<style lang='less' scoped>
.draft {
  height: 250px;
  width: 200px;
  border: 1px solid #999999;
  margin-top: 20px;

  .title {
    padding: 6px;
    padding-bottom: 0px;
    color: #999999;
  }
  li {
    padding: 6px;
    &:hover {
         cursor: pointer;
      p {
        text-decoration: underline;
        color: orange;
       
      }
    }

    .date {
      font-size: 14px;
      color: #999999;
    }
  }
}
</style>