<template>
  <div class="hotel-list">
    <!-- 酒店头部筛选条件 -->
    <el-row type="flex" class="hotel-filter">
      <!-- 价格区间 -->
      <el-col :span="5" class="command">
        <div>
          <el-row type="flex">
            <el-col>价格</el-col>
            <el-col style="text-align: right">0-{{ Math.floor(40*priceBar) }}</el-col>
          </el-row>
        </div>
        <div style="width: 90%">
          <el-slider v-model="priceBar"></el-slider>
        </div>
      </el-col>
      <!-- 住宿等级 -->
      <el-col :span="5" class="command">
        <div>住宿等级</div>
        <div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ '已选'+ optionsObj.levels.length +'项' || '不限' }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item icon="el-icon-circle-check">  <i class="iconfont "></i> <i class="iconfont iconcircle"></i> 蚵仔煎</el-dropdown-item> -->
              <el-dropdown-item
                v-for="(item, index) in optionsFilter.levels"
                :key="index"
                @click.native="optionsSelect('levels', index)"
              >
                <i
                  class="iconfont"
                  :class="{'iconcircle': !item.select, 'iconright-1': item.select}"
                ></i>
                {{ item.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!-- 住宿类型 -->
      <el-col :span="5" class="command">
        <div>住宿类型</div>
        <div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ '已选'+ optionsObj.types.length +'项' || '不限' }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item icon="el-icon-circle-check">  <i class="iconfont iconright-1"></i> <i class="iconfont iconcircle"></i> 蚵仔煎</el-dropdown-item> -->
              <el-dropdown-item
                v-for="(item, index) in optionsFilter.types"
                :key="index"
                @click.native="optionsSelect('types', index)"
              >
                <i
                  class="iconfont"
                  :class="{'iconcircle': !item.select, 'iconright-1': item.select}"
                ></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!-- 酒店设施 -->
      <el-col :span="5" class="command">
        <div>酒店设施</div>
        <div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ '已选'+ optionsObj.assets.length +'项' || '不限' }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item icon="el-icon-circle-check">  <i class="iconfont iconright-1"></i> <i class="iconfont iconcircle"></i> 蚵仔煎</el-dropdown-item> -->
              <el-dropdown-item
                v-for="(item, index) in optionsFilter.assets"
                :key="index"
                @click.native="optionsSelect('assets', index)"
              >
                <i
                  class="iconfont"
                  :class="{'iconcircle': !item.select, 'iconright-1': item.select}"
                ></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <!-- 酒店品牌 -->
      <el-col :span="4" class="command brand">
        <div>酒店品牌</div>
        <div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ '已选'+ optionsObj.brands.length +'项' || '不限' }}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="float:right;max-height: 230px;overflow: auto;">
              <!-- <el-dropdown-item icon="el-icon-circle-check">  <i class="iconfont iconright-1"></i> <i class="iconfont iconcircle"></i> 蚵仔煎</el-dropdown-item> -->
              <el-dropdown-item
                v-for="(item, index) in optionsFilter.brands"
                :key="index"
                @click.native="optionsSelect('brands', index)"
              >
                <i
                  class="iconfont"
                  :class="{'iconcircle': !item.select, 'iconright-1': item.select}"
                ></i>
                {{item.name}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <!-- 酒店详情列表 -->
    <div class="hotel-box">
        <!-- 有数据时 -->
      <el-row type="flex" class="box-line" v-for="(item, index) in hotelList" :key="index">
        <el-col :span="7">
          <img :src="item.photos" alt />
        </el-col>
        <el-col :span="17" class="hotel-detail">
          <h4>
            <nuxt-link to>{{ item.name }}</nuxt-link>
          </h4>
          <!-- 右侧酒店品牌 -->
          <el-row type="flex">
            <el-col :span="16">
              <div class="hotel-en-name">
                <span>{{ item.alias }}</span>
                <span v-if="item.hotellevel">
                  <i
                    class="iconfont iconhuangguan"
                    v-for="(item,index) in item.hotellevel.level"
                    :key="index"
                  ></i>
                  {{ item.hoteltype.name || item.breadcrumb.split('>')[2] }}
                </span>
              </div>
              <!-- 评分 -->
              <el-row class="hotel-score">
                <!-- 评分 -->
                <el-col :span="9">
                  <el-rate
                    v-model="item.scoresAverage"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}分"
                  ></el-rate>
                </el-col>
                <el-col :span="6" style="font-size: 14px;">
                  <span class="height-light">{{item.all_remarks}}</span> 条评价
                </el-col>
                <el-col :span="7" style="font-size: 14px;">
                  <span class="height-light">{{ item.num_collected }}</span>篇游记
                </el-col>
              </el-row>
              <!-- 地址 -->
              <div class="hotel-location">
                <i iconfont iconlocation></i>
                <span>位于: {{item.address}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="hetelInfoAside">
                <ul>
                  <li v-for="(i, k) in item.products" :key="k">
                    <span>{{ i.name }}</span>
                    <span class="left">
                      ￥{{ i.price }}起
                      <i class="el-icon-arrow-right"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
        <!-- 没有数据时 -->
        <div style="text-align: center; padding: 50px" v-show="hotelList.length === 0">
            暂无符合条件的酒店
        </div>
    </div>
    <!-- 分页 -->
    <div class="pageNum">
      <el-pagination
        @current-change="handlerPage"
        :current-page="currentPage"
        small
        layout="prev, pager, next"
        :total="50"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceBar: 100,
      cityName: "",
      cityId: "",
      optionsFilter: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      },
      hotelList: [],
      value: 3.7,
      currentPage: 1,
      hotelOptions: {
        price_lt: "", //价格上限
        city: "", //城市id
        hotellevel_in: "", //酒店星级id
        hoteltype_in: "", // 酒店类型id  经济型
        hotelasset_in: "", //酒店设施id
        hotelbrand_in: "" //酒店品牌id
      },
      //   已选择的条件有
      optionsObj: {
        levels: [],
        types: [],
        assets: [],
        brands: []
      }
    };
  },
  mounted() {
    //   获取options数据
    this.getFilterOptions();
    setTimeout(() => {
      // 获取酒店列表
     //   获取城市信息
      this.getCityInfo();
      this.getHotelList({
          city: this.cityId
      });
    }, 100);
  },
  methods: {
    //   获取筛选条件数据
    getFilterOptions() {
      this.$axios({
        url: "/hotels/options"
      }).then(({ data: { data } }) => {
        console.log(data);
        if (data) {
          //   数据改造
          let arr = Object.keys(data);
          console.log(arr);
          arr.forEach(i => {
            data[i].map(item => {
              // 初始化没勾选
              item.select = false;
            });
            // 初始化勾选 为空数组
          });
          this.optionsFilter = data;
        }
      });
    },
    // 获取酒店详情
    getHotelList(params) {
      this.$axios({
        url: "/hotels",
        // params: {
        //   city: this.cityId
        // }
        params
      }).then(({ data: { data } }) => {
        console.log(data);
        if (data.length) {
          //   改造数据
          data.map(item => {
            item.scoresAverage =
              (item.scores.environment +
                item.scores.product +
                item.scores.service) /
              3 /
              2;
            item.scoresAverage = Number(item.scoresAverage.toFixed(1));
          });
          this.hotelList = data;
        }else {
            this.hotelList = []
        }
      });
    },
    // 获取城市和id
    getCityInfo() {
      this.cityName = this.$store.state.hotel.hotelCity;
      this.cityId = this.$store.state.hotel.cityInfo.id;
    },
    // 当前页码改变
    handlerPage(val) {
      this.currentPage = val;
      console.log(val);
    },
    optionsSelect(opName, index) {
      //   console.log(opName);
      //   console.log(index);
      this.optionsFilter[opName][index].select = !this.optionsFilter[opName][
        index
      ].select;
      // 每次清空数组
      this.optionsObj[opName] = [];
      this.optionsFilter[opName].forEach(val => {
        // console.log(val);
        if (val.select) {
          this.optionsObj[opName].push(val.id);
        }
      });

        //   获取参数
        this.getParams()
    },
    // 获取参数
    getParams() {
        let paramsObj = {}
        this.hotelOptions.city = this.cityId
        // price_lt: "", //价格上限
        // city: "", //城市id
        // hotellevel_in: "", //酒店星级id
        // hoteltype_in: "", // 酒店类型id  经济型
        // hotelasset_in: "", //酒店设施id
        // hotelbrand_in: "" //酒店品牌id
        this.hotelOptions.price_lt = Math.floor(40*this.priceBar)
        this.hotelOptions.hotellevel_in = this.optionsObj.levels[this.optionsObj.levels.length - 1]
        this.hotelOptions.hoteltype_in = this.optionsObj.types[this.optionsObj.types.length - 1]
        this.hotelOptions.hotelasset_in = this.optionsObj.assets[this.optionsObj.assets.length - 1]
        this.hotelOptions.hotelbrand_in = this.optionsObj.brands[this.optionsObj.brands.length - 1]

        Object.keys(this.hotelOptions).forEach(val => {
            if(this.hotelOptions[val]) {
                paramsObj[val] = this.hotelOptions[val]
            }
        })
        console.log(paramsObj)
        // 重新获取酒店数据
        this.getHotelList(paramsObj)
        
        

    }
  }
};
</script>

<style lang="less" scoped>
.hotel-list {
  .height-light {
    color: #f90;
  }
  .hotel-filter {
    border: 1px solid #ddd;
    color: gray;
    .command {
      &:not(:last-of-type) {
        border-right: 1px solid #ddd;
      }
      padding: 15px;
      > div {
        margin-top: 10px;
      }
      /deep/.el-dropdown {
        margin-top: 15px;
        display: flex;
        width: 100%;
        font-size: 16px;
        .el-dropdown-link {
          flex: 1;
        }
        i {
          float: right;
        }
      }
    }
  }
  .hotel-box {
    .box-line {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      img {
        width: 100%;
        max-width: 290px;
        height: 190px;
      }
      .hotel-detail {
        padding-left: 20px;
        h4 {
          font-weight: normal;
          font-size: 24px;
        }
        .hotel-en-name {
          font-size: 14px;
          color: #999;
          span {
            margin-right: 5px;
          }
          .iconhuangguan {
            color: #f90;
          }
        }
      }
    }
    .hotel-score {
      padding: 15px 0;
    }
    .hotel-location {
      font-size: 14px;
      color: #666;
    }
  }
  .pageNum {
    padding: 20px 40px;
    text-align: right;
  }

  .hetelInfoAside {
    width: 225px;
    font-size: 16px;
    margin: 0 auto;
    margin-top: -14px;
    li {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 14px 10px;
      color: #606266;
      border-bottom: 1px solid #ebeef5;
      .left {
        color: #ff9900;
      }
      i {
        padding-left: 5px;
        color: #606266;
      }
    }
  }
}
</style>