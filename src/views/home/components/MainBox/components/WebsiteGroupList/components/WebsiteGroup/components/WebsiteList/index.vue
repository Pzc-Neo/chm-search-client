<template>
  <!-- <div class="website_list"> -->
  <el-row class="website_list">
    <!-- <div class="sub_group">
      <div class="item">分组01</div>
      <div class="item">分组02</div>
      <div class="item">分组03</div>
    </div> -->
    <draggable
      tag="div"
      class="website_container"
      v-model="websiteList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="handleDragEnd"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'flip-websites' : null"
        class="website_list_container"
        ref="websiteGroup"
      >
        <el-col
          :xs="12"
          :sm="12"
          :md="12"
          :lg="8"
          :xl="8"
          v-for="website in websiteList"
          @dragstart.native="handleDrag($event, website)"
          :key="website.id"
        >
          <a
            class="website"
            ref="website"
            target="_blank"
            :href="website.url"
            @contextmenu.prevent.stop="showContextmenu($event, website)"
            :title="`标题：${website.title}\n描述：${website.description}\n链接：${website.url}`"
          >
            <div class="icon">
              <NeoImage :src="website.url" />
            </div>
            <div class="container">
              <div class="title">
                {{ website.title }}
              </div>
              <div class="description" v-if="false">
                {{ website.description || website.url }}
              </div>
            </div>
          </a>
        </el-col>
      </transition-group>
    </draggable>
  </el-row>
  <!-- </div> -->
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import draggable from 'vuedraggable'
import { serverWebsiteGroupId, serverWebsiteUpdateOrder } from '@/api/website'
import { getDiffs, getHomeData } from '@/util'
import NeoImage from '@/components/NeoImage'
export default {
  name: 'WebsiteList',
  display: 'Transitions',
  order: 7,
  components: {
    draggable,
    NeoImage
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
    },
    activeTagId: {
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
    handleDrag(e, website) {
      this.$store.commit('SET_ITEM_FOR_TAG', {
        type: 'website',
        info: website
      })
    },
    // 显示右键菜单
    showContextmenu(event, website) {
      // this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
      //   groupId: website.group_id,
      //   info: website
      // })

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
        // this.$message({
        //   message: '排序没有改变',
        //   type: 'info'
        // })
        return
      }
      const dataForServer = {
        groupId: this.websiteGroupId,
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
          activeTagId: this.activeTagId,
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
        disabled: !this.$store.state.isEditMode,
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
  display: flex;
  .sub_group {
    padding: 6px;
    width: 60px;
    overflow: hidden;
    overflow-y: auto;
    .item {
      padding: 5px;
      white-space: nowrap;
    }
  }
  .website_container {
    flex: 1;
  }
  .website_list_container {
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 6px 12px;
    .website {
      /* max-width: 190px; */
      /* width: 32%; */
      position: relative;
      top: 0px;
      border-radius: 8px;
      padding: 5px 6px;
      // padding-bottom: 9px;
      transition: all 0.2s ease-in-out;
      display: flex;
      align-items: center;
      /* border: 1px solid #cce5dd; */
      // background-color: #f1f3f2;
      /* background-color: #f9f9f9; */
      color: #0cbe83;
      // color: #3f9b7e;
      margin: 2px;
      /* box-shadow: 1px 2px 3px #a3d3c247; */
      &:hover {
        top: -2px;
        box-shadow: 0px 3px 4px rgb(193 219 207 / 56%);
      }
      .icon {
        width: 15px;
        height: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .container {
        flex: 1;
        margin-left: 5px;
        display: flex;
        flex-direction: column;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .title {
        font-size: 13px;
        // font-weight: 700;
        // 文字溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
