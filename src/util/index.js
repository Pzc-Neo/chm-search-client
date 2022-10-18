import { serverHomeGetData } from '@/api/home'

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
        engineGroups.forEach((engineGroup) => {
          const engineObj = {}
          engineGroup.engineList = engineGroup.engines
          engineGroup.engines.forEach((engine) => {
            engineObj[engine.id] = engine
            allEngineObj[engine.id] = engine
          })
          engineGroup.engines = engineObj
          engineGroupsConvert.push(engineGroup)
        })
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
