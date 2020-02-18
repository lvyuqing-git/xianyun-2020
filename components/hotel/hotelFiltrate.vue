<template>
  <div class="filtrate">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <!-- 切换城市框 -->
      <el-form-item>
        <el-autocomplete
          class="inline-input"
          v-model="form.city"
          :fetch-suggestions="querySearch"
          placeholder="切换城市"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <!-- 选择日期框 -->
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <!-- 人数选择框  -->
      <el-form-item>
        <!-- 人数选择弹出框 -->
        <el-popover :visible-arrow="false" placement="bottom-start" width="300" trigger="click">
          <el-row type="flex" justify="item-center" style="align-items:center">
            <el-col>
              <span>每间</span>
            </el-col>
            <el-col>
              <el-select v-model="value1" size="mini" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label + ' 成人'"
                  :value="item.value"
                >{{item.label }}</el-option>
              </el-select>
            </el-col>
            <el-col>
              <el-select v-model="value2" size="mini" >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label +' 儿童'"
                  :value="item.value"
                >
                  <span style="float: left">{{item.label}}</span>
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- 分割线 -->
          <el-divider></el-divider>
          <el-row type="flex" justify="end">
            <el-button type="primary" size="mini">确定</el-button>
          </el-row>
          <el-input placeholder="人数未定" :readonly="true" suffix-icon="el-icon-user" slot="reference"></el-input>
        </el-popover>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary">查看价格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        city: "",
        date: ""
      },
      //日期配置
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      },
      //人数选择框渲染数据
      options: [
        {
          value: "1",
          label: "1"
        },
        {
          value: "2",
          label: "2"
        },
        {
          value: "3",
          label: "3"
        }
      ],
      value1: "1 成人",
      value2: "1 儿童"
    };
  },
  methods: {
    // 切换城市
    querySearch() {},

    // 展开切换城市列表
    handleSelect() {},
    queren() {}
  }
};
</script>

<style lang='less' scoped>
/deep/.el-icon-user {
  font-size: 18px;
}
.el-col {
  margin: 0 5px;
}
.el-select-dropdown__item.selected {
  // color: #F5F7FA;
  font-weight: normal;
}
</style>