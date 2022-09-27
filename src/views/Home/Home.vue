<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer'
import Recommend from '@/views/Home/Recommend/Recommend'
import Rank from '@/views/Home/Rank/Rank'
import Like from '@/views//Home/Like/Like'
import Floor from '@/views//Home/Floor/Floor'
import Brand from '@/views//Home/Brand/Brand'
import { mapState } from 'vuex'
export default {
  name: 'myHome',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted () {
    // 派发action 获取floor组件的数据
    this.$store.dispatch('getFloorList')
    // 获取用户信息在首页展示
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped>

</style>
