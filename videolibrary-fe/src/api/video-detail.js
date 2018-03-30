/** 
 * @description 视频详情相关api
*/
import requester from 'config/requester'

/** 
 * 获取轮播图的视频详情
*/
export function requestGetCarouselDetail(target) {
  const url = 'slider/resource/target'
  const params = {
    target: target
  }
  return requester.request({ url, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 获取普通的视频详情
*/
export function requestGetVideoDetail(resourceId, chapterId) {
  const url = `resource/detail/${resourceId}/${chapterId}`
  return requester.request({ url })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 添加资源收藏
*/
export function requestPostCollect(resourceId) {
  const url = `collect/${resourceId}`
  const method = 'post'
  return requester.request({ url, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 取消资源收藏
*/
export function requestDeleteCollect(resourceId) {
  const url = `collect/${resourceId}`
  const method = 'delete'
  return requester.request({ url, method })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}

/** 
 * 设置观看记录
*/
export function requestPostPlayLog(resourceId) {
  const url = 'play/log'
  const method = 'post'
  const params = {
    resourceId: resourceId
  }
  return requester.request({ url, method, params })
    .then( response => {
      return Promise.resolve(response.data)
    })
    .catch( error => {
      return Promise.reject(error)
    })
}
