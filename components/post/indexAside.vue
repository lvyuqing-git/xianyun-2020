<template>
  <div class="aside">
    <div class="aside-container">
      <!-- 侧边栏顶部 -->
      <div class="asidetop">
        <!-- 侧边栏列表部分 -->
        <ul>
          <li v-for="(item,index) in cityList"
              :key="index"
              @mouseover="alternumber(index)"
              class="fatherli">
            <span>{{item.type}}</span><i class="el-icon-arrow-right icon"></i>
            <!-- 侧边栏隐藏部分 -->
            <div class="asideconseal"
                 v-show="index == number">
              <ul>
                <li v-for="(item2,index2) in item.children"
                    :key="index2"
                    class="sonli">
                  <p class="childrens"><span class="index">{{index2+1}}</span> <span class="area">{{item2.city}}</span><i class="conten">{{item2.desc}}</i></p>
                </li>
              </ul>
              <div class="line"></div>
            </div>
          </li>
        </ul>

      </div>
      <!-- 侧边栏底部 -->

      <div class="asidebottom">
        <p>推荐城市</p>
        <!-- <img src="pic_sea.jpeg"
             alt=""> -->
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      cityList: [],
      number: 0
    }
  },
  mounted() {
    this.$axios({
      url: '/posts/cities'
    }).then(res => {
      this.cityList = res.data.data
    })
  },
  methods: {
    alternumber(index) {
      this.number = index
    }
  }
}
</script>

<style lang='less' scoped>
//  侧边栏顶部
.aside-container {
  .asidetop {
    position: relative;
    &:hover {
      .asideconseal {
        display: block;
      }
    }
    // 侧边栏列表部分

    .fatherli {
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      border: 1px solid #dddddd;
      padding: 0 15px;
      margin-bottom: -1px;
      .icon {
        float: right;
        line-height: 40px;
        font-size: 20px;
        color: #a7a7a7;
      }
      &:hover {
        border-right: none;
        color: #ffc14f;
        i {
          color: #ffc14f;
        }
        .conten {
          color: #9a9a9a;
        }
      }
    }
    // 侧边栏隐藏部分
    .asideconseal {
      position: absolute;
      top: 0px;
      left: 260px;
      display: none;
      border: 1px solid #dddddd;
      border-left: none;
      background-color: #fff;
      .sonli {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        width: 400px;
        .index {
          font-size: 20px;
          vertical-align: middle;
          font-style: italic;
        }
        .area {
          margin: 0 15px 0;
        }
      }
      .line {
        position: absolute;
        top: 164px;
        border-left: 1px solid #dddddd;
        height: 37px;
      }
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