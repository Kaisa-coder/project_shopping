import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav/TypeNav'
import Carousel from '@/components/Carousel/Carousel'
import Pagination from '@/components/Pagination/Pagination'
import { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api/index'
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
import '@/plugins/validate'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// Vue.config.productionTip = false
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm
})
new Vue({
  router,
  beforeCreate () {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  store,
  render: h => h(App)
}).$mount('#app')
