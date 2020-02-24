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
          <el-col>
            <div class="spot" :class="{hiddenOter: isHidden}">
              <a
                href="javascript:;"
                class="cityname"
                v-for="(item, index) in regionList"
                :key="index"
              >{{ item.name }}</a>
            </div>
            <div class="otherSpot" @click="isHidden = !isHidden">
              <i class="el-icon-d-arrow-right" :class="{up: isHidden}"></i>
              <span>等 {{ regionList.length }} 个区域</span>
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
        <div class="right map" id="mapContainer"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      regionList: [],
      isHidden: true
    };
  },
  mounted() {
    // 初始化地图
    this.initMap();
  },
  methods: {
    // 初始化地图
    initMap() {
      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=f47f52db731808548ce81d6430a397f4&plugin=AMap.CitySearch&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
      //初始化地图时，若center属性缺省，地图默认定位到用户所在城市的中心
      window.onLoad = () => {
        var map = new AMap.Map("mapContainer", {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 21
        });
        //获取用户所在城市信息
        this.showCityInfo(map);
      };
    },
    //获取用户所在城市信息
    showCityInfo(map) {
      //实例化城市查询类
      var citysearch = new AMap.CitySearch();
      //自动获取用户IP，返回当前城市
      citysearch.getLocalCity((status, result) => {
        // console.log(result);
        if (status === "complete" && result.info === "OK") {
          if (result && result.city && result.bounds) {
            var cityinfo = result.city;
            var citybounds = result.bounds;
            // 提示用户当前定位城市
            this.$alert("确认当前定位城市是" + cityinfo, "提示", {
              confirmButtonText: "确定"
              // callback: action => {
              //   if (action === "confirm") {
              //     // 存储当前城市
              //     this.cityName = cityinfo;
              //     this.$store.commit("hotel/setHotelCity", cityinfo);
              //   }
              // }
            });
            // 存储当前城市
            // this.cityName = cityinfo;
            // this.$store.commit("hotel/setHotelCity", cityinfo);
            // 固定城市
            this.cityName = '广州';
            this.$store.commit("hotel/setHotelCity", '广州');
            // console.log(this.cityName);
            // 获取当前酒店的位置
            this.getScenics();
            //地图显示当前城市
            map.setBounds(citybounds);
          }
        } else {
          console.log(result.info);
        }
      });
    },
    // 查找城市里的酒店位置
    getScenics() {
      this.$axios({
        url: "/cities",
        params: {
          name: this.cityName
        }
      }).then(({ data: { data } }) => {
        console.log(data);
        if (data.length) {
          this.$store.commit("hotel/setCityInfo", data[0]);
          this.regionList = data[0].scenics;
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.map {
  width: 420px;
  height: 260px;
  // margin-left: 20px;
  background-color: #ffffff;
}
.cityname {
  color: #666;
  cursor: pointer;
  margin-right: 14px;
  display: inline-block;
  font-size: 15px;
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
  &.hiddenOter {
    line-height: 1.8em;
    height: 3.6em;
    overflow: hidden;
  }
}
.otherSpot {
  margin-top: 6px;
  cursor: pointer;
  .el-icon-d-arrow-right {
    transform: rotate(270deg);
    color: #f90;
    &.up {
    transform: rotate(90deg);
    }
  }
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