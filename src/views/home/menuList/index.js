import { group, groupBar } from './group'
import { website, websiteGroup } from './website'
import { tab, tabBar } from './tab'

export const menuListFactory = function (type) {
  switch (type) {
    case 'group':
      return group.call(this)
    case 'groupBar':
      return groupBar.call(this)
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
