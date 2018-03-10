/** 
 * 路由校验
*/
import router from 'router'

router.beforeEach((to, from, next) => {
  // 页面title
  document.title = to.meta.title

  // 登出
  if (to.path === '/login') {
    // 清空cookie存储的token数据
    next()
  }

  // 框架权限校验
  if (to.meta && to.meta.requireAuth) {
    next()
  }

  // 确保跳转
  next()
})