/** 
 * 路由校验
*/
import router from 'router'
import store from 'store'
import cookie from 'js-cookie'

router.beforeEach((to, from, next) => {
  // 页面title
  document.title = to.meta.title

  // 登出
  if (to.path === '/login') {
    // 清空cookie存储的token数据
    store.commit('logout') 
    return next()
  }

  // 框架权限校验
  if (!to.meta || !to.meta.requireAuth) {
    return next()
  }

  // 登录状态
  if (store.state.logged) {
    return next()
  }

  // 未登录状态，获取userInfo和navList数据
  return fetchData(next)
})

/** 
 * 同步拉取数据
*/
async function fetchData(next) {
  await store.dispatch('getNavData')
  await store.dispatch('getUserInfo')
  return next()
}