<template>
  <div class="dataTable">

    <table class="table">
      <thead>
        <tr>
          <th>基本信息</th>
          <th>主要设施</th>
          <th>停车服务</th>
          <th>品牌信息</th>
        </tr>
      </thead>
      <tbody class="tbody">
        <tr>
          <td>入住时间: 14:00之后</td>
          <td>热水壶</td>
          <td>-</td>
          <td></td>
        </tr>
        <tr>
          <td>
            离店时间: 12:00之前</td>
          <td>锦江</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>{{detailData.creation_time}}/{{detailData.renovat_time}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>酒店规模{{detailData.roomCount}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    props: ['detailData']
}
</script>


<style scoped>
table {
  position: relative;
  width: 100%;
  display: block;
  border: none;
}

thead {
  float: left;
}

tbody tr {
  display: inline-block;
  
}

th,
td {
  height: 58px;
  display: block;
  line-height: 58px;
  text-align: left;
  width: 190px;
}
.tbody td {
  text-align: center;
}
td,th{
    border-bottom: 1px solid black
}
</style>