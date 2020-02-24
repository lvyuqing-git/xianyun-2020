// 固定的属性，必须要export暴露出去的
export const state = () => {
    return {
        // 酒店信息
        hotelInfo: {
        },
        // 当前城市
        hotelCity: '',
        cityInfo: {}
    }
}


// 固定的属性，同步修改state中的值
export const mutations = {
    // 函数名自定义,
    // 第一个参数必须是state, 第二个参数调用时候传入的参数
    setHotelCity(state, data){
        state.hotelCity = data;
    },
    setCityInfo(state, data) {
        state.cityInfo = data
    }
}