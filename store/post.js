export const state = () => {
  return {
    a: 123
  };
};

export const actions = {
  //攻略首页搜索接口
  citySearch(store,params) {
    return this.$axios({
      url: "/posts",
      params
    }).then(res => {
     return res
    });
  }
};
