<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
export default {
  name: 'myAPp',
  components: {
    Header,
    Footer
  },
  mounted () {
    // 派发一个action,获取商品列表的三级列表
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
