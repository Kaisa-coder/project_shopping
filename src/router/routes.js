// 路由配置信息
// import Home from '@/views/Home/Home'
// import Search from '@/views/Search/Search'
// import Register from '@/views/Register/Register'
// import Login from '@/views/Login/Login'
// import Detail from '@/views/Detail/Detail'
// import AddCartSuccess from '@/views/AddCartSuccess/AddCartSuccess'
// import ShopCart from '@/views/ShopCart/ShopCart'
// import Trade from '@/views/Trade/Trade'
// import Pay from '@/views/Pay/Pay'
// import PaySuccess from '@/views/PaySuccess/PaySuccess'
// import Center from '@/views/Center/Center'
// import MyOrder from '@/views/Center/myOrder/myOrder'
// import GroupOrder from '@/views/Center/groupOrder/groupOrder'
export default [
  // home
  {
    path: '/home',
    // 进行路由懒加载
    component: () => import('@/views/Home/Home'),
    meta: { isHideFooter: true }
  },
  // search
  {
    name: 'search',
    path: '/search/:keyword?',
    component: () => import('@/views/Search/Search'),
    meta: { isHideFooter: true },
    props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
  },
  // register
  {
    path: '/register',
    component: () => import('@/views/Register/Register'),
    meta: { isHideFooter: false }
  },
  // login
  {
    path: '/login',
    component: () => import('@/views/Login/Login'),
    meta: { isHideFooter: false }
  },
  // detail
  {
    path: '/detail/:skuid',
    component: () => import('@/views/Detail/Detail'),
    meta: { isHideFooter: true }
  },
  // addCartSuccess
  {
    name: 'addCartSuccess',
    path: '/addCartSuccess',
    component: () => import('@/views/AddCartSuccess/AddCartSuccess'),
    meta: { isHideFooter: true }
  },
  // shopcart
  {
    path: '/shopcart',
    component: () => import('@/views/ShopCart/ShopCart'),
    meta: { isHideFooter: true }
  },
  // trade
  {
    path: '/trade',
    component: () => import('@/views/Trade/Trade'),
    meta: { isHideFooter: true },
    beforeEnter: (to, from, next) => {
      // 去trade必须从shopcart来
      if (from.path === '/shopcart') {
        next()
      } else {
        // 其他的路由来 则留在当前页
        next(false)
      }
    }
  },
  // pay
  {
    path: '/pay',
    component: () => import('@/views/Pay/Pay'),
    meta: { isHideFooter: true },
    beforeEnter: (to, from, next) => {
      // 去trade必须从shopcart来
      if (from.path === '/trade') {
        next()
      } else {
        // 其他的路由来 则留在当前页
        next(false)
      }
    }
  },
  // paysuccess
  {
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess/PaySuccess'),
    meta: { isHideFooter: true }
  },
  // Center
  {
    path: '/center',
    component: () => import('@/views/Center/Center'),
    meta: { isHideFooter: true },
    children: [
      {
        path: 'myorder',
        component: () => import('@/views/Center/myOrder/myOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/views/Center/groupOrder/groupOrder')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  }
]
