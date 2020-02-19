<template>
  <div>
    <div class="container">
      <div class="clearfix">
        <div class="left">
          <IndexAside></IndexAside>
        </div>
        <div class="right">
          <IndexSearch @strategyData='setStrategyData'></IndexSearch>
          <!-- <IndexStrategy></IndexStrategy> -->
        </div>
      </div>
    </div>
   <div class="paging">
        <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-sizes="[3, 5, 10, 15]"
                   :page-size="100"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="StrategyData.total">
    </el-pagination>
   </div>
  </div>
</template>

<script>
import IndexAside from '@/components/post/indexAside'
import IndexSearch from '@/components/post/indexSearch'
// import IndexStrategy from '@/components/post/indexStrategy'
export default {
    data () {
        return {
            //接受搜索框的数据
            StrategyData : {},
            // 分页框当前页数
            currentPage : 0
        }
    },
  components: {
    IndexAside,
    IndexSearch
    // IndexStrategy
  },
  methods: {
      //搜索框传递过来的搜索结果
      setStrategyData(data){
          this.StrategyData = data
          console.log(data);
      },
      //分页框选择条数时触发
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      //分页框选择页数时触发
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
.paging{
    text-align: center;
    padding-bottom: 15px;
}
</style>