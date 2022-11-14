<template>
  <div class="website_list">
    <draggable
      tag="div"
      v-model="websiteList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="handleDragEnd"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'flip-websites' : null"
        class="website_group"
        ref="websiteGroup"
      >
        <a
          class="website"
          ref="website"
          target="_blank"
          v-for="website in websiteList"
          :href="website.url"
          :key="website.id"
          :title="website.description || website.url"
          @contextmenu.prevent.stop="showContextmenu($event, website)"
        >
          <div class="title">
            {{ website.title }}
          </div>
          <div class="description" v-if="true">
            {{ website.description || website.url }}
          </div>
        </a>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import draggable from 'vuedraggable'
import { serverWebsiteGroupId, serverWebsiteUpdateOrder } from '@/api/website'
import { getDiffs, getHomeData } from '@/util'
export default {
  name: 'WebsiteList',
  display: 'Transitions',
  order: 7,
  components: {
    draggable
  },
  model: {
    prop: 'websites',
    change: 'update'
  },
  props: {
    websites: {
      type: Array,
      default() {
        return []
      }
    },
    websiteGroupId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      websiteList: [],
      drag: false
    }
  },
  methods: {
    // 显示右键菜单
    showContextmenu(event, website) {
      this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
        groupId: website.group_id,
        info: website
      })

      const param = {
        event,
        targetItem: website,
        menuList: menuListFactory.call(this, 'website')
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    handleDragEnd() {
      this.drag = false
      // 要更新的数据
      const updates = []
      this.websiteList.forEach((website, index) => {
        if (website.order !== index) {
          const update = {
            id: website.id,
            order: index
          }
          updates.push(update)
        }
      })
      if (updates.length === 0) {
        this.$message({
          message: '排序没有改变',
          type: 'info'
        })
        return
      }
      const dataForServer = {
        groupId: this.websiteList[0]?.group_id,
        updates
      }
      serverWebsiteUpdateOrder(dataForServer).then((res) => {
        const { code, data } = res
        if (code === 0) {
          getHomeData.call(this)
          this.$message({
            message: data.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  },
  created() {
    this.websiteList = this.websites
  },
  watch: {
    websites(newValue) {
      this.websiteList = newValue
    },
    // 跨分组拖拽
    websiteList(newList) {
      const oldList = this.websites
      // 新列表的长度大于旧列表的长度，说明有其他分组的网址被拖拽进来，或者分组有新添加的项目
      if (newList.length > oldList.length) {
        // 重设order字段
        newList = newList.map((item, index) => {
          item.order = index
          return item
        })

        // 找出新添加的网址
        const newWebsites = getDiffs(newList, oldList)
        if (newWebsites.length === 0) {
          return
        }
        // 新拖拽进来的网址
        const website = newWebsites[0]
        const dataForServer = {
          id: website?.id,
          groupId: this.websiteGroupId,
          order: website?.order
        }
        // 更新网址分组id和排序
        serverWebsiteGroupId(dataForServer).then((res) => {
          const { code, data } = res
          if (code === 0) {
            getHomeData.call(this)
            this.$message({
              type: 'success',
              message: data?.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: data?.msg
            })
          }
        })
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.website_list {
  overflow: hidden;
  overflow-y: auto;
  margin-bottom: 5px;
  .website_group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 6px 7px;
    .website {
      position: relative;
      top: 0px;
      width: 166px;
      border-radius: 5px;
      padding: 12px;
      padding-bottom: 9px;
      transition: all 0.3s ease-in-out;
      &:hover {
        top: -3px;
        box-shadow: $box-shadow-main;
      }
      .title {
        font-size: 13px;
        font-weight: 700;
        color: $color-label-title;
      }
      .description {
        padding-top: 6px;
        font-size: 0.5em;
        color: $color-label-subtitle;
        // 文字溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
