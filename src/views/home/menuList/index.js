import { engine, engineGroup } from './engine'
import { website, websiteGroup } from './website'
import { tab, tabBar } from './tab'
import { tag } from './tag'

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
    case 'tag':
      return tag.call(this)
    default:
      break
  }
}
