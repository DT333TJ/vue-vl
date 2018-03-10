/** 
 * @Desc: 收藏列表
 */
<template>
  <div class="my-collction-page">
    <!-- 公共头部 -->
    <v-header></v-header>

    <!-- 居中内容容器 -->
    <page-box>
      <!-- 标题 -->
      <div class="title-box">我的收藏</div>

      <!-- 数据列表 -->
      <div class="my-collction-box fill-width">
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
    name: 'my-collction',
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
  @import '~style/variable'
  
  .my-collction-page
    position relative
    /* 标题容器 */
    .title-box
      margin-top 30px
      height 40px
      line-height 40px
      font-size 30px
      font-weight bold

    /* 数据容器 */  
    .my-collction-box
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
