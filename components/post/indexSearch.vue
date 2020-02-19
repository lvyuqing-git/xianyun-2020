<template>
  <div class="searchbox">
    <div class="searchbox-top">
      <input type="text"
             placeholder="请输入想去的地方，比如：'广州'">
      <i class="el-icon-search"></i>
    </div>
    <div class="searchbox-bottom">
      <ul>
        <li>推荐：</li>
        <li>广州</li>
        <li>上海</li>
        <li>北京</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.searchbox-top {
  height: 40px;
  border: 4px solid #ffa500;
  display: flex;
  box-sizing: border-box;
  line-height: 40px;
  input {
    width: 96%;
    border: none;
    text-indent: 1em;
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
    li{
        float: left;
        margin-right: 10px;
        font-size: 12px;
        color: #666;
    }
}
</style>