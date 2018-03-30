/** 
 * @Desc: 视频item组件
 */
<template>
  <div class="video-item-page fill clickable">
    <!-- 照片容器 -->
    <div class="img-box fill-width" @mouseenter="_deleteBtnShow" @mouseleave="_deleteBtnHide">
      <div 
        v-show="deleteFlag && btnFlag" 
        class="collect-delete-btn vertical-center clickable" 
        @click.stop="$emit('deleteCollect', videoItem.resourceId)">
        <Icon type="trash-a" class="delete-icon"></Icon>
      </div>
      <span class="video-time" v-show="videoItem.duration && iconFlag">{{videoItem.duration | tranformTime }}</span>
      <img class="fill" :src="oriUrl + `/images/${videoItem.resourceId}/${videoItem.coverUrl}`">
      <div class="video-gradient"></div>
    </div>

    <!-- 文字容器 -->
    <div class="text-box" :title="videoItem.title" v-if="videoItem.title">{{ videoItem.title | textLength }}</div>
    <div class="text-box" :title="videoItem.title" v-else>资源名称</div> 
  </div>
</template>

<script type="text/ecmascript-6">
  import { originUrl } from 'config/constant'

  export default {
    name: 'video-item',
    data: function() {
      return {
        // host路径
        origin: originUrl,

        // 图标文字显示
        iconFlag: true,
        btnFlag: false
      }
    },
    props: {
      videoItem: {
        type: Object,
        default: {}
      },
      deleteFlag: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      oriUrl: function() {
        // host路径
        return this.origin === 'http://localhost:7001' ? 'http://videolib.viewshare.net' : this.origin
      }
    },
    methods: {
      /** 
       * 鼠标移入事件
      */
      _deleteBtnShow: function() {
        if (this.deleteFlag) {
          this.iconFlag = false
          this.btnFlag = true
        }
      },

      /** 
       * 鼠标移出事件
      */
      _deleteBtnHide: function() {
        if (this.deleteFlag) {
          this.iconFlag = true
          this.btnFlag = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .video-item-page
    box-sizing content-box
    border 1px solid #ebebeb
    height 99%
    .img-box
      position relative
      height 135px
      .collect-delete-btn
        position absolute
        top 105px
        right 10px
        width 30px
        height 30px
        line-height 30px
        display block
        z-index 9
        text-align center
        .delete-icon
          color white
          font-size 18px
          &:hover
            color #cb8919
      @media screen and (max-width 1600px)
        .collect-delete-btn
          top 60px
          right 2px
          .delete-icon
            font-size 14px 

      .video-time
        position absolute
        display inline-block
        padding 5px 10px
        right 0
        bottom 0
        z-index 9
        color #fff
    
      /*video中背景渐变*/    
      .video-gradient
        position absolute
        bottom 0
        width 100%
        height 25%
        background-color rgba(0, 0, 0, .2)
      @media screen and (max-width 1600px)
        .video-gradient
          height 35%

    .text-box
      display -webkit-box
      height 65px
      padding 10px 15px
      font-size 16px
      overflow hidden
      &:hover
        color #cb8919
    @media screen and (max-width 1600px) 
      .img-box 
        height 90px
      .text-box
        font-size 12px
        padding 4px 10px   
        height 45px
    
</style>
