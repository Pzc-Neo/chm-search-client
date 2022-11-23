<template>
  <el-col
    :xs="24"
    :sm="12"
    :md="12"
    :lg="8"
    :xl="8"
    class="website_group"
    ref="websiteGroup"
  >
    <div
      class="website_group_wrapper"
      @contextmenu.prevent="showContextmenu($event)"
    >
      <div class="title_container">
        <div class="title">
          <i class="el-icon-menu" />
          <span> {{ websiteGroup.title }} </span>
          <span class="website_count"
            >({{ websiteGroup.websites.length }})</span
          >
        </div>
        <!-- <div class="edit_tools">
        <div class="tool up" @click="handleGroupOrder(websiteGroup, 'up')">
          <i class="el-icon-caret-top"></i>
        </div>
        <div class="tool down" @click="handleGroupOrder(websiteGroup, 'down')">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div> -->
      </div>

      <WebsiteList
        :websites="websiteGroup.websites"
        :website-group-id="websiteGroup.id"
      ></WebsiteList>
    </div>
  </el-col>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import WebsiteList from './components/WebsiteList'
import { serverWebsiteGroupUpdateOrder } from '@/api/website'
import { getHomeData } from '@/util'
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
    },
    websiteGroups: {
      type: Array,
      default() {
        return []
      }
    },
    index: {
      type: Number,
      default: 0
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

      this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
        info: this.websiteGroup
      })

      const param = {
        event,
        targetItem: this.websiteGroup,
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    // 网址分组排序
    handleGroupOrder(websiteGroup, type) {
      let targetGroup = 0
      if (type === 'up') {
        if (this.index <= 0) {
          this.$message({
            message: '不能再往上',
            type: 'error'
          })
          return
        }
        targetGroup = this.websiteGroups[this.index - 1]
      } else {
        if (this.index >= this.websiteGroups.length - 1) {
          this.$message({
            message: '不能再往下',
            type: 'error'
          })
          return
        }
        targetGroup = this.websiteGroups[this.index + 1]
      }
      // 交换一下当前分组与目标分组的order值
      const dataForServer = {
        updates: [
          { id: targetGroup.id, order: websiteGroup.order },
          { id: websiteGroup.id, order: targetGroup.order }
        ]
      }
      const loading = this.$loading({
        lock: true,
        text: '正在排序...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteGroupUpdateOrder(dataForServer).then((res) => {
        loading.close()
        const { code, data } = res
        if (code === 0) {
          this.$message({
            message: data.msg,
            type: 'success'
          })
          getHomeData.call(this)
        } else {
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// @media screen and (max-width: 820px) {
//   .website_group {
//     width: 100%;
//   }
// }
// @media screen and (min-width: 820px) and (max-width: 1200px) {
//   .website_group {
//     width: 48%;
//   }
// }
// @media screen and (min-width: 1200px) and (max-width: 1920px) {
//   .website_group {
//     width: 30%;
//   }
// }
.website_group {
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 15px;
}
.website_group_wrapper {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  background-color: $color-label-group-bg;
  // margin: 6px;
  border-radius: 8px;
  box-shadow: #adc3b842 0px 2px 2px 1px;
  // position: relative;
  // top: 0;
  // transition: all 0.3s ease-in-out;
  // &:hover {
  //   top:-3px;
  //   box-shadow: #adc3b842 0px 3px 3px 3px;
  // }
  .title_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 6px;
    margin-right: 11px;
    cursor: default;
    padding: 13px;
    border-bottom: 1px solid $color-label-group-border;
    .website_count {
      color: $color-label-subtitle;
      font-size: 0.7em;
    }
    .edit_tools {
      display: none;
      .tool {
        margin-left: 6px;
      }
      .tool:hover {
        border-radius: 100%;
        color: $color-bg-main;
        background-color: $color-side-title-group;
      }
    }
    &:hover {
      .edit_tools {
        display: flex;
      }
    }
  }
}
</style>
