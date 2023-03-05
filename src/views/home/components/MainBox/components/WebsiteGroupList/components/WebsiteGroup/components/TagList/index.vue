<template>
  <div class="tag_list">
    <div
      :class="['tag', 'disable', -1 === activeTagId ? 'active' : '']"
      @click="switchTag({ id: -1, title: '全部' })"
    >
      <a> 全部 </a>
    </div>

    <div class="tags_wrapper" v-if="!tags || (tags && tags.length !== 0)">
      <draggable
        tag="div"
        v-model="tags"
        v-bind="dragOptions"
        @start="drag = true"
        @end="handleDragEnd"
      >
        <transition-group
          type="transition"
          :name="!drag ? 'flip-websites' : null"
          class="tag_list_wrapper"
          ref="tagList"
        >
          <div
            v-for="tag in tags"
            :class="['tag', tag.id === activeTagId ? 'active' : '']"
            :key="tag.id"
            @click.stop="switchTag(tag)"
            @contextmenu.prevent.stop="showContextmenu($event, tag)"
            @drop="handleDrop($event, tag)"
          >
            <a>
              {{ tag.title }}
            </a>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div
      :class="['tag', 'disable', -2 === activeTagId ? 'active' : '']"
      @click="switchTag({ id: -2, title: '未分类' })"
      @drop="handleDrop($event, { id: -1, title: '未分类' })"
    >
      <a> 未分类 </a>
    </div>
  </div>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import draggable from 'vuedraggable'
import { serverTagUpdateOrder } from '@/api/tag'
import { getHomeData } from '@/util'
import { serverWebsiteUpdate } from '@/api/website'
export default {
  name: 'TagList',
  components: {
    draggable
  },
  props: {
    activeTagId: {
      type: Number,
      require: true
    },
    tagList: {
      type: Array,
      default() {
        return []
      }
    },
    switchTag: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      tags: [],
      drag: false
    }
  },
  created() {
    this.setTags(this.tagList)
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'tag_list',
        disabled: false,
        chosenClass: 'chosenClass',
        ghostClass: 'ghostClass'
      }
    }
  },
  watch: {
    tagList(newTagList) {
      this.setTags(newTagList)
    }
  },
  methods: {
    handleDrop(e, tag) {
      const website = this.$store.state?.dataForTag?.info
      // 拖拽标签的时候，不往下执行
      // 只有网址拖拽到标签的时候才往下执行
      if (!website) {
        return
      }
      const dataForServer = {
        id: website?.id,
        tagId: tag?.id
      }
      serverWebsiteUpdate(dataForServer).then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.$message({
            type: 'success',
            message: data?.msg
          })
          getHomeData.call(this)
        } else {
          this.$message({
            type: 'error',
            message: data?.msg
          })
        }
      })
    },
    // 显示右键菜单
    showContextmenu(event, tag) {
      this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
        groupId: tag.id,
        info: tag
      })

      const param = {
        event,
        targetItem: tag,
        menuList: menuListFactory.call(this, 'tag')
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    setTags(tags) {
      if (tags) {
        this.tags = tags
      }
    },

    handleDragEnd(e) {
      this.drag = false
      // 要更新的数据
      const updates = []
      this.tags.forEach((tag, index) => {
        if (tag.order !== index) {
          const update = {
            id: tag.id,
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
        groupId: this.tags[0].group_id,
        updates
      }
      serverTagUpdateOrder(dataForServer).then((res) => {
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
  }
}
</script>

<style lang="scss" scoped>
.tag_list {
  flex: 1;
  margin-left: 8px;
  font-size: 0.6em;
  display: flex;
  overflow-x: auto;
  margin-right: 20px;
  cursor: default;
  .tag_list_wrapper {
    display: flex;
  }
  .tag {
    a {
      color: #426e51;
    }
    color: #426e51;
    background-color: #f1f3f2;
    border-right: 1px solid #dedede;
    padding: 6px;
    padding-top: 8px;
    white-space: nowrap;
    &:last-child {
      border-right: 1px solid #e4f1ed;
    }
    &.active {
      // border-radius: 4px 4px 0px 0px;
      a {
        color: #0cbe83;
      }
      border-bottom: 2px solid #0cbe83;
    }
    &.disable a {
      color: rgb(66, 110, 81);
    }
    &:hover {
      border-radius: 4px 4px 0px 0px;
      background-color: #0cbe83;
      a {
        color: white;
      }
    }
  }
  // .chosenClass {
  //   background-color: #000 !important;
  //   color: #fff;
  // }
}
</style>
