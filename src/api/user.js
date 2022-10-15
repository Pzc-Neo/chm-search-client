import { apiLogin } from './request/api'
export const serverUserLogin = async function (data) {
  return await apiLogin(data)
}
