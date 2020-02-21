export const state = () => {
  return {
    //攻略数据列表
    strategyList: {},
  
  };
};

export const mutations = {
  //设置总条数
  strategyList(state, data) {
    state.strategyList = data;
  }
};

export const actions = {
  //攻略首页搜索接口
  citySearch(store, params) {
    //判断用户是否传入搜索关键字
    //没有则删除字段city
    let bl = false;
    if (!params.city) {
      bl = true;
    }
    if (bl) {
      delete params.city;
    }
    return this.$axios({
      url: "/posts",
      params
    }).then(res => {
      return res;
    });
  }
};
