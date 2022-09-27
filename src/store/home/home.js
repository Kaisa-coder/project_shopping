import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
const state = {
  categoryList: [],
  // 轮播图数据
  bannerList: [],
  // floor的数据
  floorList: []
}
const mutations = {
  categoryList (state, categoryList) {
    state.categoryList = categoryList
  },
  getBannerList (state, bannerList) {
    state.bannerList = bannerList
  },
  getFloorList (state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  async categoryList ({ commit }) {
    const result = await reqCategoryList()
    if (result.code === 200) {
      commit('categoryList', result.data)
    }
  },
  // 获取轮播图
  async getBannerList ({ commit }) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      commit('getBannerList', result.data)
    }
  },
  // 获取floor数据
  async getFloorList ({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) commit('getFloorList', result.data)
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}
