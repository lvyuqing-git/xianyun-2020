<template>
  <div class="paging">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="paging.currentChange"
                   :page-sizes="[3, 5, 10, 15]"
                   :page-size="paging.sizeChange"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="strategyList.total"
                   v-if="strategyList.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['searchValue'],
  watch: {
    searchValue() {
      this.paging.currentChange = 1
      this.init()
    },
   $route(){
       if(this.$route.query){
           this.$store.commit('post/addUrlObj',{
               start : this.$route.query.start,
               limit : this.$route.query.limit,
           })
       }
   }
  },
  data() {
    return {
      //分页对象
      paging: {
        //分页选择条数
        sizeChange: 3,
        //分页框选择页数
        currentChange: 1
      },
      //数据列表
      strategyList: {}
    }
  },
  methods: {
    //重置页码
    resetCurrentChange() {
      this.paging.currentChange = 1
    },
    //分页框选择条数时触发
    handleSizeChange(val) {
      this.paging.sizeChange = val
      this.$router.replace({
        url: this.$router.path,
        query: {
          start: this.paging.currentChange,
          limit: this.paging.sizeChange
        }
      })
      this.init()
    },
    //分页框选择页数时触发
    handleCurrentChange(val) {
      this.paging.currentChange = val
      this.$router.replace({
        url: this.$route.path,
        query: {
          start: this.paging.currentChange,
          limit: this.paging.sizeChange
        }
      })
      this.init()
    },
    init() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.$store
        .dispatch('post/citySearch', {
          _start: (this.paging.currentChange - 1) * this.paging.sizeChange || 0,
          _limit: this.paging.sizeChange || 3,
          city: this.searchValue || ''
        })
        .then(res => {
          this.strategyList = res.data
          //   this.$emit('transmitStrategyList', this.strategyList)
          this.$store.commit('post/strategyList', this.strategyList)
          this.strategyList.data.forEach(item => {
            if (item.images.length >= 3) {
              item.images.length = 3
            }
          })
        })
    }
  },
  mounted() {
    if(+this.$route.query.limit && +this.$route.query.start){
        this.paging.sizeChange = +this.$route.query.limit
    this.paging.currentChange = +this.$route.query.start
    }
    this.init()
  }
}
</script>

<style>
</style>