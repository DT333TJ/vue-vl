/** 
 * @Desc: 主题页面
 */
<template>
  <div class="topic-page fill-width">
    <!-- 公共头部 -->
    <v-header></v-header>
    <!-- 居中内容容器 -->
    <page-box>
      <!-- 标题组件 -->
      <topic-title :parentKind="topicData.parentKind" :childKind="topicData.childKind" :totalCount="topicData.totalCount"></topic-title>

      <!-- 数据列表 -->
      <div class="topic-data-box fill-width">
        <li class="data-list" v-for="n in 30" :key="n">
          <div class="fill" style="background-color: pink"></div>
        </li>
      </div>

      <!-- 分页数据 -->
      <Page 
        :total="queryParam.total" 
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
  import PageBox from 'component/page-box'
  import TopicTitle from 'component/topic-title'

  export default {
    name: 'topic-page',
    components: {
      PageBox,
      TopicTitle
    },
    props: {

    },
    data: function() {
      return {
        // 主题数据
        topicData: {
          "parentKind":"生命科学",
          "childKind":"动物",
          "pageSize":10,
          "pageNum":1,
          "totalCount":30,
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
          ]
        },

        // 请求参数对象（包括分页）
        queryParam: {
          pageNum: 1,
          total: 40,
          pageSize: 30,
        }
      }
    },
    computed: {

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': '_getQueryValue',
      // 监听请求参数，调用后台请求
      queryParam: {
        deep: true,
        handler(newValue) {
          console.log('变化值:', newValue)
          this._requestGetTopicResult()
        }
      }
    },
    mounted: function() {
      this._getQueryValue()
    },
    methods: {
      /** 
       * 获取当前页面的路由数据
      */
      _getQueryValue: function() {
        let query = this.$route.query

        if (query.id != -1) {
          this.topicData.parentKind = '人文科学'
          this.topicData.childKind = '历史'
          this.topicData.totalCount = 100
        }
      },

      /** 
       * 页码改变
      */
      _pageNumChange: function(val) {
        this.queryParam.pageNum = val
      },

      /** 
       * 请求参数改变调用api方法事件
      */
      _requestGetTopicResult: function() {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .topic-page
    position relative
    .topic-data-box
      display flex
      flex-flow row wrap
      padding 20px 0
      .data-list
        flex-grow 0
        flex-shrink 0
        width 250px
        height 180px
        padding 0 5px
        margin 20px 0
      @media screen and (max-width 1600px) 
        .data-list
          width 200px
          height 160px  

</style>
