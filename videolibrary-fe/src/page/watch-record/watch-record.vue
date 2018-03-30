/** 
 * @Desc: 观看记录
 */
<template>
  <div class="watch-record-page fill">
    <!-- 公共头部 -->
    <v-header></v-header>

    <!-- 居中内容容器 -->
    <page-box style="margin-top: 60px">
      <!-- 标题 -->
      <div class="title-box">观看记录</div>

      <!-- 数据列表 -->
      <div class="watch-record-box fill-width clear-float" v-if="dataVisible">
        <li class="data-list float-left" v-for="(videoItem, index) in recordData.datas" v-if="videoItem" :key="index">
          <video-item :videoItem="videoItem" @click.native="_videoItemClick(videoItem)"></video-item>
        </li>
      </div>
      <div v-else class="watch-record-nodata">
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
  import { requestGetWatchRecordData } from 'api/watch-record'

  export default {
    name: 'watch-record',
    components: {
      PageBox,
      VideoItem
    },
    data: function() {
      return {
        // 主题数据
        recordData: {},

        // 请求参数对象（包括分页）
        queryParam: {
          pageNum: 1,
          total: 360,
          pageSize: 36,
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
          this._getRecordData()
          document.documentElement.scrollTop = document.body.scrollTop = 0
        }
      }
    },
    mounted: function() {
      // 确保回到顶部
      document.documentElement.scrollTop = document.body.scrollTop = 0
      // 获取数据
      this._getRecordData()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      sessionStorageUtil.get('watch-pageNum') && sessionStorageUtil.set('watch-pageNum', '1')
      next()
    },
    methods: {
      /** 
       * 页码改变
      */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
        sessionStorageUtil.set('watch-pageNum', val)
      },

      /** 
       * 获取观看记录数据
      */
      _getRecordData: function() {
        let param = {
          pageNum: sessionStorageUtil.get('watch-pageNum') ? Number(sessionStorageUtil.get('watch-pageNum')) : 1,
          pageSize: 36
        }
        requestGetWatchRecordData(param).then( response => {
          if (response.code === 0) {
            // 设置有无数据的图片显示
            this.dataVisible = response.data.datas.length ? true : false
            this.recordData = response.data
            this.pageTotal = response.data.totalCount
            // 根据总数进行分页显示的判断
            this.pageVisible = response.data.totalCount > response.data.pageSize
          }
        })
      },

      /** 
       * 视频详情点击
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
  
  .watch-record-page
    position relative
    overflow-y hidden
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
    .watch-record-box
      padding-bottom 12px
      min-height 660px
    @media screen and (max-width 1600px)
      .watch-record-box
        min-height 460px

    .watch-record-nodata
      min-height 660px
      text-align center
    @media screen and (max-width 1600px)
      .watch-record-nodata
        min-height 460px    

    .watch-record-box    
      .data-list
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
