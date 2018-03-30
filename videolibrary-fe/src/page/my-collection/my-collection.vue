/** 
 * @Desc: 收藏列表
 */
<template>
  <div class="my-collction-page">
    <!-- 公共头部 -->
    <v-header></v-header>

    <!-- 居中内容容器 -->
    <page-box style="margin-top: 60px">
      <!-- 标题 -->
      <div class="title-box">我的收藏</div>
      <!-- 数据列表 -->
      <div class="my-collction-box fill-width clear-float" v-if="dataVisible">
        <li class="data-list float-left" v-for="(videoItem, index) in collectData.datas" :key="index">
          <!-- 视频Item -->
          <video-item 
            :videoItem="videoItem"
            :deleteFlag="true"  
            @click.native="_videoItemClick(videoItem)" 
            @deleteCollect="_deleteCollecClick">
          </video-item>
        </li>
      </div>
      <!-- 数据为空的显示 -->
      <div v-else class="my-collction-nodata">
        <img src="../../image/nodata.png" style="margin-top: 50px">
      </div>
      <!-- 分页数据 -->
      <Page
        v-show="pageVisible" 
        :total="pageTotal" 
        :current="queryParam.pageNum" 
        :page-size="queryParam.pageSize"
        @on-change="_pageNumChange" 
        style="text-align: center">
      </Page>
    </page-box>

    <!-- 公共底部 -->
    <v-footer></v-footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import { sessionStorageUtil } from 'lib/util'
  import PageBox from 'component/page-box'
  import VideoItem from 'component/video-item'
  import { requestGetCollectData } from 'api/my-collection'
  import { requestDeleteCollect } from 'api/video-detail'

  export default {
    name: 'my-collction',
    components: {
      PageBox,
      VideoItem
    },
    data: function() {
      return {
        // 主题数据
        collectData: {},

        // 请求参数对象（包括分页）
        queryParam: {
          pageNum: 1,
          pageSize: 36
        },

        // 分页
        pageTotal: 0,
        pageVisible: false,

        // 是否有数据
        dataVisible: true
      }
    },
    watch: {
      queryParam: {
        deep: true,
        handler(newValue) {
          this._getCollectData()
        }
      }
    },
    mounted: function() {
      // 调用获取收藏数据的方法
      this._getCollectData()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      sessionStorageUtil.get('collect-pageNum') && sessionStorageUtil.set('collect-pageNum', '1')
      next()
    },
    methods: {
      /** 
       * 获取收藏的数据
       * @param {Object} param 
      */
      _getCollectData: function() {
        let param = {
          pageNum: sessionStorageUtil.get('collect-pageNum') ? Number(sessionStorageUtil.get('collect-pageNum')) : 1,
          pageSize: 36
        }
        requestGetCollectData(param).then( response => {
          // console.log('requestGetCollectData:', response)
          if (response.code === 0) {
            // 确保回到顶部
            document.documentElement.scrollTop = document.body.scrollTop = 0
            // 设置有无数据的图片显示
            this.dataVisible = response.data.datas.length ? true : false
            this.collectData = response.data
            this.pageTotal = response.data.totalCount
            // 根据总数进行分页显示的判断
            this.pageVisible = response.data.totalCount > response.data.pageSize 
          }
        })
      },

      /** 
       * 取消收藏
       * @param {String} resourceId: 当前视频的资源ID
      */
      _deleteCollecClick: function(val) {
        let resourceId = val
        requestDeleteCollect(resourceId).then( response => {
          if (response.code === 0) {
            // let message = response.message
            // this.$Message.success(message)
            // 调用获取收藏数据的方法
            this._getCollectData()
          }
        })
      },
      
      /** 
       * 页码改变
      */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
        sessionStorageUtil.set('collect-pageNum', val)
      },

      /** 
       * 视频item点击
       * @param {Object} item: 点击的视频对象数据信息
      */
      _videoItemClick: function(item) {
        if (item.resourceId) {
          let resourceId = item.resourceId
          let chapterId = item.chapterId
          window.open(window.location.origin + `/#/video-detail?resourceId=${resourceId}&chapterId=${chapterId}`)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  
  .my-collction-page
    position relative
    overflow-y auto
    
    /* 标题容器 */
    .title-box
      margin 45px 0
      height 40px
      line-height 40px
      font-size 40px
    @media screen and (max-width 1600px)
      .title-box
        font-size 36px

    /* 数据容器 */  
    .my-collction-box
      padding-bottom 12px
      min-height 660px
    @media screen and (max-width 1600px)
      .my-collction-box
        min-height 460px

    .my-collction-nodata
      min-height 660px
      text-align center
    @media screen and (max-width 1600px)
      .my-collction-nodata
        min-height 460px     

    .my-collction-box
      .data-list
        position relative
        width 240px
        height 200px
        margin-bottom 20px
        margin-right 16px
        box-shadow 0px 0px 3px rgba(0, 0, 0, .3)
      @media screen and (max-width 1600px) 
        .data-list
          width 160px
          height 136px
</style>
