import { apiWebsitePost, apiWebsiteGroupPost } from './request/api'

// 添加网址
export const serverWebsiteAdd = async function (data) {
  const dataForServe = {
    type: 'add',
    data
  }
  return await apiWebsitePost(dataForServe)
}

// 编辑网址
export const serverWebsiteUpdate = async function (data) {
  const dataForServe = {
    type: 'update',
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

// 添加网址分组
export const serverWebsiteGroupAdd = async function (data) {
  const dataForServe = {
    type: 'add',
    data
  }
  return await apiWebsiteGroupPost(dataForServe)
}

// 修改网址分组
export const serverWebsiteGroupUpdate = async function (data) {
  const dataForServe = {
    type: 'update',
    data
  }
  return await apiWebsiteGroupPost(dataForServe)
}

// 删除网址分组
export const serverWebsiteGroupDelete = async function (data) {
  const dataForServe = {
    type: 'delete',
    data
  }
  return await apiWebsiteGroupPost(dataForServe)
}
