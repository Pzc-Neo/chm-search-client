<template>
  <div class="header_box">
    <div class="left">
      <i
        class="el-icon-s-fold"
        v-if="!isSideBoxCollapse"
        @click="isSideBoxCollapse = !isSideBoxCollapse"
      ></i>
      <i
        class="el-icon-s-unfold"
        v-else
        @click="isSideBoxCollapse = !isSideBoxCollapse"
      ></i>
      <SearchBox />
    </div>
    <UserInfoBox />
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import UserInfoBox from './components/UserInfoBox'

export default {
  name: 'HeaderBox',
  components: {
    SearchBox,
    UserInfoBox
  },
  data() {
    return {}
  },
  computed: {
    isSideBoxCollapse: {
      get() {
        return this.$store.state.isSideBoxCollapse
      },
      set(newValue) {
        this.$store.commit('SET_IS_SIDE_BOX_COLLAPSE', newValue)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;

  text-align: left;
  height: $height-header;
  color: $color-side-title;
  background-color: $color-side-bg;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 35px;
      cursor: pointer;
    }
    .search_box {
      margin-left: 5px;
    }
  }
}
</style>
