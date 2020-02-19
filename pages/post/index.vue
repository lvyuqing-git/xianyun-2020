<template>
  <div class="container">
    <div class="left">
      <IndexAside></IndexAside>
    </div>
    <div class="right">
      <!-- <IndexSearch></IndexSearch> -->
    </div>
  </div>
</template>

<script>
import IndexAside from '@/components/post/indexAside'
// import IndexSearch from '@/components/post/indexSearch'
export default {
  components: {
    IndexAside,
    // IndexSearch
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 1000px;
  margin: 20px auto;
  height: 800px;
  display: flex;
  .left {
    width: 240px;
    float: left;
  }
  .right {
    float: left;
    flex: 1;
    margin-left: 40px;
    box-sizing: border-box;
  }
}
</style>