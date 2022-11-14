<template>
  <div class="sub_menu_box">
    <draggable
      tag="div"
      class="drag_section"
      v-model="engineList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="handleDragEnd"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'flip-websites' : null"
        class="engine"
        ref="engine"
      >
        <el-menu-item
          v-for="engine in engineList"
          :index="engine.id + ''"
          :key="engine.id"
        >
          <div
            :href="engine.url"
            :class="['engine', 'engine-' + engine.id]"
            @click.prevent="handleWebsiteClick(engine)"
            @contextmenu.prevent.stop="showEngineContextmenu($event, engine)"
          >
            <!-- <img :src="engine.url_home + '/favicon.ico'" /> -->
            <div class="title">{{ engine.title }}</div>
            <div class="hotkey" v-if="engine.hotkey">{{ engine.hotkey }}</div>
          </div>
        </el-menu-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { serverEngineUpdateOrder, serverSetEngineGroupId } from '@/api/engine'
import draggable from 'vuedraggable'
import { menuListFactory } from '@/views/home/menuList'
import { getDiffs } from '@/util'

export default {
  name: 'SubMenuBox',
  props: {
    engineGroup: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      engineList: []
    }
  },
  created() {
    this.setEngineList()
  },
  watch: {
    engineGroup() {
      this.setEngineList()
    },
    engineList(newList) {
      const oldList = this.engineGroup?.engineList
      // 新列表的长度大于旧列表的长度，说明有其他分组的引擎被拖拽进来，或者分组有新添加的项目
      if (newList.length > oldList.length) {
        // 重设order字段
        newList = newList.map((item, index) => {
          item.order = index
          return item
        })

        // 找出新添加的引擎
        const newEngines = getDiffs(newList, oldList)
        if (newEngines.length === 0) {
          return
        }
        // 新拖拽进来的引擎
        const engine = newEngines[0]
        const dataForServer = {
          id: engine?.id,
          groupId: this.engineGroup?.id,
          order: engine?.order
        }
        // 更新引擎分组id和排序
        serverSetEngineGroupId(dataForServer).then((res) => {
          const { code, data } = res
          if (code === 0) {
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
  },
  methods: {
    handleWebsiteClick(engine) {
      // 搜索模式
      this.$store.commit('SET_MODE', 'search')
      // 设置单搜
      this.$store.commit('SET_SEARCH_TYPE', this.$store.state.searchTypeList[0])
      // 设置搜索引擎
      this.$store.commit('SET_SEARCH_ENGINE', {
        engineKey: 'engineId1',
        engineId: engine.id
      })
    },
    // 显示右键菜单
    showEngineContextmenu(event, engine) {
      this.$store.commit('SET_EDIT_ENGINE_BOX_DATA', {
        groupId: engine.group_id,
        info: engine
      })

      const param = {
        event,
        targetItem: engine,
        menuList: menuListFactory.call(this, 'engine')
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    setEngineList() {
      this.engineList = this.engineGroup.engineList
    },
    handleDragEnd() {
      this.drag = false
      // 要更新的数据
      const updates = []
      this.engineList.forEach((engine, index) => {
        if (engine.order !== index) {
          const update = {
            id: engine.id,
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
        groupId: this.engineList[0].group_id,
        updates
      }
      serverEngineUpdateOrder(dataForServer).then((res) => {
        const { code, data } = res
        if (code === 0) {
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
.sub_menu_box {
  background-color: $color-side-bg-dark;
  .drag_section {
    min-height: 20px;
    background-color: $color-side-bg;
  }

  .el-menu-item {
    min-width: 50px;
    text-align: left;
    color: $color-side-title;
    background-color: $color-side-bg-dark;
    padding-left: 20px !important;
    height: 40px;
    line-height: 40px;
    &:hover {
      background-color: $color-side-bg-darker;
    }
    &.is-active {
      background-color: $color-side-bg-darker;
    }
    .engine {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        height: 45%;
        margin-right: 6px;
      }
      .hotkey {
        font-size: 0.5em;
        margin-left: 5px;
        color: $color-side-subtitle;
      }
    }
  }
}
</style>
