<template>
  <div class="strategyList">
    <div class="strategy"
         v-for="(item,index) in strategyList.data"
         :key="index">
      <!-- 上下结构类型 -->
      <nuxt-link :to="`/post/detail/?id=${item.id}`"
                 v-if="item.images.length > 2">
        <div class="up-down">
          <div class="title">
            {{item.title}}
          </div>
          <div class="content">
            <div v-html="item.content">
            </div>
          </div>
          <!-- //图片 -->
          <div class="pictures">
            <img :src="item"
                 alt=""
                 v-for="(item,index) in item.images"
                 :key="index">

          </div>
          <!-- 底部信息栏 -->
          <div class="postinfo">
            <ul>
              <li><i class="el-icon-location-outline"></i>{{item.cityName}}</li>
              <li>by</li>
              <li class="cityname"><img :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`"
                     alt=""
                     class="defaultAvatar">{{item.account.nickname}}</li>
              <li><i class="el-icon-view"></i> {{item.watch}}</li>
              <li class="star">{{item.like}}赞</li>
            </ul>
          </div>
        </div>
      </nuxt-link>

      <!-- 左右结构 -->
      <nuxt-link :to="`/post/detail/?id=${item.id}`"
                 v-else>
        <div class="zouyou clearfix">
          <div class="left">
            <div class="pictures">
              <img :src="item.images[0]">

            </div>
          </div>
          <div class="right">
            <div class="title">
              {{item.title}}
            </div>
            <div class="content">
              <div v-html="item.content">
              </div>
            </div>
            <!-- 底部信息栏 -->
            <div class="postinfo">
              <ul>
                <li><i class="el-icon-location-outline"></i>{{item.cityName}}</li>
                <li>by</li>
                <li class="cityname"><img :src="`${$axios.defaults.baseURL + item.account.defaultAvatar}`"
                       alt=""
                       class="defaultAvatar">{{item.account.nickname}}</li>
                <li><i class="el-icon-view"></i> {{item.watch}}</li>
                <li class="star">{{item.like}}赞</li>
              </ul>
            </div>
          </div>
        </div>
      </nuxt-link>

    </div>
  </div>
</template>

<script>
export default {
  props: ['searchValue', 'pagingObj'],
  watch: {
    searchValue() {
      this.init()
    },
    pagingObj: {
      deep: true,
      handler: function(val, oldVal) {
        this.init()
      }
    }
  },
  methods: {
    init() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
      this.$store
        .dispatch('post/citySearch', {
          _start:
            (this.pagingObj.currentChange - 1) * this.pagingObj.sizeChange || 0,
          _limit: this.pagingObj.sizeChange || 3,
          city: this.searchValue || ''
        })
        .then(res => {
          this.strategyList = res.data
          this.strategyList.data.forEach(item => {
            if (item.images.length >= 3) {
              item.images.length = 3
            }
          })
          this.$store.commit('post/setTotal', this.strategyList.total)
        })
    }
  },
  data() {
    return {
      strategyList: {}
    }
  },
  mounted() {
    this.init()
  
  }
}
</script>

<style lang='less' scoped>
.postinfo {
  margin-top: 15px;
  padding-bottom: 20px;
  li {
    float: left;
    font-size: 12px;
    line-height: 16px;
    color: #666;
    margin-right: 8px;
    i {
      margin-right: 2px;
    }
    .defaultAvatar {
      width: 18px;
      height: 18px;
      vertical-align: middle;
      margin-right: 2px;
    }
  }
  li.star {
    float: right;
    color: #ffab68;
    font-size: 18px;
  }
  li.cityname {
    color: #ffab68;
  }
}
.strategy {
  padding: 20px 0;
  border-bottom: 1px solid #efefef;
  .up-down {
    .title {
      font-size: 18px;
      color: #000;
      margin-bottom: 15px;
      &:hover {
        color: #ffa500;
        cursor: pointer;
      }
    }
    .content {
      width: 700px;
      height: 60px;
      overflow: hidden;
      color: #666;
      font-size: 14px;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    .pictures {
      display: flex;
      justify-content: space-between;
      img {
        width: 32%;
        height: 150px;
        object-fit: cover;
      }
    }
  }
  .zouyou {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .left {
      width: 224px;
      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
      }
    }
    .right {
      padding-left: 10px;
      width: 450px;
      .title {
        font-size: 18px;
        color: #000;
        margin-bottom: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          color: #ffa500;
          cursor: pointer;
        }
      }

      .content {
        width: 450px;
        height: 81px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        color: #666;
        font-size: 14px;
        margin-bottom: 15px;
        line-height: 1.5;
      }
    }
  }
}
</style>