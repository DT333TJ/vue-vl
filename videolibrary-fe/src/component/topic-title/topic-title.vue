/** 
 * @Desc: 主题目录组件
 */
<template>
  <div class="topic-title-page fill-width">
    {{parentKind}} - {{childKind}} <span style="font-size: 14px">（{{totalCount}}）</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'topic-title',
    props: {
      parentKind: {
        type: String,
        required: true
      },
      childKind: {
        type: String,
        required: true
      },
      totalCount: {
        type: [String, Number],
        required: true
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /* 按需引入变量和方法 */
  @import '~style/variable'

  .topic-title-page
    margin-top 30px
    height 40px
    line-height 40px
    font-size 30px
    font-weight bold
</style>
