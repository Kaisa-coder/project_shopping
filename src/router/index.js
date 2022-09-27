import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
Vue.use(VueRouter)
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 页面滚动到顶部
    return { y: 0 }
  }
})
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  // 用户已经登录但想去/login,让留在首页
  if (token) {
    if (to.path === '/login' || to.path === '/register') {
      next('/home')
    } else {
      // 登录了但去的不是/login
      // 如果用户名存在
      if (name) {
        next()
      } else {
        // 如果没有用户信息，派发action让仓库存储用户信息再进行跳转
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // 服务器派发的token 有时效性 token失效了 获取不到用户信息
          // 清除token
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    const topath = to.path
    if (topath.indexOf('/trade') !== -1 || topath.indexOf('/pay') !== -1 || topath.indexOf('/center') !== -1) {
      next('/login?redirect=' + topath)
    } else {
      next()
    }
  }
})
export default router
