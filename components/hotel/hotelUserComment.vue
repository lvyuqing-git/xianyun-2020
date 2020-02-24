<template>
  <div class="usercomment ">
    <h4 class="titel">真是用户评论</h4>

    <div class="bottom clearfix">
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
        <div class="recommend">推荐</div>
      </div>
      <div class="right">
        <div class="box c1">
          <p>环境</p>
          <p>{{tableData.scores.environment}}</p>
        </div>
        <div class="box c2">
          <p>产品</p>
          <p>{{tableData.scores.product}}</p>
        </div>
        <div class="box c3">
          <p>服务</p>
          <p>{{tableData.scores.service}}</p>
        </div>
        <canvas ref="environment"
                width="100"
                height="70"></canvas>
        <canvas ref="product"
                width="100"
                height="70"></canvas>
        <canvas ref="service"
                width="70"
                height="70"></canvas>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tableData'],
  data() {
    return {
      commentList: ['environment', 'product', 'service']
    }
  },
  methods: {
    init(c, value) {
      // 获取画笔
      var ctx = c.getContext('2d')
      // 给画笔添加颜色
      ctx.strokeStyle = '#ff9c09'
      // 设置画笔宽度
      ctx.lineWidth = 2
      // 开始绘制“当前”的路径
      ctx.beginPath()
      // 绘制圆形 (重点在怎样把角度换算成弧度)
      ctx.arc(
        35,
        35,
        30,
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

<style lang='less' scoped>
.titel {
  margin-bottom: 15px;
}
.bottom {
  display: flex;
  .left {
    color: #666;
    font-size: 16px;
    li {
      line-height: 22px;
    }
  }
  .center {
    padding: 26px 70px;
    position: relative;
    div.recommend {
    //   transform: rotate(-25deg);
      position: absolute;
      top: -9;
      left: 90;
      width: 90px;
      height: 90px;
      line-height: 90px;
      border: 2px solid #ffe6c0;
      text-align: center;
      font-size: 30px;
      border-radius: 50%;
      color: #ffe6c0;
    }
  }
  .right {
    position: relative;
    .box {
      position: absolute;
      width: 60px;
      height: 60px;
      text-align: center;
      font-size: 16px;
      border-radius: 50%;
      color: #ff9c09;
      top: 15px;
    }
    .c1{
      left: 5px;  
    }
    .c2{
      left: 110px;  
    }
    .c3{
      left: 215px;  
  }
  }
}
/deep/.el-rate__icon {
  font-size: 22px;
}
</style>