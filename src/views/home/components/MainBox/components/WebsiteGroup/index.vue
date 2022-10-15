<template>
  <div class="website_group" ref="websiteGroup">
    <div class="title">
      {{ websiteGroup.title }}
    </div>
    <WebsiteList
      :websites="websiteGroup.websites"
      @contextmenu.prevent="showContextmenu"
    ></WebsiteList>
  </div>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import WebsiteList from '../WebsiteList'
export default {
  name: 'WebsiteGroup',
  components: {
    WebsiteList
  },
  props: {
    websiteGroup: {
      type: Object,
      default() {
        return {
          title: '默认标题'
        }
      }
    }
  },
  data() {
    return {
      menuList: menuListFactory.call(this, 'website')
    }
  },
  methods: {
    // 显示右键菜单
    showContextmenu(event) {
      let target = event.target
      if (target === this.$refs.websiteGroup) {
        this.showBarMenu(event)
      } else {
        while (target !== this.$refs.websiteGroup) {
          if (target.tagName.toLowerCase() === 'a') {
            this.showItemMenu(event, target.id)
            break
          }
          target = target.parentNode
        }
      }
    },
    showBarMenu(event) {
      const param = {
        event,
        targetItem: {},
        menuList: this.menuListBar
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    showItemMenu(event, targetItemId) {
      const index = this.websites.findIndex((item) => {
        return item.id === targetItemId
      })
      const param = {
        event,
        targetItem: this.websites[index],
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    }
  }
}
</script>

<style lang="scss" scoped>
.website_group {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .title {
    margin-left: 6px;
  }
}
</style>
