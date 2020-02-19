<template>
  <div class="searchbox">
    <div class="searchbox-top">
      <input type="text"
             placeholder="请输入想去的地方，比如：'广州'"
             @keyup.enter="search"
             v-model="searchValue">
      <i class="el-icon-search"></i>
    </div>
    <div class="searchbox-bottom">
      <ul class="citylist">
        <li class="first-cild">推荐：</li>
        <li v-for="(item,index) in citylist" :key="index" @click="search(item)">{{item}}</li>
       
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索值
      searchValue: '',
      citylist : ['广州','上海','北京']
    }
  },
  //回车搜索
  methods: {
    search(value) {
      this.$store.dispatch('post/citySearch', {
        _start: 0,
        _limit: 3,
        city: value || this.searchValue
      }).then((res)=>{
          console.log(res);
      })
    }
  }
}
</script>

<style lang='less' scoped>
.searchbox-top {
  height: 40px;
  border: 4px solid #ffa500;
  display: flex;
  box-sizing: border-box;
  line-height: 40px;
  input {
    width: 96%;
    border: none;
    text-indent: 1em;
    outline: none;
  }
  i {
    font-size: 24px;
    color: #ffa500;
    font-weight: bold;
    margin-top: 4px;
  }
}
.searchbox-bottom {
  margin-top: 10px;
  .citylist {
    li {
      float: left;
      margin-right: 10px;
      font-size: 12px;
      color: #666;
      &:hover {
        color: #ffa500;
      }
    }
    .first-cild:hover {
      color: #666;
    }
  }
}
</style>