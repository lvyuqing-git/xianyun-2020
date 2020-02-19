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
      <ul class="citylist clearfix">
        <li class="first-cild">推荐：</li>
        <li v-for="(item,index) in citylist"
            :key="index"
            @click="search(item)">{{item}}</li>
      </ul>
    </div>
    <div class="recommend">
      <div class="recommend-top">
        <span>推荐攻略</span>
        <el-button type="primary"
                   icon="el-icon-edit">写游记</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索值
      searchValue: '',
      citylist: ['广州', '上海', '北京']
    }
  },
  //回车搜索
  methods: {
    search(value) {
      if (value) {
        this.searchValue = value
      }
      this.$store
        .dispatch('post/citySearch', {
          _start: 0,
          _limit: 3,
          city: value || this.searchValue
        })
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang='less' scoped>
.clearfix:after {
  content: ''; /*设置内容为空*/
  height: 0; /*高度为0*/
  line-height: 0; /*行高为0*/
  display: block; /*将文本转为块级元素*/
  visibility: hidden; /*将元素隐藏*/
  clear: both; /*清除浮动*/
}
.clearfix {
  zoom: 1; /*为了兼容IE*/
}
.searchbox {
  .searchbox-top {
    height: 40px;
    border: 4px solid #ffa500;
    display: flex;
    box-sizing: border-box;
    line-height: 40px;
    input {
      width: 96%;
      border: none;
      text-indent: 1.5em;
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
    margin-bottom: 5px;
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
  // 推荐攻略部分
  .recommend-top {
    line-height: 50px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    span {
      font-size: 18px;
      color: #ffa82e;
      padding-bottom: 22px;
      border-bottom: 2px solid #ffa82e;
    }
    button {
      float: right;
      display: table-cell;
      margin-top: 10px;
    }
  }
}
</style>