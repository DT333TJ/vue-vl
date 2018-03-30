/**
 * @Desc: 全局常量配置
 */
const originUrl = document.location.origin || ( window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: ''))

export {
  originUrl
}