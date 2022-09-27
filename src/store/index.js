import Vue from 'vue'
import Vuex from 'vuex'
import home from './home/home'
import search from './search/search'
import detail from './Detail/Detail'
import shopcart from './shopcart/shopcart'
import user from './user/user'
import trade from './Trade/Trade'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
