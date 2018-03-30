import Vue from 'vue'

/** 
 * 文字长度
*/
Vue.filter('textLength', function (value) {
  if(value.length > 22){
    return value.substring(0,21) + "..."
  }
  return value
})
/**
 * 视频详情页文本长度控制
*/
Vue.filter('textCententLength', function (value) {
  if(value.length > 149){
    return value.substring(0,148) + "..."
  }
  return value
})
/**
 * 将后台的毫秒转换为秒
*/
Vue.filter('tranformTime', function (value) {
  let hh, mm, ss
 
  //传入的时间为空或小于0
  if(value == null || value < 0){
    return '00:00:00'
  }
  //得到小时
  hh = value/3600 | 0
  value = parseInt(value) - hh*3600
  if (parseInt(hh) < 10){
    hh = "0" + hh
  }
  //得到分
  mm = value/60 | 0
  //得到秒
  ss = parseInt(value) - mm*60
  if(parseInt(mm) < 10){
    mm = "0" + mm    
  }
  if(ss < 10){
    ss = "0" + ss     
  }
  return (hh === "00" ? '' : hh+ ":") + mm + ":" + ss
})