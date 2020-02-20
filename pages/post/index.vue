<template>
  <div>
    <div class="container">
      <div class="clearfix">
        <div class="left">
          <IndexAside></IndexAside>
        </div>
        <div class="right">
          <IndexSearch @resetCurrentChange='resetCurrentChange' @inputValue='inputValue'></IndexSearch>
          <IndexStrategy></IndexStrategy>
        </div>
      </div>
    </div>
    <div class="paging">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentChange"
                     :page-sizes="[3, 5, 10, 15]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="$store.state.post.strategyList.total">
      </el-pagination>
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
      //分页选择条数
      sizeChange: 3,
      //分页框选择页数
      currentChange: 1,
      //搜索输入框的值
      searchValue : ''
    }
  },
  components: {
    IndexAside,
    IndexSearch,
    IndexStrategy
  },
  methods: {
      //接受搜索输入框的值
      inputValue(value){
          this.searchValue = value
      },
    //重置页码
    resetCurrentChange() {
    //   this.currentPage = 1
      this.currentChange = 1
      console.log(this.currentChange)
    },
    //分页框选择条数时触发
    handleSizeChange(val) {
      this.sizeChange = val
      this.search()
    },
    //分页框选择页数时触发
    handleCurrentChange(val) {
      this.currentChange = val
      this.search()
    },
    search() {
      this.$store
        .dispatch('post/citySearch', {
          _start: (this.currentChange - 1) * this.sizeChange,
          _limit: this.sizeChange,
          city: this.searchValue
        })
        .then(res => {
          this.$store.commit('post/setStrategy', res.data)
        })
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
  text-align: center;
  padding-bottom: 15px;
}
</style>