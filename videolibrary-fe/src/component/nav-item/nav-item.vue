/** 
 * @Desc: 导航Item组件
 */
<template>
  <li class="nav-item-page float-left">
    <!-- nav标题 -->
    <div class="nav-title fill-height clickable">{{navText}}</div>

    <!-- 下一级数据列表 -->
    <ul class="nav-ul">
      <router-link
        tag="li" 
        class="nav-li clickable" 
        v-for="(navItem, index) in navList"
        v-text="navItem.title" 
        :to="{path: '/topic-page', query: {'id': navItem.id}}"
        :key="index"></router-link>  
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'nav-item',
    props: {
      navText: {
        type: String
      },
      navList: {
        type: Array,
        default: []
      },
      routerPath: {
        type: String,
        default: ''
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
    mounted: function() {

    },
    methods: {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .nav-item-page
    position relative
    height 100%
    text-align center
    &:hover 
      .nav-ul
        display block

    /* 文字 */
    .nav-title
      display inline-block
      padding 0 20px
      color $color-text-w
      &:hover
        background-color rgba(200, 200, 200, .2)

    /* 列表 */
    .nav-ul
      position absolute
      left 50%
      margin-left -70px
      z-index 9
      display none
      background-color $color-background
      box-shadow rgba(0,0,0,.16) 0 0 13px
      border-radius 2px
      &::after
        content ''
        position absolute
        top -10px
        left 50%
        display block
        width 0
        height 0
        margin-left -10px
        border-left 10px solid transparent
        border-right 10px solid transparent 
        border-bottom 10px solid #fff
        border-top none

      /* 列表li */
      .nav-li
        width 140px
        height 40px
        line-height 40px
        text-align center
        &:hover
          background-color rgba(200, 200, 200, .8)
        &:last-child
          border-radius 0 0 2px 2px  
</style>
