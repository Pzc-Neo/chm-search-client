<template>
  <div id="app">
    <router-view class="content" />
  </div>
</template>

<script>
export default {
  mounted() {
    // 隐藏用户信息面板
    document.getElementById('app').addEventListener('click', () => {
      this.$store.commit('SET_IS_SHOW_USER_INFO_BOX', false)
      this.$store.commit('SET_IS_SHOW_SETTING_BOX', false)
      // 隐藏右键菜单
      this.$store.commit('HIDE_CONTEXTMENU', false)
    })
  },
  methods: {}
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-image: url(https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4wHfK?ver=1d1c); */
  background-color: $color-bg-main;
  .content {
    width: 100%;
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    // background-color: #f5f5f5;
  }

  // 定义滚动条轨道
  // 内阴影+圆角
  ::-webkit-scrollbar-track {
    // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  // 定义滑块
  // 内阴影+圆角
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: $color-scroll-track;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: $color-scroll-track-hover;
  }
}
.el-loading-mask {
  display: flex;
  justify-content: center;
  .el-loading-spinner {
    width: 100px;
    text-align: center;
    position: absolute;
    background: $color-side-bg-transparent;
    border: 1px solid $color-side-border;
    padding: 10px;
    border-radius: 15px;
    .el-loading-text,
    i {
      color: $color-side-title;
    }
  }
}
* {
  box-sizing: border-box;
}
a {
  color: $color-title;
  text-decoration: none;
}
</style>
