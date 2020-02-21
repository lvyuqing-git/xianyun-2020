<template>
  <div>
    <div class="container">
      <div class="clearfix">
        <div class="left">
          <IndexAside></IndexAside>
        </div>
        <div class="right">
          <IndexSearch @search='setSearchValue'
                       @resetCurrentChange='resetCurrentChange'></IndexSearch>
          <IndexStrategy :searchValue='searchValue'
                         :pagingObj='paging'></IndexStrategy>
          <div class="paging">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="paging.currentChange"
                           :page-sizes="[3, 5, 10, 15]"
                           :page-size="1"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="$store.state.post.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import IndexAside from '@/components/post/indexAside'
import IndexSearch from '@/components/post/indexSearch'
import IndexStrategy from '@/components/post/indexStrategy'
export default {
  data() {
    return {
      //接受搜索框的数据
      StrategyData: {},

      //搜索框的值
      searchValue: '',
      //分页对象
      paging: {
        //页码默认值
        currentPage: 1,
        //分页选择条数
        sizeChange: 3,
        //分页框选择页数
        currentChange: 1
      }
    }
  },
  components: {
    IndexAside,
    IndexSearch,
    IndexStrategy
  },
  methods: {
    //接受搜索输入框的值
    setSearchValue(value) {
      this.searchValue = value
    },
    //重置页码
    resetCurrentChange() {
      this.paging.currentChange = 1
    },
    //分页框选择条数时触发
    handleSizeChange(val) {
      this.paging.sizeChange = val
    },
    //分页框选择页数时触发
    handleCurrentChange(val) {
      this.paging.currentChange = val
    }
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