/** 
 * @Desc: 搜索页面
 */
<template>
  <div class="search-page fill">
    <!-- 公共头部 -->
    <v-header></v-header>

    <!-- 居中内容容器 -->
    <page-box>
      <!-- 搜索框 -->
      <div class="title-box">
        <input type="text" class="title-input fill" v-model.trim="queryParam.ball">
        <Icon type="search" class="title-icon clickable" size="30"></Icon>
      </div>

      <!-- 数据列表 -->
      <div class="search-data-box fill-width">
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

  export default {
    name: 'search-page',
    components: {
      PageBox
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
          ball: ''
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
          this._requestGetSearchResult()
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
        this.queryParam.ball = query.searchValue ? query.searchValue : ''
        console.log('value:', query)
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
      _requestGetSearchResult: function() {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'
  
  .search-page
    position relative
    /* 标题容器 */
    .title-box
      position relative
      width 400px
      height 40px
      line-height 40px
      margin 30px auto 0
      text-align center
      .title-input
        display inline-block
        padding-left 10px
        border 1px solid
        border-radius 4px
      .title-icon
        position absolute
        top 5px
        right 15px   

    /* 数据容器 */  
    .search-data-box
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
