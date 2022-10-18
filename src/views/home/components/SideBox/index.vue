<template>
  <div class="side_box">
    <a href="/" class="logo_container">
      <div class="logo" v-if="!isCollapse">
        <div class="name">城墨聚搜</div>
        <div class="version">v1.0</div>
      </div>
      <div class="logo collapse" v-else>
        <div class="name">城墨</div>
      </div>
    </a>
    <NavBox :isCollapse="isCollapse"></NavBox>
  </div>
</template>

<script>
import NavBox from './components/NavBox'
export default {
  name: 'SideBox',
  components: {
    NavBox
  },
  data() {
    return {}
  },
  computed: {
    isCollapse() {
      return this.$store.state.isSideBoxCollapse
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.side_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $color-side-title;
  background-color: $color-side-bg;
  .logo_container {
    width: 100%;
    height: $height-header;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-logo;
    .logo {
      display: flex;
      align-items: baseline;
      .name {
        font-size: 25px;
        font-weight: 700;
      }
      .version {
        margin-left: 5px;
      }
    }
  }
  .site {
    flex: 1;
  }
}
</style>
