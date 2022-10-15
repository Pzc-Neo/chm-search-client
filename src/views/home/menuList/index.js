import { group, groupBar } from './group'
import { website, websiteBar } from './website'
import { tab, tabBar } from './tab'

export const menuListFactory = function (type) {
  switch (type) {
    case 'group':
      return group.call(this)
    case 'groupBar':
      return groupBar.call(this)
    case 'websiteBar':
      return websiteBar.call(this)
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
