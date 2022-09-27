import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
// 封装游客身份模块uuid---生成一个随机的字符串 (不能在变)
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  // 游客的临时ID
  uuid_token: getUUID()
}
const mutations = {
  getGoodsInfo (state, goodInfo) {
    state.goodInfo = goodInfo
  }
}
const actions = {
  // 获取产品信息
  async getGoodsInfo ({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('getGoodsInfo', result.data)
    }
  },
  // 添加产品到购物车
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    // 服务器没有返回  data 因此不需要在state中存储数据
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 返回一个 Promise
    if (result.code === 200) {
      // 加入购物车成功
      return 'OK'
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('Faile'))
    }
  }
}
const getters = {
  categoryView (state) {
    // 比如state.goodInfo初识状态是一个空对象，空对象categoryView属性值为undefined
    return state.goodInfo.categoryView || {}
  },
  skuInfo (state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList (state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
