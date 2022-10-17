import { engine, engineGroup } from './engine'
import { website, websiteGroup } from './website'
import { tab, tabBar } from './tab'

export const menuListFactory = function (type) {
  switch (type) {
    case 'engine':
      return engine.call(this)
    case 'engineGroup':
      return engineGroup.call(this)
    case 'websiteGroup':
      return websiteGroup.call(this)
    case 'website':
      return website.call(this)
    case 'tab':
      return tab.call(this)
    case 'tabBar':
      return tabBar.call(this)
    default:
      break
  }
}
