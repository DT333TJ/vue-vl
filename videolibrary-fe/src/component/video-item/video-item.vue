/** 
 * @Desc: 视频item组件
 */
<template>
  <div class="video-item-page fill clickable">
    <!-- 照片容器 -->
    <div class="img-box fill-width">
      <span class="video-time">05:30</span>
      <img class="fill" src="../../image/demo.jpg" alt="">
    </div>

    <!-- 文字容器 -->
    <div class="text-box" :title="videoItem.title" v-text="videoItem.title ? videoItem.title : '资源名称'"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'video-item',
    props: {
      videoItem: {
        type: Object,
        default: {}
      }
    },
    data: function() {
      return {

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
  @import '~style/variable'

  .video-item-page
    position relative
    height 100%
    .img-box
      position relative
      height 75%
      .video-time
        position absolute
        display inline-block
        padding 5px 10px
        right 0
        bottom 0

    .text-box
      display -webkit-box
      height 25%
      padding 0 5px
      font-size 14px
      word-break break-all
      text-overflow ellipsis
      -webkit-box-orient vertical /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp 2 /** 显示的行数 **/
      overflow hidden  /** 隐藏超出的内容 **/
</style>
