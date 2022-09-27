import { reqGetSearchInfo } from '@/api'
const state = {
  searchList: {}
}
const mutations = {
  getSearchInfo (state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchInfo ({ commit }, params = {}) {
    const result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('getSearchInfo', result.data)
    }
  }
}
const getters = {
  goodsList (state) {
    return state.searchList.goodsList || []
  },
  trademarkList (state) {
    return state.searchList.trademarkList || []
  },
  attrsList (state) {
    return state.searchList.attrsList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
