<template>
  <div>
    <div class="container">
      <div class="clearfix">
        <div class="left">
          <IndexAside></IndexAside>
        </div>
        <div class="right">
          <IndexSearch @search='setSearchValue'></IndexSearch>
          <IndexStrategy :pagingObj='strategyList'></IndexStrategy>
          <IndexPagination :searchValue='searchValue'></IndexPagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import IndexAside from '@/components/post/indexAside'
import IndexSearch from '@/components/post/indexSearch'
import IndexStrategy from '@/components/post/indexStrategy'
import IndexPagination from '@/components/post/indexPagination'
export default {
  data() {
    return {
      //接受搜索框的数据
      StrategyData: {},

      //搜索框的值
      searchValue: '',
      //搜索到的值
      strategyList: {}
    }
  },
  components: {
    IndexAside,
    IndexSearch,
    IndexStrategy,
    IndexPagination
  },
  methods: {
    //接受搜索输入框的值
    setSearchValue(value) {
      this.searchValue = value
    },
    // 重置页码
    // resetCurrentChange() {
    //   this.paging.currentChange = 1
    // },
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  .left {
    width: 260px;
    float: left;
  }
  .right {
    float: left;
    width: 700px;
    margin-left: 40px;
    box-sizing: border-box;
  }
}
.paging {
  margin-top: 20px;
  text-align: center;
  padding-bottom: 15px;
}
</style>