import { apiPublicPost } from './request/api'
export const serverPublicSendVerifyCode = async function (email) {
  const dataForServer = {
    type: 'sendVerifyCode',
    data: { email }
  }
  return await apiPublicPost(dataForServer)
}
