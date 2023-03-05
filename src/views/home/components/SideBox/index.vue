<template>
  <div class="side_box">
    <div class="logo_container">
      <a href="/" class="name">{{ isCollapse ? '城墨' : '城墨聚搜' }}</a>
      <i
        :class="[isSideBoxCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        @click="isSideBoxCollapse = !isSideBoxCollapse"
      ></i>
    </div>
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
    },
    isSideBoxCollapse: {
      get() {
        return this.$store.state.isSideBoxCollapse
      },
      set(newValue) {
        this.$store.commit('SET_IS_SIDE_BOX_COLLAPSE', newValue)
      }
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
    font-size: 28px;
    font-weight: 700;
    color: $color-logo;
    a {
      color: $color-logo;
    }
    i {
      margin-left: 5px;
      font-size: 32px;
      cursor: pointer;
    }
  }
  .site {
    flex: 1;
  }
}
</style>
