import { reqAddressInfo, reqOrderInfo } from '@/api/index'
const state = {
  address: [],
  orderInfo: {}
}
const mutations = {
  getUserAddredd (state, address) {
    state.address = address
  },
  getOrder (state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getUserAddredd ({ commit }) {
    const result = await reqAddressInfo()
    if (result.code === 200) {
      commit('getUserAddredd', result.data)
    }
  },
  // 获取商品清单的数据
  async getOrder ({ commit }) {
    const result = await reqOrderInfo()
    if (result.code === 200) {
      commit('getOrder', result.data)
    }
  }

}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
