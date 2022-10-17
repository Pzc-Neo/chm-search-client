<template>
  <div
    class="website_group"
    ref="websiteGroup"
    @contextmenu.prevent="showContextmenu($event)"
  >
    <div class="title">
      {{ websiteGroup.title }}
    </div>

    <WebsiteList :websites="websiteGroup.websites"></WebsiteList>

    <EditWebsiteGroupBox
      :is-show.sync="isShowDialog"
      :type="editWebsiteGroupBoxType"
      :website-group-for-contextmenu="websiteGroup"
    />
  </div>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import EditWebsiteGroupBox from './components/EditWebsiteGroupBox'
import WebsiteList from '../WebsiteList'
export default {
  name: 'WebsiteGroup',
  components: {
    WebsiteList,
    EditWebsiteGroupBox
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
      isShowDialog: false,
      editWebsiteGroupBoxType: 'add', // 网址框的模式：add：新建  edit: 编辑
      websiteGroupForContextmenu: null, // 点击右键菜单时，鼠标所指向的网址
      menuList: menuListFactory.call(this, 'websiteGroup')
    }
  },
  methods: {
    // 显示右键菜单
    showContextmenu(event) {
      this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
        groupId: this.websiteGroup.id
      })

      const param = {
        event,
        targetItem: this.websiteGroup,
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
  padding-bottom: 0;
  .title {
    margin-left: 6px;
    cursor: default;
  }
}
</style>
