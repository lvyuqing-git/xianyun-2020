<template>
  <div class="dataTable clearfix">
    <div class="column clearfix">
      <ul class="clearfix">
        <li>基本信息</li>
        <li>入住时间: 14:00之后</li>
        <li>离店时间: 12:00之前</li>
        <li>{{detailData.creation_time}}/{{detailData.renovat_time}}</li>
        <li>酒店规模:{{detailData.roomCount}}间客房</li>
      </ul>
    </div>
    <div class="column">
      <ul>
        <li>主要设施</li>
        <li>热水袋</li>
        <li>离店时间</li>
        <li>开业</li>
        <li>规模</li>
      </ul>
    </div>
    <div class="column">
      <ul>
        <li>停车服务</li>
        <li>入住时间</li>
        <li>离店时间</li>
        <li>开业</li>
        <li>规模</li>
      </ul>
    </div>
    <div class="column">
      <ul>
        <li>品牌信息</li>
        <li>{{detailData.area}}</li>
        <li>离店时间</li>
        <li>开业</li>
        <li>规模</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detailData']
}
</script>


<style scoped lang='less'>
.dataTable {
  .column {
    line-height: 60px;
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #f4f4f4;
    ul {
      width: 100%;
      li {
        float: left;
        width: 20%;
        text-align: left;
        color: #666;
        font-size: 14px;
      }
    }
  }
}
</style>