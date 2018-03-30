/** 
 * @Desc: 导航Item组件
 */
<template>
  <li class="nav-item-page float-left" @mouseenter="ulVisible = true" @mouseleave="ulVisible = false">
    <!-- nav标题 -->
    <div class="nav-title fill-height clickable" :class="{'colorChange': colorChange}">{{navText}}</div>

    <!-- 下一级数据列表 -->
    <ul class="nav-ul" :style="{'top': topValue + 'px'}" v-show="ulVisible">
      <li
        class="nav-li clickable" 
        v-for="(navItem, index) in navList"
        v-text="navItem.title"
        @click="_navItemClick(navItem.typeId)" 
        :key="index"></li>  
    </ul>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'nav-item',
    data: function() {
      return {
        ulVisible: false
      }
    },
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
      },
      colorChange:{
        type:Boolean
      },
      topValue: {
        type: Number
      }
    },
    methods: {
      /** 
       * item点击
       * @param {String} id: resourceId的值
      */
      _navItemClick: function(id) {
        this.ulVisible = false
        this.$router.push({'path': '/topic-page', query: {'id': id}})
      }
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

    /* 文字 */
    .nav-title
      display inline-block
      padding 0 20px
      font-size $font-size-medium-x
      color #ffffff
      &:hover
        background-color rgba(200, 200, 200, .0)
        color #cb8919
    .colorChange
      color #222222    
    /* 列表 */
    .nav-ul
      position absolute
      left 50%
      margin-left -60px
      z-index 9
      // display none
      background-color $color-background
      box-shadow rgba(0,0,0,.16) 0 0 13px
      border-top 2px solid #a4c40c
      margin-top 0px
      &::after
        content ''
        position absolute
        top -11px
        left 50%
        display block
        width 0
        height 0
        margin-left -11px
        border-left 11px solid transparent
        border-right 11px solid transparent 
        border-bottom 11px solid #a4c40c
        border-top none
      &::before
        content ''
        position absolute
        top -8px
        left 50%
        z-index 10
        display block
        width 0
        height 0
        margin-left -8px
        border-left 8px solid transparent
        border-right 8px solid transparent 
        border-bottom 8px solid #ffffff
        border-top none  

      /* 列表li */
      .nav-li
        width 120px
        height 40px
        line-height 40px
        padding 0 10px
        text-align center
        &:hover
          background-color rgba(200, 200, 200, .0)
          color #cb8919
</style>
