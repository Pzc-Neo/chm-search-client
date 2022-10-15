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
    })
  }
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
  background-color: $color-bg-main;
  .content {
    width: 100%;
    height: 100%;
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
