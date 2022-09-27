import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api/index'
const state = {
  cartList: []
}
const mutations = {
  getCartList (state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  async getCartList ({ commit }) {
    const result = await reqCartList()
    if (result.code === 200) {
      commit('getCartList', result.data)
    }
  },
  // 删除购物车某个产品
  async deleteCartListBySkuId ({ commit }, skuId) {
    const result = await reqDeleteCartById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('Faile'))
    }
  },
  // 修改购物车产品的选中状态
  async updateCheckedById ({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  deleteAllCheckedCart ({ dispatch, getters }) {
    // 获取购物车全部产品是一个数组
    const PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      const promise = item.isChecked === 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      // 将每一次返回的 Promise添加到数组中
      PromiseAll.push(promise)
      // 只要全部promis都成功则返回的结果为成功 若有一个失败 返回的即使失败的结果
      return Promise.all(PromiseAll)
    })
  },
  updateAllCartIsChecked ({ dispatch, state }, isChecked) {
    const PromiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      const promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const getters = {
  cartList (state) {
    return state.cartList[0] || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
