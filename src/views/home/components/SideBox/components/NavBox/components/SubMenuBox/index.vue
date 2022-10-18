<template>
  <draggable
    class="sub_menu_box"
    tag="div"
    v-model="engineList"
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
      <el-menu-item
        v-for="engine in engineList"
        :index="engine.id + ''"
        :key="engine.id"
      >
        <div
          :href="engine.url"
          @click.prevent="handleWebsiteClick(engine)"
          @contextmenu.prevent.stop="showEngineContextmenu($event, engine)"
        >
          {{ engine.title }}
        </div>
      </el-menu-item>
    </transition-group>
  </draggable>
</template>

<script>
import { serverEngineUpdateOrder } from '@/api/engine'
import draggable from 'vuedraggable'
import { menuListFactory } from '@/views/home/menuList'

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
      this.engineList.map((engine, index) => {
        updates[index] = {
          id: engine.id,
          order: index
        }
        return (engine.order = index)
      })
      const dataForServer = {
        groupId: this.engineList[0].group_id,
        updates
      }
      console.log(dataForServer)
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
  .el-menu-item {
    min-width: 50px;
    text-align: left;
    color: $color-side-title;
    background-color: $color-side-bg-dark;
    padding-left: 30px !important;
    &:hover {
      background-color: $color-side-bg-darker;
    }
    &.is-active {
      background-color: $color-side-bg-darker;
    }
  }
}
</style>
