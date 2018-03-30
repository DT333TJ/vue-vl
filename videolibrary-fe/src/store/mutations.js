import cookie from 'js-cookie'

const mutations = {
  // 保存用户信息
  setUserInfo: (state, userInfo) => {
    state.userName = userInfo.userName
    state.nickname = userInfo.nickname
    state.gender = Number(userInfo.gender) 
    state.logged = true
  },

  // 保存班级年级
  setNavList: (state, navList) => {
    state.navList = navList
  },
  
  // 登出
  logout: (state) => { 
    state.logged = false
    state.userName = ''
    state.nickname = ''
    state.gender = 1
    cookie.get('vltoken') && cookie.remove('vltoken')
  },
}

export default mutations