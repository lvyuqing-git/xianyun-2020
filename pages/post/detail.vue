<template>
  <div class="post-detail">攻略详情</div>
</template>

<script>
export default {
  methods: {
    // 获取攻略详情
    getDetail() {
      if (this.$route.query.id) {
        // 获取攻略id
        let id = Number(this.$route.query.id);
        // console.log(id);
        // 请求文章详情
        this.$axios({
            url: '/posts',
            params: {
                id
            }
        }).then(( {data: {data}} ) => {
            console.log(data)
            if(data.length) {
              
            }
        })

      }
    }
  },
  mounted() {
    // 获取攻略
    this.getDetail();
  }
};
</script>

<style lang="less" scoped>
</style>