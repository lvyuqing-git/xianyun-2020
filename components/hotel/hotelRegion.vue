<template>
  <div class="region">
    <el-row type="flex" justify="space-between">
      <!-- 左侧模块 -->
      <div class="left">
        <!-- 区域 -->
        <el-row type="flex">
          <el-col :span="3">
            <div class="area">区域 :</div>
          </el-col>
          <!-- 区域景点名称 -->
          <el-col type="flex">
            <div class="spot">
              <span class="cityname">沙头</span>
              <span class="cityname">沙中</span>
              <span class="cityname">沙雕</span>
              <span class="cityname">宝安国际机场</span>
              <span class="cityname">宝安国际机场</span>
              <span class="cityname">沙尾</span>
              <span class="cityname">沙比</span>
              <span class="cityname">沙比</span>
              <span class="cityname">沙了你</span>
              <span class="cityname">沙鱼</span>
              <span class="cityname">沙鱼</span>
              <span class="cityname">沙鱼</span>
              <span class="cityname">沙鱼</span>
              <span class="cityname">沙士比亚</span>
              <span class="cityname">沙士比亚</span>
              <span class="cityname">沙士比亚</span>
              <span class="cityname">沙士比亚</span>
              <span class="cityname">沙沙</span>
              <span class="cityname">宝安国际机场</span>
              <span class="cityname">宝安国际鸭场</span>
              <span class="cityname">宝安国际猪场</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">沙比</span>
              <span class="cityname">沙比</span>
              <span class="cityname">沙比</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">宝安国际牛场</span>
              <span class="cityname">宝安国际牛场</span>
            </div>
          </el-col>
        </el-row>

        <!-- 均价 -->
        <el-row type="flex">
          <el-col :span="3">
            <div class="price">
              均价
              <el-tooltip
                class="item"
                effect="dark"
                content="等级均价由平日价格计算得出，节假日价格会有上浮"
                placement="top-start"
              >
                <i class="el-icon-question"></i>
              </el-tooltip>&nbsp;:
            </div>
          </el-col>
          <!-- 等级价格 -->
          <el-tooltip
            content="等级均价由平日价格计算得出，节假日价格会有上浮"
            placement="top-start"
            :visible-arrow="false"
          >
            <span>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <span class="qian">¥332</span>
            </span>
          </el-tooltip>
          <el-tooltip
            content="等级均价由平日价格计算得出，节假日价格会有上浮"
            placement="top-start"
            :visible-arrow="false"
          >
            <span>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <span class="qian">¥521</span>
            </span>
          </el-tooltip>
          <el-tooltip
            content="等级均价由平日价格计算得出，节假日价格会有上浮"
            placement="top-start"
            :visible-arrow="false"
          >
            <span>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <i class="el-icon-star-on"></i>
              <span class="qian">¥768</span>
            </span>
          </el-tooltip>
        </el-row>
      </div>

      <!-- 右侧地图模块 -->
      <el-col>
        <div class="right map"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='less'>
.map {
  width: 420px;
  height: 260px;
  // margin-left: 20px;
  background-color: yellow;
}
.cityname {
  color: #666;
  cursor: pointer;
  margin-right: 14px;
  display: inline-block;
  &:hover {
    color: #09f;
    text-decoration: underline;
  }
}
.el-col-4 {
  display: inline;
}
.region {
  font-size: 14px;
  color: #666;
}
.spot {
  margin-right: 20px;
}
.el-icon-question {
  color: #ccc;
  font-size: 16px;
}
.el-row--flex {
  margin-bottom: 20px;
}
.el-icon-star-on {
  color: #f90;
  font-size: 16px;
}
.qian {
  margin-left: 5px;
  margin-right: 30px;
}
</style>