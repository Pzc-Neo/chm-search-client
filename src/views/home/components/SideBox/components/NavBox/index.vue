<template>
  <div class="nav_box">
    <el-menu
      ref="navBar"
      default-active="0"
      :default-openeds="engineGroupIds"
      class="nav_bar"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <SubMenuList :engine-groups="engineGroups" />
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SubMenuList from './components/SubMenuList'

export default {
  name: 'NavBox',
  components: {
    SubMenuList
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
      engineList: (state) => state.engineList,
      isSideBoxCollapse: (state) => state.isSideBoxCollapse
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
  watch: {
    isSideBoxCollapse() {
      this.engineGroups.forEach((engineGroup) => {
        this.$refs.navBar.open(engineGroup.id + '')
      })
    }
  },
  methods: {
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
  overflow: hidden;
  overflow-y: auto;
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
    transition: all 20ms;
    border-right: 0;
    color: $color-side-title;
    background-color: $color-side-bg;
    .el-menu-item-group {
      color: $color-side-title;
      background-color: $color-side-bg-dark;
    }

  }
}
</style>
