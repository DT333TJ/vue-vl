/** 
 * @Desc: 首页
 */
<template>
  <div class="home-page fill-width">
    <!-- 公共头部 -->
    <v-header :isFixed="true"></v-header>
    <!-- 轮播图 -->
    <Carousel
      v-model="carouselValue"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :height="setting.height"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow">
      <CarouselItem v-for="(carouselItem, index) in carouselData" :key="index">
        <div 
          @click="_detailButtonClick(carouselItem.targetUrl)"
          @mouseenter.stop="_stopCarouselRun"
          @mouseleave.stop="_startCarouselRun"
          :style="{backgroundImage: `url('${originUrl}/${carouselItem.master}')`, backgroundColor: `#${carouselItem.colour}`}"        
          :title="carouselItem.title"
          class="carousel-item clickable fill">
          <div class="carousel-shadow-bg fill" :style="{backgroundImage: `url('${originUrl}/${carouselItem.borders}')`}"></div>
        </div>
      </CarouselItem>
    </Carousel>

    <!-- 居中内容容器 -->
    <page-box>
      <slick-slide v-for="(item , index) in data" :key="index" :slickObj="item"></slick-slide>
    </page-box>

    <!-- 公共底部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { originUrl } from 'config/constant'
  import PageBox from 'component/page-box'
  import SlickSlide from 'component/slick-slide'
  import { requestGetCarouselData, requestGetRecommendData } from 'api/home-page'

  export default {
    name: 'home-page',
    components: {
      PageBox,
      SlickSlide
    },
    data: function() {
      return {
        // 屏幕宽度
        screenWidth: document.body.clientWidth,

        // 推荐视频数据
        data: [],

        // 轮播相关内容
        carouselValue: 0,
        setting: {
          autoplay: true,
          autoplaySpeed: 5000,
          height: document.body.clientWidth >= 1600 ? 620 : 420,
          dots: 'inside',
          radiusDot: false,
          trigger: 'hover',
          arrow: 'never'
        },
        carouselData: []
      }
    },
    computed: {
      originUrl: function() {
        // host路径，配置图片的主路径
        return originUrl === 'http://localhost:7001' ? 'http://videolib.viewshare.net' : originUrl
      }
    },
    mounted: function() {
      // 确保回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0
      //绑定屏幕缩放事件
      window.addEventListener('resize', this._resizeEvent)
      //获取轮播数据
      this._getCarouselData()
      //获取推荐视频资源
      this._getRecommendData()
    },
    destoryed: function() {
      window.removeEventListener('resize', this._resizeEvent)
    },
    methods: {
      /** 
       * 点击轮播跳转视频页面
       * @param {String} id: 跳转的参数
      */
      _detailButtonClick: function(targetUrl) {
        window.open(window.location.origin + `/#/video-detail?targetUrl=${targetUrl}`)
      },

      /** 
       * 鼠标移入事件(停止轮播)
      */
      _stopCarouselRun: function() {
        this.setting.autoplay = false
      },

      /** 
       * 鼠标移出事件(重启轮播)
      */
      _startCarouselRun: function() {
        this.setting.autoplay = true
      },

      /** 
       * 监听屏幕缩放事件
      */
      _resizeEvent: function() {
        window.screenWidth = document.body.clientWidth
        this.screenWidth = window.screenWidth
        this.setting.height = this.screenWidth >= 1600 ? 620 : 420
      },

      /**
       * 获取轮播图数据
      */
      _getCarouselData: function() {
        return requestGetCarouselData().then( response => {
          if (response.code === 0) {
            this.carouselData = response.data.sliders
          }
        })
      },

      /**
       * 获取推荐视频资源
      */
      _getRecommendData: function() {
        return requestGetRecommendData().then( response => {
          // console.log("requestRecommendData",response.data)
          if (response.code === 0) {
            this.data = response.data
          }
        })
      }
      
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .home-page
    position relative
    .carousel-item
      background-repeat no-repeat
      background-position center top
      background-size auto 100%
      opacity 1
      .carousel-shadow-bg
        background-repeat no-repeat
        background-position center top
        background-size auto 100%
        height 100%
</style>
