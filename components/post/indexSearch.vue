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
            @click="search($event,item)">{{item}}</li>
      </ul>
    </div>
    <div class="recommend">
      <div class="recommend-top">
        <span>推荐攻略</span>
        <el-button type="primary"
                   icon="el-icon-edit" @click="$router.push({path : '/post/create'})">写游记</el-button>
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
    search(event, value) {
      if (value) {
        this.searchValue = value
      }
      //传递输入框的值
      this.$emit('search', this.searchValue)

      //   页码重置
      this.$emit('resetCurrentChange')
    }
  }
}
</script>

<style lang='less' scoped>
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
          cursor: pointer;
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