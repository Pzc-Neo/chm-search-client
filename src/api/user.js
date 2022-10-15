import { apiLogin, apiUserPost } from './request/api'

export const serverUserLogin = async function (data) {
  return await apiLogin(data)
}

export const serverUserGetInfo = async function (data) {
  const dataForServer = {
    type: 'getInfo',
    data
  }
  return await apiUserPost(dataForServer)
}
