<template>
  <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
            <img :src="carousel.imgUrl">
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'myCarousel',
  props: ['list'],
  watch: {
    floor: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          const mySwiper = new Swiper(this.$refs.cur, {
            // 设置轮播图防线
            direction: 'horizontal',
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              // 分页器类型
              type: 'bullets',
              // 点击分页器，切换轮播
              clickable: true
            },
            // 自动轮播
            autoplay: {
              delay: 1000,
              // 如果设置为true，当切换到最后一个slide时停止自动切换
              stopOnLastSlide: true,
              // 用户操作swiper之后，是否禁止autoplay
              disableOnInteraction: false
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar'
            }
          })
          console.log(mySwiper)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
