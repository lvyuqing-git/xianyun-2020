<template>
  <div class="table">
    <template>
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column prop="name"
                         label="价格来源"
                         width="330">
        </el-table-column>
        <el-table-column prop="bestType"
                         label="低价房型"
                         width="330"
                         
                         align='center'>
        </el-table-column>
        <el-table-column prop="price"
                         label="最低价格/每晚"
                         width="330"
                         align='right' class="price">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  props: ['tableData'],
  mounted() {
    console.log(this.tableData)
  }
}
</script>

<style lang='less' scoped>
.table {
  .price{
      color:#ff9900
  }
}
</style>