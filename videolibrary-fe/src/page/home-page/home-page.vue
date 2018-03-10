/** 
 * @Desc: 首页
 */
<template>
  <div class="home-page fill-width">
    <!-- 公共头部 -->
    <v-header></v-header>

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
          @click="_detailButtonClick"
          @mouseenter.stop="_stopCarouselRun"
          @mouseleave.stop="_startCarouselRun"
          :style="{backgroundImage: `url(${carouselItem.imageUrl})`, backgroundColor: carouselItem.bgColor}" 
          class="carousel-item clickable fill">
          <div class="carousel-shadow-bg fill" :style="{backgroundImage: `url(${carouselItem.bgUrl})`}"></div>
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
  import PageBox from 'component/page-box'
  import SlickSlide from 'component/slick-slide'

  export default {
    name: 'home-page',
    components: {
      PageBox,
      SlickSlide
    },
    data: function() {
      return {
        data: [
          {
            "type":"生命科学",
            "resources":[
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              }
            ]
          },
          {
            "type":"地球科学",
            "resources":[
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              }
            ]
          },
          {
            "type":"物质科学",
            "resources":[
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              },
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              },
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              }
            ]
          },
          {
            "type":"社会人文",
            "resources":[
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球蓝色星球"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              }
            ]
          }
        ],

        // 轮播数据
        carouselValue: 0,
        setting: {
          autoplay: true,
          autoplaySpeed: 5000,
          height: 520,
          dots: 'inside',
          radiusDot: false,
          trigger: 'hover',
          arrow: 'never'
        },
        carouselData: [
          {	
            "title":"地壳的运动",
            "imageUrl":"http://r1.ykimg.com/051000005AA29523ADC0B0A94801A691",
            "bgColor": "rgb(7, 36, 57)",
            "bgUrl": "http://gw.alicdn.com/mt/TB1ITiZonvI8KJjSspjXXcgjXXa-1664-520.png"
          },
          {
            "title":"熊猫的习性",
            "imageUrl":"http://r1.ykimg.com/051000005AA299D9ADC0AE2A5F0DB77C",
            "bgColor": "rgb(12, 39, 20)",
            "bgUrl": "http://gw.alicdn.com/mt/TB13keModnJ8KJjSszdXXaxuFXa-1664-520.png"
          },
          {
            "title":"风筝的制作",
            "imageUrl":"http://r1.ykimg.com/051000005AA32761ADC0AE3F9B0EAFA7",
            "bgColor": "rgb(41, 22, 58)",
            "bgUrl": "http://gw.alicdn.com/mt/TB1A4OaolTH8KJjy0FiXXcRsXXa-1664-520.png"
          },
          {
            "title":"宣传",
            "imageUrl":"http://r1.ykimg.com/051000005AA299B4ADC0B0B6990C8A9F",
            "bgColor": "rgb(75, 116, 98)",
            "bgUrl": "http://gw.alicdn.com/mt/TB1BDiZonvI8KJjSspjXXcgjXXa-1664-520.png"
          }
        ]
      }
    },
    watch: {

    },
    created: function() {

    },
    mounted: function() {

    },
    methods: {
      /** 
       * 点击跳转视频页面
      */
      _detailButtonClick: function() {
        window.open(window.location.origin + `/#/video-detail?resourceId=1&classId=2`)
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
</style>
