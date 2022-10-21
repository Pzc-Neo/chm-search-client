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
      <iframe
        class="wether"
        allowtransparency="true"
        frameborder="0"
        width="180"
        height="36"
        scrolling="no"
        src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=c0c0c0&ltf=c0c0c0&htf=c0c0c0&q=1&e=1&a=1&c=54511&w=180&h=36&align=center"
      ></iframe>
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
  color: $color-logo;
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
    .wether {
      margin-left: 3px;
    }
  }
}
</style>
