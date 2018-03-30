/** 
 * @Desc: 视频详情页面
 */
<template>
  <div class="video-detail-page fill-width">
    <!-- 公共头部 -->
    <v-header></v-header>
    <!-- 居中内容容器 -->
    <page-box>
      <!-- 视频展示 -->
      <div class="video-box">
        <!-- 视频播放器 -->
        <div class="left-detail">
          <div class="video-mask" v-show="loadingVisible">
            <Spin fix>
              <Icon type="load-c" size=18 color="black" class="demo-spin-icon-load"></Icon>
              <div style="color: black">Loading</div>
            </Spin>
          </div>
          <video-box :resourceId="resourceId" :videoUrl="videoUrl" :coverUrl="coverUrl" :tValue="tValue" ref="videoWrapper"></video-box>
        </div>

        <!-- 内容介绍 -->
        <div class="right-detail" :style ="note" v-if="detailData.resource">
          <div class="video-title" v-text="detailData.resource.title ? detailData.resource.title : '暂无数据'" :title="detailData.resource.title"></div>
          <div class="tag-box clear-float">
            <!-- <span class="tag-item" v-if="detailData.resource.parentTitle">{{ detailData.resource.parentTitle }}</span>
            <span class="tag-item" v-if="detailData.resource.childTitle">{{ detailData.resource.childTitle }}</span> -->
            <span class="tag-item" v-for="(item, index) in detailData.resource.keywords" :key="index">{{item}}</span>
          </div>

          <!-- 预备之后可能出现的内容 -->
          <!-- <div class="introduce-video">
            <span class="introduce-left">来源：</span>
            <span class="introduce-right">{{ detailData.resource.source ? detailData.resource.source : '暂无数据'}}</span>
          </div>
          <div class="introduce-video">
            <span class="introduce-left">语言：</span>
            <span class="introduce-right">{{ detailData.resource.language ? detailData.resource.language : '暂无数据'}}</span>
          </div> -->
          <div class="introduce-video" style="margin-top: 15px">
            <span class="introduce-left">字幕：</span>
            <span class="introduce-right">无</span>
          </div>
          <div class="introduce-video">
            <span class="introduce-left">时长：</span>
            <span class="introduce-right">{{ detailData.resource.duration | tranformTime}}</span>
          </div>
          <div class="introduce-video clear-float">
            <span class="introduce-left float-left">简介：</span>
            <span class="introduce-right introduce-content float-left">{{ detailData.resource.description | textCententLength}}</span>

          </div>
          <div class="collect-box clickable" @click="_collectHandle(detailData.resource.resourceId)">
            <Icon type="heart" size="22" class="heart-icon" :class="{'already-collect': collectFlag }"></Icon>
            <span class="collect-text" :class="{'already-collect': collectFlag }">收藏</span>
          </div>
        </div>
      </div>

      <!-- 推荐的视频列表 -->
      <div class="slide-box">
        <div class="relate-video">相关视频</div>
        <!-- 有推荐的相关数据 -->
        <div class="slide-list-box" v-if="detailData.correlation && detailData.correlation.length">
          <li 
            class="slide-item-box"
            @click="_videoItemClick(videoItem)"
            v-for="(videoItem, index) in detailData.correlation" 
            :key="index">
            <div class="video-item-page">
              <div class="img-box fill-width">
                <span class="video-time">{{ videoItem.duration | tranformTime}}</span>
                <img class="fill" :src="oriUrl + `/images/${videoItem.resourceId}/${videoItem.coverUrl}`">
                <div class="video-gradient"></div>
              </div>
              <div class="text-box" :title="videoItem.title" v-if="videoItem.title">{{ videoItem.title | textLength}}</div>
              <div class="text-box" :title="videoItem.title" v-else>资源名称</div>
            </div>
          </li>
        </div>
        <!-- 没有推荐的数据 -->
        <div v-else style="text-align:center;height: 40px;line-height: 40px">
          暂无相关推荐的数据
        </div>
      </div>
    </page-box>
    <!-- 公共底部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { originUrl } from 'config/constant'
  import PageBox from 'component/page-box'
  import videoBox from 'component/video-box'
  import cookie from 'js-cookie'
  import { 
    requestGetCarouselDetail, 
    requestGetVideoDetail,
    requestPostCollect,
    requestDeleteCollect } from 'api/video-detail'

  export default {
    name: 'video-detail',
    components: {
      PageBox,
      videoBox
    },
    data: function() {
      return {
        // 右侧背景的设置
        note: {
          backgroundImage: "url(" + require("../../image/video-right.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        },

        // detail数据
        detailData: {},
        // host路径
        origin: originUrl,

        // 视频数据
        videoUrl: '',
        coverUrl: '',
        tValue: '',
        resourceId: 0,
        loadingVisible: false
      }
    },
    computed: {
      collectFlag: {
        get: function() {
          return this.detailData.resource.isCollect === 1
        },
        set: function(newValue) {
          this.detailData.resource.isCollect = newValue ? 1 : 0
        }
      },
      oriUrl: function() {
        // host路径
        return this.origin === 'http://localhost:7001' ? 'http://videolib.viewshare.net' : this.origin
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': '_getQueryValue',
    },
    mounted: function() {
      // 获取路由的信息
      this._getQueryValue()
    },
    methods: {
      /**
       * 实时获取token
       */
      _getToken: function() {
        let token = cookie.get('vltoken') ? cookie.get('vltoken') : '' 
        if (token) {
          return token
        }
        return confirm('操作提示：登陆过期，为您跳转到登陆页面？') ? this.$router.push('/login') : '' 
      },

      /** 
       * 获取当前页面的路由数据
      */
      _getQueryValue: function() {
        let query = this.$route.query
        // 根据路径的参数执行不同的方法
        query.targetUrl && this._getCarouseDetailData(query.targetUrl)
        query.resourceId && this._getVideoDetailData(query.resourceId, query.chapterId)
        // 确保回到顶部
        document.documentElement.scrollTop = document.body.scrollTop = 0
      },

      /** 
       * 获取轮播的对应详情数据
       * @param {String} target: 请求的参数
      */
      _getCarouseDetailData: function(target) {
        this.loadingVisible = true
        requestGetCarouselDetail(target).then( response => {
          // console.log('requestGetCarouselDetail:', response)
          if (response.code === 0) {
            this.detailData = response.data  
            // 设置title
            document.title = response.data.resource.title ? response.data.resource.title : ''
            let fileUrl = encodeURI(response.data.resource.fileUrl)
            this.videoUrl = `/resourceAuthentication/${response.data.resource.resourceId}/${fileUrl}`
            this.coverUrl = `/images/${response.data.resource.resourceId}/${response.data.resource.coverUrl}`
            this.tValue = 'bearer ' + this._getToken()
            this.resourceId = Number(response.data.resource.resourceId)
          }
        })
      },

      /** 
       * 获取其他途径传递过来的详情数据
       * @param {Number} resourceId: 请求的参数
      */
      _getVideoDetailData: function(resourceId, chapterId) {
        this.loadingVisible = true
        requestGetVideoDetail(Number(resourceId), Number(chapterId)).then( response => {
          // console.log('requestGetVideoDetail:', response)
          if (response.code === 0) {
            // 赋值
            this.detailData = response.data
            // 设置title
            document.title = response.data.resource.title ? response.data.resource.title : ''
            let fileUrl = encodeURI(response.data.resource.fileUrl)
            this.videoUrl = `/resourceAuthentication/${response.data.resource.resourceId}/${fileUrl}`
            this.coverUrl = `/images/${response.data.resource.resourceId}/${response.data.resource.coverUrl}`
            this.tValue = 'bearer ' + this._getToken()
            this.resourceId = Number(response.data.resource.resourceId)
          }  
        })
      },

      /*
       * 点击收藏图标
       * @param {String} resourceId: 当前资源的Id
       * 根据collectFlag的状态执行不同的方法
       */
      _collectHandle(resourceId){
        // 注意这里的关系，根据数据的变化去执行对应的方法
        this.collectFlag ? this._deleteCollectEvent(resourceId) : this._postCollectEvent(resourceId) 
        this.collectFlag = !this.collectFlag
      },

      /** 
       * 添加收藏
       * @param {String} resourceId: 当前资源的Id
      */
      _postCollectEvent: function(resourceId) {
        return requestPostCollect(resourceId)
      },

      /** 
       * 取消收藏
       * @param {String} resourceId: 当前资源的Id
      */
      _deleteCollectEvent: function(resourceId) {
        return requestDeleteCollect(resourceId)
      },

      /*
       * 点击视频区域
       * @param {Object} item：点击的视频对象数据
       */  
      _videoItemClick(item){
        if (item.resourceId) {
          // 本页面内部跳转
          let resourceId = item.resourceId
          let chapterId = item.chapterId
          // 调用子组件的停止视频播放方法
          this.$refs.videoWrapper._videoPause()
          // 清空之前的数据
          this.videoUrl = ''
          this.coverUrl = ''
          this.$router.push({path: '/video-detail', query: {'resourceId': resourceId, 'chapterId': chapterId}})
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  .video-detail-page
    position relative
    overflow-y auto
  .video-box 
    height:630px
    width:100%
    margin-top:100px
  .left-detail
    position relative
    width 1120px
    height 630px
    float left
    background-color rgb(0, 0 ,0)
    .video-mask
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      z-index 9999999
      background-color rgba(255, 255, 255, .8)

    .video-mask
      .demo-spin-icon-load
        animation ani-demo-spin 1s linear infinite
        @keyframes ani-demo-spin {
          from { transform: rotate(0deg);}
          50%  { transform: rotate(180deg);}
          to   { transform: rotate(360deg);}
        }   
  .right-detail
    position relative
    width 400px
    height 630px
    float left    
    padding 30px 15px 15px 30px
    border 1px solid rgba(0, 0, 0, .1)
    margin-left 20px
    .tag-box
      margin-top 20px
      .tag-item
        float left
        background #dddddd
        padding 5px 10px
        color #666666
        font-size 12px
        margin-right 10px
        margin-bottom 10px
      @media screen and (max-width 1600px)
        .tag-item
          margin-right 5px  
    .introduce-video  
      font-size 18px  
      margin-top 20px
      .introduce-left
        display inline-block
        width 55px
        color #a0a0a0
      .introduce-right
        color #222222
        width 280px
      .introduce-content
         height 270px
         overflow hidden 
         word-break break-all
         text-overflow ellipsis 
    .collect-box
      position absolute
      right 40px
      bottom 30px
      .collect-text 
        font-size 20px
        color #a0a0a0
      .already-collect
        color red !important 
      .heart-icon
        vertical-align middle
        color #a0a0a0
      &:hover
        cursor  pointer  
  .video-title
    font-size 42px  
    color #222222 
    line-height 42px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .relate-video
    font-size 16px
    color #222222  
    margin-top 30px
  @media screen and (max-width 1600px)
    .video-box 
      height 405px
    .left-detail
      width 720px
      height 405px
    .right-detail
      width 320px
      height 405px  
      padding 20px 10px 10px 20px
      .tag-box
        margin-top 20px
      .introduce-video
        margin-top 10px
        font-size 14px
        .introduce-left 
          width 42px
        .introduce-right
          width 237px
        .introduce-content
          height 125px  
      .collect-box
        right 20px
        bottom 20px
        .collect-text 
          font-size 16px   
    .video-title
      font-size 30px
      line-height 30px 
    .slide-list-box
      .slide-item-box
        width 160px
        height 136px
        .video-item-page
          .img-box
            height 90px    
          .text-box
            top 90px 
            font-size 12px    
            padding 4px 10px
          
          
  /*单独的视频列表*/  
  .slide-item-box
    display inline-block
    margin-right 20px
    margin-top 20px
    width 240px
    height 200px
    &:nth-child(6n+0)
      margin-right 0px
    .video-item-page
      position relative
      height 100%
      box-shadow 1px 1px 1px 1px rgba(0,0,0,.2)
      &:hover
        cursor pointer
      .img-box
        position relative
        height 140px
        .video-time
          position absolute
          display inline-block
          height 30px
          line-height 30px
          right 5px
          bottom 0
          color #fff
        /*video中背景渐变*/    
        .video-gradient
          position absolute
          bottom 0
          left 0
          background-color rgba(0, 0, 0, .2)
          width 100%
          height 25%
        @media screen and (max-width 1600px)
          .video-gradient
            height 35%  

      .text-box
        position absolute
        bottom 0
        left 0
        right 0
        top 140px
        display inline-block
        padding 10px 15px
        font-size 16px
        overflow hidden
        &:hover
          color #cb8919  
</style>
