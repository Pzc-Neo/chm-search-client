import { apiLogin, apiRegister, apiUserPost } from './request/api'

// 注册
export const serverUserRegister = async function (data) {
  return await apiRegister(data)
}

// 登录
export const serverUserLogin = async function (data) {
  return await apiLogin(data)
}

// 获取用户信息
export const serverUserGetInfo = async function (data) {
  const dataForServer = {
    type: 'getInfo',
    data
  }
  return await apiUserPost(dataForServer)
}

// 更新用户信息
export const serverUserUpdateInfo = async function (data) {
  const dataForServer = {
    type: 'updateInfo',
    data
  }
  return await apiUserPost(dataForServer)
}
