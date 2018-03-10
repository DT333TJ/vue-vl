/** 
 * @Desc: 公共头部
 */
<template>
  <div class="header-page clear-float" :class="{'pos-fixed': scrollFlag}">
    <!-- logo -->
    <router-link to="/home-page" class="float-left">logo</router-link>

    <!-- nav -->
    <nav class="nav-box clear-float" :class="[searchFlag ? 'nav-box-hide' : '']">
      <!-- nav标题 -->
      <nav-item 
        v-for="(list, index) in navData" 
        :key="index"
        :navText="list.title" 
        :navList="list.list">
      </nav-item>

      <!-- 头像数据 -->
      <header-avatar></header-avatar>

      <!-- 搜索按钮 -->
      <div class="btn-box float-left clickable" @click="_serachFlagClick">
        <Icon type="search" size="30" color="#ffffff"></Icon>
      </div>
    </nav>

    <!-- 搜索框  -->
    <div class="search-box vertical-center" :class="[searchFlag ? 'search-box-show': 'search-box-hide']">
      <!-- input输入框 -->
      <input 
        type="text" 
        class="search-input" 
        placeholder="输入关键字" 
        v-model="searchValue" 
        @keyup.enter="_searchButtonClick">
      <!-- 搜索按钮 -->
      <Icon 
        type="search" 
        size="35" 
        style="cursor: pointer;margin-right: 20px" 
        @click.native="_searchButtonClick">
      </Icon>
      <!-- 关闭按钮 -->
      <Icon 
        type="android-close" 
        size="35" 
        style="cursor: pointer" 
        @click.native="_closeFlagClick">
      </Icon>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import NavItem from 'component/nav-item'
  import HeaderAvatar from 'component/header-avatar'

  export default {
    name: 'VHeader',
    components: {
      NavItem,
      HeaderAvatar
    },
    props: {

    },
    data: function() {
      return {
        // 导航数据
        navData: [
          {
            'title': '生命科学',
            'list': [
              {'id': -1, 'title': '动物'},
              {'id': 0, 'title': '植物'}
            ]
          },
          {
            'title': '地球科学',
            'list': [
              {'id': 1, 'title': '地球1'},
              {'id': 2, 'title': '地球2'}
            ]
          },
          {
            'title': '物质科学',
            'list': [
              {'id': 3, 'title': '物质1'},
              {'id': 4, 'title': '物质2'}
            ]
          },
          {
            'title': '社会人文',
            'list': [
              {'id': 5, 'title': '人文1'},
              {'id': 6, 'title': '人文2'}
            ]
          },
          {
            'title': '医学健康',
            'list': [
              {'id': 7, 'title': '医学健康1'},
              {'id': 8, 'title': '医学健康2'}
            ]
          },
          {
            'title': '工程技术',
            'list': [
              {'id': 9, 'title': '工程技术1'},
              {'id': 10, 'title': '工程技术2'}
            ]
          },
          {
            'title': '其他',
            'list': [
              {'id': 11, 'title': '其他1'},
              {'id': 12, 'title': '其他2'}
            ]
          }
        ],

        // 搜索文本值
        searchValue: '',
        // 搜索区域显示控制
        searchFlag: false,

        // 滚动标识
        scrollFlag: false 
      }
    },
    computed: {
     
    },
    watch: {
      
    },
    mounted() {
      window.addEventListener('scroll', this._scrollEvent)
    },
    methods: {
      /** 
       * 监听屏幕滚动事件 
       */
      _scrollEvent: function() {
        let scrollValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let clientWidth = document.body.clientWidth
        // console.log('宽度:', clientWidth)
        this.scrollFlag = Number(scrollValue) >= 520 ? true : false
      },

      /** 
       * nav中的搜索图标点击，出现搜索输入框
      */
      _serachFlagClick: function() {
        this.searchFlag = true
      },

      /** 
       * 查询按钮点击
      */
      _searchButtonClick: function() {
        // 先判断是否有值
        if (this.searchValue == '') {
          this.searchFlag = false
        } else {
          // 跳转搜索页面
          this.$router.push({path: 'search-page', query: { searchValue: this.searchValue}})
          // 当当前页面就是搜索页面时候
          this.searchValue = ''
          this.searchFlag = false
        }
      },

      /** 
       * 搜索框中关闭按钮点击，关闭搜索输入框
      */
      _closeFlagClick: function() {
        this.searchFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .pos-fixed
    position fixed !important  
  .header-page
    position absolute
    top 0
    left 0
    right 0
    z-index 999
    height 60px
    background-color $color-background-sub

    /* 导航容器 */
    .nav-box
      position absolute
      right 0
      height 100%
      padding-right 40px 
      line-height 60px
      transition all .3s ease-in-out
      .btn-box
        height 100%
        padding-top 8px
        margin 0 10px
    /* 导航容器隐藏 */
    .nav-box-hide
      transform translateX(-385px)
      opacity 0
      pointer-events none
    /* 导航容器显示 */
    .nav-box-show  
      transform translateX(0)
      opacity 1
      pointer-events auto

    
    /* 搜索容器显示 */  
    .search-box-show
      width 385px
      opacity 1
      background-color $color-background 
    /* 搜索容器隐藏 */
    .search-box-hide
      width 0 
      opacity 0
    /* 搜索容器 */
    .search-box
      position absolute
      right 0
      height 100%
      line-height 60px
      transition all .3s ease-in-out
      overflow hidden
      .search-input
        width 300px
        height 100%
        padding 0 16px      
      .search-btn
        display inline-block
        height 100%
        line-height 60px         
</style>
