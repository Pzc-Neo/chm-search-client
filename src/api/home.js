import { apiHomePost } from './request/api'
export const serverHomeGetData = async function (data) {
  return await apiHomePost({ type: 'getData', data })
}
