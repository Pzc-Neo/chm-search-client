import { serverHomeGetData } from '@/api/home'
import hotkeys from 'hotkeys-js'

/**
 * 获取首页数据
 * @example getHomeData.call(this)
 */
export const getHomeData = function () {
  return new Promise((resolve, reject) => {
    serverHomeGetData().then((res) => {
      const { code, data } = res
      if (code === 0) {
        const { websiteGroups, engineGroups } = data
        // 所有搜索引擎
        const allEngineObj = {}
        const engineGroupsConvert = []
        const keymapList = []
        engineGroups.forEach((engineGroup) => {
          const engineObj = {}
          engineGroup.engineList = engineGroup.engines
          engineGroup.engines.forEach((engine) => {
            engineObj[engine.id] = engine
            allEngineObj[engine.id] = engine

            // 有设置快捷键的话，就添加到快捷键列表里面，一会绑定快捷键
            if (engine.hotkey) {
              keymapList.push({
                hotkey: engine.hotkey,
                selector: '.engine-' + engine.id
              })
            }
          })
          engineGroup.engines = engineObj
          engineGroupsConvert.push(engineGroup)
        })
        // 绑定快捷键
        registerKeymap(keymapList)

        this.$store.commit('SET_WEBSITE_GROUPS', websiteGroups)
        this.$store.commit('SET_ENGINE_GROUPS', engineGroupsConvert)
        this.$store.commit('SET_ENGINE_LIST', allEngineObj)
      } else {
        this.$message({
          message: data?.msg,
          type: 'error'
        })
      }
      resolve(data)
    })
  })
}

/**
 * 注册快捷键
 * @param {Array} keymapList 快捷键列表
 */
export const registerKeymap = function (keymapList) {
  keymapList.forEach((hotkey) => {
    hotkeys.filter = function (event) {
      return true
    }
    hotkeys(hotkey.hotkey, function (event, handler) {
      event.preventDefault()
      const hotkeyTarget = document.querySelector(hotkey.selector)
      if (hotkeyTarget) {
        hotkeyTarget.click()
      }
    })
  })
}
