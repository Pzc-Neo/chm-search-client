<template>
  <div class="nav_box">
    <el-menu
      default-active="0"
      :default-openeds="['0', '1', '2', '3', '4', '5', '6']"
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
          <i class="el-icon-location"></i>
          <span slot="title">{{ engineGroup.title }}</span>
        </template>
        <el-menu-item
          v-for="engine in engineGroup.engines"
          :index="engine.id + ''"
          :key="engine.id"
        >
          <div :href="engine.url" @click.prevent="handleWebsiteClick(engine)">
            {{ engine.title }}
          </div>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBox',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      engineGroups: (state) => state.engineGroups
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleWebsiteClick(engine) {
      console.log(engine)
      // 搜索模式
      this.$store.commit('SET_MODE', 'search')
      // 设置单搜
      this.$store.commit('SET_SEARCH_TYPE', this.$store.state.searchTypeList[0])
      // 设置搜索引擎
      this.$store.commit('SET_SEARCH_ENGINE', {
        engineKey: 'engineId1',
        engineId: engine.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_box {
  flex: 1;
  display: flex;
  flex-direction: column;
  a {
    color: $color-side-title;
  }
  .el-menu {
    border-right: 0;
    color: $color-side-title;
    background-color: $color-side-bg;
    .el-menu-item-group {
      color: $color-side-title;
      background-color: $color-side-bg-dark;
    }
    .el-menu-item {
      color: $color-side-title;
      background-color: $color-side-bg-dark;
      &:hover {
        background-color: red;
      }
    }
    .el-submenu {
      .el-menu-item {
        text-align: left;
        color: $color-side-title;
        background-color: $color-side-bg-dark;
        &:hover {
          background-color: $color-side-bg-darker;
        }
        &.is-active {
          background-color: $color-side-bg-darker;
        }
      }
    }
    // ::v-deep &.el-menu--inline {
    //   background-color: $color-side-bg-dark;
    // }
    ::v-deep .el-submenu__title {
      text-align: left;
      color: $color-side-title;
      &:hover {
        background-color: $color-side-bg-dark1;
      }
    }
  }
  .nav_bar {
    flex: 1;
    width: 100%;
  }
  .nav_bar:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
