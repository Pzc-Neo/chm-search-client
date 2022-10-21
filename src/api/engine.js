import { apiEnginePost, apiEngineGroupPost } from './request/api'

// ------------引擎----------------
// 添加引擎
export const serverEngineAdd = async function (data) {
  const dataForServe = {
    type: 'add',
    data
  }
  return await apiEnginePost(dataForServe)
}

// 编辑引擎
export const serverEngineUpdate = async function (data) {
  const dataForServe = {
    type: 'update',
    data
  }
  return await apiEnginePost(dataForServe)
}

// 删除引擎
export const serverEngineDelete = async function (data) {
  const dataForServe = {
    type: 'delete',
    data
  }
  return await apiEnginePost(dataForServe)
}

// 更新
export const serverEngineUpdateOrder = async function (data) {
  const dataForServe = {
    type: 'updateOrder',
    data
  }
  return await apiEnginePost(dataForServe)
}

export const serverEngineGroupUpdateHotkey = async function (data) {
  const dataForServe = {
    type: 'updateHotkey',
    data
  }
  return await apiEnginePost(dataForServe)
}

// ------------引擎分组----------------

// 添加引擎分组
export const serverEngineGroupAdd = async function (data) {
  const dataForServe = {
    type: 'add',
    data
  }
  return await apiEngineGroupPost(dataForServe)
}

// 修改引擎分组
export const serverEngineGroupUpdate = async function (data) {
  const dataForServe = {
    type: 'update',
    data
  }
  return await apiEngineGroupPost(dataForServe)
}

// 删除引擎分组
export const serverEngineGroupDelete = async function (data) {
  const dataForServe = {
    type: 'delete',
    data
  }
  return await apiEngineGroupPost(dataForServe)
}
