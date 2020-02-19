export const state = () => {
  return {
    strategyList: {}
  };
};

export const mutations = {
  setStrategy(state, data) {
    state.strategyList = data;
  }
};

export const actions = {
  //攻略首页搜索接口
  citySearch(store, params) {
    let bl = false;
    if (!params.city) {
      bl = true;
    }
    if (bl) {
      delete params.city
    }
    return this.$axios({
      url: "/posts",
      params
    }).then(res => {
      return res;
    });
  }
};
