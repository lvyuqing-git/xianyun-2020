<template>
  <div class="usercomment">
    <div class="title">真是用户评论</div>
    <div class="comment">
      <div class="left">
        <ul>
          <li>总评论数：{{tableData.all_remarks}}</li>
          <li>好评数：{{tableData.good_remarks}}</li>
          <li>差评数：{{tableData.bad_remarks}}</li>
        </ul>
      </div>
      <div class="center">
        <el-rate v-model="tableData.stars"
                 disabled
                 show-score
                 text-color="#ff9900"
                 score-template="{value}">
        </el-rate>
      </div>
      <div class="riht">
        <canvas ref="environment"
                width="300"
                height="300"></canvas>
        <canvas ref="product"
                width="300"
                height="300"></canvas>
        <canvas ref="service"
                width="300"
                height="300"></canvas>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tableData'],
  methods: {
    init(c, value) {
        console.log(c);
        console.log(value);
        
      // 获取画笔
      var ctx = c.getContext('2d')
      // 给画笔添加颜色
      ctx.strokeStyle = 'red'
      // 设置画笔宽度
      ctx.lineWidth = 3
      // 开始绘制“当前”的路径
      ctx.beginPath()
      // 绘制圆形 (重点在怎样把角度换算成弧度)
      ctx.arc(
        150,
        150,
        100,
        (-90 * Math.PI) / 180,
        (Math.PI / 180) * (360 * (value / 10)) - (90 * Math.PI) / 180
      )
      // 闭合当前的图形
      ctx.stroke()
    }
  },
  mounted() {
    let arr = Object.keys(this.tableData.scores)
    arr.forEach((item, index) => {
      this.init(this.$refs[item], this.tableData.scores[item])
    })
  }
}
</script>

<style>
</style>