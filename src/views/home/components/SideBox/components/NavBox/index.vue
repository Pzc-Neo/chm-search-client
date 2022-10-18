<template>
  <div class="nav_box">
    <el-menu
      default-active="0"
      :default-openeds="engineGroupIds"
      class="nav_bar"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu
        v-for="engineGroup in engineGroups"
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
        <SubMenuBox :engine-group="engineGroup" />
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import { mapState } from 'vuex'
import SubMenuBox from './components/SubMenuBox'

export default {
  name: 'NavBox',
  components: {
    SubMenuBox
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      drag: false,
      engineListLocal: []
    }
  },
  computed: {
    ...mapState({
      engineGroups: (state) => state.engineGroups,
      engineList: (state) => state.engineList
    }),
    engineGroupIds() {
      const result = []
      if (this.engineGroups) {
        this.engineGroups.forEach((engine) => {
          result.push(engine.id + '')
        })
      }
      return result
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_box {
  flex: 1;
  display: flex;
  flex-direction: column;
  a,
  i {
    color: $color-side-title-group;
  }
  .nav_bar {
    flex: 1;
    width: 100%;
    user-select: none;
    &:not(.el-menu--collapse) {
      width: 180px;
      min-height: 400px;
    }
  }
  .el-menu {
    border-right: 0;
    color: $color-side-title;
    background-color: $color-side-bg;
    .el-menu-item-group {
      color: $color-side-title;
      background-color: $color-side-bg-dark;
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
}
</style>
