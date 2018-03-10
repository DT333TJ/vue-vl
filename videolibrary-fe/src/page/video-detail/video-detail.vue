/** 
 * @Desc: 视频详情页面
 */
<template>
  <div class="video-detail-page">
    <!-- 公共头部 -->
    <v-header></v-header>
    <!-- 居中内容容器 -->
    <page-box>
      <!-- 视频展示 -->
      <div style="height: 400px;">
        <router-link to="/home-page">测试跳转</router-link>
      </div>
      <!-- 推荐的视频列表 -->
      <slick-slide :key="index" :slickObj="data"></slick-slide>
    </page-box>
    <!-- 公共底部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import PageBox from 'component/page-box'
  import SlickSlide from 'component/slick-slide'

  export default {
    name: 'video-detail',
    components: {
      PageBox,
      SlickSlide
    },
    data: function() {
      return {
        data: 
          {
            "type":"生命科学",
            "resources":[
              {
                "resourceId":1,
                "coverUrl":"xxx/xxx/xxx",
                "duration":500,
                "title":"蓝色星球"
              },
              {
                "resourceId":2,
                "coverUrl":"xxx/xxx/xxx",
                "duration":600,
                "title":"幽黯深海"
              }
            ],
            'length': 18
          }
        
      }
    },
    computed: {

    },
    watch: {

    },
    created: function() {

    },
    mounted: function() {

    },
    destoryed: function() {

    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  .video-detail-page
    position relative
    width 100%

</style>
