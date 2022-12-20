<template>
  <el-col
    :xs="24"
    :sm="12"
    :md="12"
    :lg="8"
    :xl="6"
    class="website_group"
    ref="websiteGroup"
  >
    <div
      class="website_group_wrapper"
      @contextmenu.prevent="showContextmenu($event)"
    >
      <div class="title_container">
        <TagList
          :active-tag-id="activeTagId"
          :tag-list="websiteGroup.tags"
          :switch-tag="switchTag"
        />
        <div class="title" :style="styleTitle">
          <!-- <i class="el-icon-menu" /> -->
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
        :websites="websiteGroupList"
        :website-group-id="websiteGroup.id"
        :active-tag-id="activeTagId"
      ></WebsiteList>
    </div>
  </el-col>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import WebsiteList from './components/WebsiteList'
import TagList from './components/TagList'
import {
  serverWebsiteGroupUpdateOrder,
  serverWebsiteGroupSetTagId
} from '@/api/website'
import { getHomeData } from '@/util'
export default {
  name: 'WebsiteGroup',
  components: {
    WebsiteList,
    TagList
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
    },
    update: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      isShowDialog: false,
      editWebsiteGroupBoxType: 'add', // 网址框的模式：add：新建  edit: 编辑
      websiteGroupForContextmenu: null, // 点击右键菜单时，鼠标所指向的网址
      menuList: menuListFactory.call(this, 'websiteGroup'),
      activeTagId: -1
    }
  },
  computed: {
    websiteGroupList() {
      // 未分类
      if (this.activeTagId === -2) {
        return this.websiteGroup.websites.filter((website) => {
          return [-1, null].includes(website.tag_id)
        })
      }
      // 所有
      if ([-1, undefined].includes(this.activeTagId)) {
        return this.websiteGroup.websites
        // 按标签分类
      } else {
        const result = this.websiteGroup.websites.filter((website) => {
          return website.tag_id === this.activeTagId
        })
        return result
      }
    },
    styleTitle() {
      const style = {}
      if (this.websiteGroup.color) {
        style.color = this.websiteGroup.color
      }
      if (this.websiteGroup.bg_color) {
        style.backgroundColor = this.websiteGroup.bg_color
      }
      return style
    }
  },
  mounted() {
    this.setActiveTag(this.websiteGroup)
  },
  watch: {
    websiteGroup(newItem) {
      this.setActiveTag(newItem)
    }
  },
  methods: {
    setActiveTag(websiteGroup) {
      this.activeTagId = websiteGroup.active_tag_id || -1 // -1为全部
    },
    // 显示右键菜单
    showContextmenu(event) {
      this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
        info: this.websiteGroup
      })

      this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
        info: this.websiteGroup
      })

      const websiteGroup = {
        ...this.websiteGroup,
        group_id: this.websiteGroup.id
      }
      const param = {
        event,
        targetItem: websiteGroup,
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
    },
    switchTag(tag) {
      this.activeTagId = tag.id
      const dataForServer = {
        id: this.websiteGroup.id,
        activeTagId: this.activeTagId
      }
      serverWebsiteGroupSetTagId(dataForServer).then((res) => {
        const { code } = res
        if (code === 0) {
          this.update(this.websiteGroup, 'active_tag_id', this.activeTagId)
        }
      })
      //   serverWebsiteGroupSetTagId(dataForServer).then((res) => {
      //     const { code, data } = res
      //     if (code === 0) {
      //       getHomeData.call(this)
      //       this.$message({
      //         type: 'success',
      //         message: data?.msg
      //       })
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: data?.msg
      //       })
      //     }
      //   })
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
  max-height: 174px;
  // overflow: hidden;
  margin-bottom: 10px;
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
    // margin-right: 11px;
    cursor: default;
    // padding: 10px;
    border-bottom: 1px solid $color-label-group-border;
    .title {
      background-color: #0cbe83;
      padding: 7px;
      color: white;
      font-size: 0.8em;
      border-radius: 0px 5px 0px 8px;
      .website_count {
        // color: $color-label-subtitle;
        font-size: 0.7em;
      }
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
