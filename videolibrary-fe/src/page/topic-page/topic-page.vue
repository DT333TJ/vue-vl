/** 
 * @Desc: 主题页面
 */
<template>
  <div class="topic-page fill-width">
    <!-- 公共头部 -->
    <v-header></v-header>
    <!-- 居中内容容器 -->
    <page-box style="margin-top: 60px">
      <!-- 标题组件 -->
      <topic-title :parentKind="topicData.parentTitle" :childKind="topicData.childTitle" :totalCount="topicData.totalCount"></topic-title>

      <!-- 数据列表 -->
      <div class="topic-data-box fill-width clear-float">
        <li class="data-list float-left" v-for="(videoItem, index) in topicData.resources" v-if="videoItem" :key="index">
          <video-item :videoItem="videoItem" @click.native="_videoItemClick(videoItem)"></video-item>
        </li>
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
  import TopicTitle from 'component/topic-title'
  import VideoItem from 'component/video-item'
  import { requestGetTopicData } from 'api/topic-page'

  export default {
    name: 'topic-page',
    components: {
      PageBox,
      TopicTitle,
      VideoItem
    },
    data: function() {
      return {
        // 主题数据
        topicData: {},

        // 请求参数对象（包括分页）
        queryParam: {
          typeId: 0,
          pageNum: 1,
          pageSize: 36,
        },

        // 传递的chapterId
        chapterId: 0,

        // 分页总数
        pageTotal: 0,
        // 分页显示标识
        pageVisible: false
      }
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': '_getQueryValue',
      // 监听请求参数，调用后台请求
      queryParam: {
        deep: true,
        handler(newValue) {
          this._requestGetTopicResult()
        }
      }
    },
    mounted: function() {
      this._getQueryValue()
    },
    beforeRouteUpdate (to, from, next) {
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      sessionStorageUtil.get('topic-pageNum') && sessionStorageUtil.set('topic-pageNum', '1')
      next()
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      sessionStorageUtil.get('topic-pageNum') && sessionStorageUtil.set('topic-pageNum', '1')
      next()
    },
    methods: {
      /** 
       * 获取当前页面的路由数据
      */
      _getQueryValue: function() {
        let query = this.$route.query
        this.queryParam = {
          pageNum: sessionStorageUtil.get('topic-pageNum') ? Number(sessionStorageUtil.get('topic-pageNum')) : 1,
          pageSize: 36,
          typeId: Number(query.id)
        }
        // 确保回到顶部
        document.documentElement.scrollTop = document.body.scrollTop = 0
      },

      /** 
       * 页码改变
      */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
        sessionStorageUtil.set('topic-pageNum', val)
        document.documentElement.scrollTop = document.body.scrollTop = 0
      },

      /** 
       * 请求参数改变调用api方法事件
      */
      _requestGetTopicResult: function() {
        let param = {
          typeId: this.queryParam.typeId,
          pageNum: this.queryParam.pageNum,
          pageSize: this.queryParam.pageSize
        }
        // 后台api调用
        requestGetTopicData(param).then( response => {
          // console.log('requestGetTopicData:', response.data)
          if (response.code === 0 && response.data) {
            this.topicData = response.data
            this.pageTotal = response.data.totalCount
            this.chapterId = response.data.parentId
            document.title = response.data.childTitle
            // 根据总数进行分页显示的判断
            this.pageVisible = response.data.totalCount > response.data.pageSize 
          }
        })
      },

      /** 
       * 视频item点击
       * @param {Object} item: 点击的视频对象数据信息
      */
      _videoItemClick: function(item) {
        if (item.resourceId) {
          let resourceId = item.resourceId
          window.open(window.location.origin + `/#/video-detail?resourceId=${resourceId}&chapterId=${this.chapterId}`)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .topic-page
    position relative
    overflow-y auto
    .topic-data-box
      padding-bottom 12px
      min-height 660px
    @media screen and (max-width 1600px)
      .topic-data-box
        min-height 460px

    .topic-data-box
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
