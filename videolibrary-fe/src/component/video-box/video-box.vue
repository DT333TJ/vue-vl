/** 
 * @Desc: 视频播放容器
 */
<template>
  <div class="fill">
    <div class="fill" id="videoDivBox"></div>
    <Modal
      v-model="messageBox"
      title="信息提示">
      <p>很抱歉，您使用的浏览器太低级，无法正常观看本视频，推荐使用谷歌浏览器</p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { requestPostPlayLog } from 'api/video-detail'

  export default {
    name: 'video-box',
    data: function() {
      return {
        videoObj: {}
      }
    },
    props: {
      resourceId: {
        type: Number,
        required: true
      },
      videoUrl: {
        type: String,
        required: true,
        default: ''
      },
      coverUrl: {
        type: String,
        required: true,
        default: ''
      },
      tValue: {
        type: String,
        required: true
      }
    },
    watch: {
      videoUrl: function(newValue) {
        if (this.videoUrl != '') {
          document.getElementById('videoDivBox').innerHTML= '<video id="videoEle" class="fill" src="" controls="controls"></video>'
          // 清空video元素
          this.$nextTick( () => {
            if (window.Module.isSupportViewBoxPlayer()) {
              let ss = window.Module.createViewBoxPlayer({
                wrap: document.getElementById("videoEle"),
                videouri: this.videoUrl,
                videoposter: this.coverUrl,
                t: this.tValue
              })
              this.videoObj = ss
              ss.play()
              // 隐藏loading
              setTimeout(() => { this.$parent.$parent.loadingVisible = false }, 1000)
              // 监听play事件
              document.getElementById("videoEle").addEventListener('play', this._videoPlayEvent)
            } else {
              this.messageBox = true
            }
          })
        }
        // 当点击其他视频的时候，先清空数据 
        else {
          // 解除监听play事件
          document.getElementById("videoEle").removeEventListener('play', this._videoPlayEvent)
          document.getElementById('videoDivBox').innerHTML= ''   
        }
      }
    },
    data: function() {
      return {
        messageBox: false
      }
    },
    methods: {
      /** 
       * 视频的停止播放方法
      */
      _videoPause: function() {
        this.videoObj.stop()
      },

      /** 
       * 视频点击
      */
      _videoPlayEvent: function() {
        requestPostPlayLog(this.resourceId)
      }
    }
  }
</script>

