// 登录与注册模块
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from '@/api/index'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  getCode (state, code) {
    state.code = code
  },
  userLogin (state, token) {
    state.token = token
  },
  getUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  userLogout (state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode ({ commit }, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('getCode', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户注册
  async userRegister ({ commit }, user) {
    const result = await reqUserRegister(user)
    console.log(result)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('falie'))
    }
  },
  // 用户登录
  async userLogin ({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      commit('userLogin', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('getUserInfo', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户退出登录
  async userLogout ({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      // action里面不能操作state需要提交给mutations修改state
      commit('userLogout')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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
