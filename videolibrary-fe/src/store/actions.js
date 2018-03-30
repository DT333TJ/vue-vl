import { requestGetUserInfo, requestGetHeaderMenuData } from 'api/home-page'

/**
 * 获取用户信息（同步）
 */
export async function getUserInfo({ commit }) {
  const response = await requestGetUserInfo()
  if (response.code === 0) {
    commit('setUserInfo', response.data)
  }
}


/**
 * 获取年级（包含班级）数据（同步）
 */
export async function getNavData({ commit }) {
  const response = await requestGetHeaderMenuData()
  if (response.code === 0) {
    commit('setNavList', response.data)
  }
}
