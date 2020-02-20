export const state = () => {
  return {
    strategyList: {
    }
  };
};

export const mutations = {
  setStrategy(state, data) {
      data.data.forEach((item)=>{
        if(item.images.length >= 3){
            item.images.length = 3
        }
      })
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
