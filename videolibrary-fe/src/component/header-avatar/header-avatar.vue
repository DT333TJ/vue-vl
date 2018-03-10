/** 
 * @Desc: 头部的头像列表
 */
<template>
  <li class="header-avatar-page float-left">
    <!-- 头像 -->
    <Avatar class="clickable" :src="avavtarSrc" />

    <!-- 下一级数据列表 -->
    <ul class="nav-ul">
      <li class="nav-li clickable" @click="_showAccoutModal">我的帐号</li>
      <li class="nav-li clickable" @click="_showPasswordModal">修改密码</li>
      <router-link tag="li" class="nav-li clickable" to="my-collection">我的收藏</router-link>
      <router-link tag="li" class="nav-li clickable" to="watch-record">观看记录</router-link>
      <router-link tag="li" class="nav-li clickable" to="login">退出登录</router-link>
    </ul>

    <!-- 帐号对应的弹窗 -->
    <Modal
      v-model="accountModal"
      title="我的帐号"
      @on-ok="_okAccout"
      @on-cancel="_cancelAccout">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>

    <!-- 密码对应的弹窗 -->
    <Modal
      v-model="passwordModal"
      title="修改密码"
      @on-ok="_okPassword"
      @on-cancel="_cancelPassword">
      <p>表单内容</p>
    </Modal>
  </li>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'header-avatar',
    props: {

    },
    data: function() {
      return {
        // 头像数据
        avavtarSrc: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        accountModal: false,
        passwordModal: false
      }
    },
    computed: {

    },
    watch: {

    },
    mounted: function() {

    },
    methods: {
      /** 
       * 显示帐号弹窗
      */
      _showAccoutModal: function() {
        this.accountModal = true
      },

      /** 
       * 显示修改密码弹窗
      */
      _showPasswordModal: function() {
        this.passwordModal = true
      },

      /** 
       * 帐号弹窗确定
      */
      _okAccout: function() {

      },

      /** 
       * 帐号弹窗取消
      */
      _cancelAccout: function() {

      },

      /** 
       * 密码弹窗确定
      */
      _okPassword: function() {

      },

      /** 
       * 密码弹窗取消
      */
      _cancelPassword: function() {

      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .header-avatar-page
    position relative
    height 100%
    text-align center
    margin 0 20px
    &:hover 
      .nav-ul
        display block
     
    /* img头像 */
    .nav-title
      display inline-block
      height 40px
      width 40px
      border-radius 50%
      line-height 40px
      text-align center
      color $color-text-w
      background-color rgba(200, 200, 200, .8)  
      
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
