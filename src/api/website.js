import { apiWebsitePost } from './request/api'

// 添加网址
export const serverWebsiteAdd = async function (data) {
  const dataForServe = {
    type: 'add',
    data
  }
  return await apiWebsitePost(dataForServe)
}

// 删除网址
export const serverWebsiteDelete = async function (data) {
  const dataForServe = {
    type: 'delete',
    data
  }
  return await apiWebsitePost(dataForServe)
}
