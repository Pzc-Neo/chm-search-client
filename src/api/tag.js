import { apiTagPost } from './request/api'

// 添加标签
export const serverTagAdd = async function (data) {
  const dataForServe = {
    type: 'add',
    data
  }
  return await apiTagPost(dataForServe)
}

// 编辑标签
export const serverTagUpdate = async function (data) {
  const dataForServe = {
    type: 'update',
    data
  }
  return await apiTagPost(dataForServe)
}

// 删除标签
export const serverTagDelete = async function (data) {
  const dataForServe = {
    type: 'delete',
    data
  }
  return await apiTagPost(dataForServe)
}

// 更新
export const serverTagUpdateOrder = async function (data) {
  const dataForServe = {
    type: 'updateOrder',
    data
  }
  return await apiTagPost(dataForServe)
}
