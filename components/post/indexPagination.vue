<template>
  <div class="paging">
    <el-pagination @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="paging.currentChange"
                   :page-sizes="[3, 5, 10, 15]"
                   :page-size="1"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="strategyList.total">
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

    }
  },
  data() {
    return {
      //分页对象
      paging: {
        //页码默认值
        currentPage: 1,
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
      this.init()
    },
    //分页框选择页数时触发
    handleCurrentChange(val) {
      this.paging.currentChange = val
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
          console.log(this.strategyList)
        //   this.$emit('transmitStrategyList', this.strategyList)
          this.$store.commit('post/strategyList',this.strategyList)
          this.strategyList.data.forEach(item => {
            if (item.images.length >= 3) {
              item.images.length = 3
            }
          })
        })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
</style>