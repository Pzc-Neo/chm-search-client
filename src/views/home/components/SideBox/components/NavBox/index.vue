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
        v-for="websiteGroup in websiteGroupList"
        :index="websiteGroup.id + ''"
        :key="websiteGroup.id"
      >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ websiteGroup.title }}</span>
        </template>
        <el-menu-item
          v-for="website in websiteGroup.websiteList"
          :index="website.id + ''"
          :key="website.id"
        >
          <div :href="website.url" @click.prevent="handleWebsiteClick(website)">
            {{ website.title }}
          </div>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websiteGroupList: [
        {
          id: 0,
          title: '搜索引擎',
          websiteList: [
            {
              id: 0,
              title: '百度',
              url: 'https://www.baidu.com/s?wd='
            },
            {
              id: 1,
              title: '必应',
              url: 'https://cn.bing.com/search?q='
            },
            {
              id: 2,
              title: '神马',
              url: 'https://so.m.sm.cn/s?q='
            }
          ]
        },
        {
          id: 1,
          title: '导航2',
          websiteList: [
            {
              id: 3,
              title: '选项1',
              url: 'https://www.baidu.com'
            },
            {
              id: 4,
              title: '选项2',
              url: 'https://www.baidu.com'
            },
            {
              id: 5,
              title: '选项3',
              url: 'https://www.baidu.com'
            }
          ]
        }
      ]
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleWebsiteClick(website) {
      console.log(website)
      // 搜索模式
      this.$store.commit('SET_MODE', 'search')
      // 设置单搜
      this.$store.commit('SET_SEARCH_TYPE', this.$store.state.searchTypeList[0])
      // 设置搜索引擎
      this.$store.commit('SET_SEARCH_ENGINE', {
        engineKey: 'engineId1',
        engineId: website.id
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
