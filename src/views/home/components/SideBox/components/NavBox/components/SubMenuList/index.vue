<template>
  <el-menu-item v-if="!engineGroups || engineGroups.length === 0" index="-1">
    <template slot="title">
      <div>
        <el-button type="primary" @click="addEngineGroup">添加分组</el-button>
      </div>
    </template>
  </el-menu-item>
  <draggable
    class="sub_menu_list"
    v-else
    tag="div"
    v-model="engineGroupList"
    v-bind="dragOptions"
    @start="drag = true"
    @end="handleDragEnd"
  >
    <transition-group
      type="transition"
      :name="!drag ? 'flip-websites' : null"
      class="website_group"
      ref="engineGroup"
    >
      <el-submenu
        v-for="engineGroup in engineGroupList"
        :index="engineGroup.id + ''"
        :key="engineGroup.id"
      >
        <template slot="title">
          <div
            @contextmenu.prevent="
              showEngineGroupContextmenu($event, engineGroup)
            "
          >
            <i class="el-icon-ship"></i>
            <span slot="title">{{ engineGroup.title }}</span>
          </div>
        </template>
        <MenuItemList :engine-group="engineGroup" />
      </el-submenu>
    </transition-group>
  </draggable>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import { serverEngineGroupUpdateOrder } from '@/api/engine'
import draggable from 'vuedraggable'
import MenuItemList from '../MenuItemList'
export default {
  name: 'SubMenuList',
  components: {
    draggable,
    MenuItemList
  },
  props: {
    engineGroups: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      drag: true
    }
  },
  created() {
    this.engineGroupList = this.engineGroups
  },
  watch: {
    engineGroups(newValue) {
      this.engineGroupList = newValue
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'website_group_list',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  methods: {
    // 显示右键菜单
    showEngineGroupContextmenu(event, engineGroup) {
      this.$store.commit('SET_EDIT_ENGINE_BOX_DATA', {
        groupId: engineGroup.id
      })

      this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
        info: engineGroup
      })

      const param = {
        event,
        targetItem: engineGroup,
        menuList: menuListFactory.call(this, 'engineGroup')
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    addEngineGroup() {
      this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
        isShow: true,
        type: 'add'
      })
    },
    handleDragEnd() {
      this.drag = false

      // 要更新的数据
      const updates = []
      this.engineGroupList.map((engineGroup, index) => {
        if (engineGroup.order !== index) {
          const update = {
            id: engineGroup.id,
            order: index
          }
          updates.push(update)
        }
        return (engineGroup.order = index)
      })
      if (updates.length === 0) {
        this.$message({
          message: '排序没有改变',
          type: 'info'
        })
        return
      }
      const dataForServer = {
        updates
      }
      serverEngineGroupUpdateOrder(dataForServer).then((res) => {
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
.sub_menu_list {
  .el-menu-item {
    min-width: 50px;
    text-align: left;
    color: $color-side-title;
    padding-left: 30px !important;
    height: 43px;
    line-height: 43px;
    &:hover {
      background-color: $color-side-bg;
    }
    &.is-active {
      background-color: $color-side-bg-darker;
    }
  }
  .el-submenu {
    :deep(.el-submenu__title) {
      padding-left: 10px !important;
      height: 40px;
      line-height: 40px;
    }
    .el-menu-item {
      min-width: 50px;
      text-align: left;
      color: $color-side-title;
      background-color: $color-side-bg-dark;
      padding-left: 30px !important;
      height: 43px;
      line-height: 43px;
      &:hover {
        background-color: $color-side-bg-darker;
      }
      &.is-active {
        background-color: $color-side-bg-darker;
      }
    }
  }
  :deep(.el-submenu__title) {
    text-align: left;
    color: $color-side-title-group;
    &:hover {
      background-color: $color-side-bg-dark1;
    }
  }
}
</style>
