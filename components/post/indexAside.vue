<template>
  <div class="aside">
    <div class="aside-container">
      <div class="asidetop">
        <ul>
          <li v-for="(item,index) in cityList"
              :key="index">
            <p>{{item.type}}<i class="el-icon-arrow-right"></i></p>
            <div class="asideconseal">
                <!-- <div v-for="(item,index) in item.children" :key="index">
                    <p v-if="number === index">{{item.city}}</p>
                </div> -->
            </div>
          </li>
        </ul>

      </div>
      <div class="asidebottom">
        <p>推荐城市</p>
        <img src="pic_sea.jpeg"
             alt="">
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      cityList: [],
      number : 0
    }
  },
  mounted() {
    this.$axios({
      url: '/posts/cities'
    }).then(res => {
      this.cityList = res.data.data
    })
  }
}
</script>

<style lang='less' scoped>
.aside-container {
  .asidetop {
    position: relative;
    &:hover {
      .asideconseal {
        display: block;
      }
    }
    > ul {
      li {
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border: 1px solid #dddddd;
        padding: 0 15px;
        margin-bottom: -1px;
        p {
          i {
            float: right;
            line-height: 40px;
            font-size: 20px;
            color: #a7a7a7;
          }
        }
      }
    }
    .asideconseal {
      position: absolute;
      border: 1px solid #dddddd;
      top: 0px;
      left: 260px;
      display: none;
    
    }
  }
  .asidebottom {
    margin-top: 10px;
    p {
      line-height: 35px;
      border-bottom: 1px solid #dddddd;
    }
    img {
      margin-top: 10px;
      width: 100%;
    }
  }
}
</style>