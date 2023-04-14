<template>
  <div class="header_box">
    <div class="left">
      <div class="switch_panel_btn">
        <i
          class="el-icon-search"
          v-show="mode === 'search'"
          @click="mode = 'website'"
        />
        <i
          class="el-icon-menu"
          v-show="mode === 'website'"
          @click="mode = 'search'"
        />
      </div>
      <SearchBox />
      <el-col :xs="0" :sm="1" :md="1" :lg="1" :xl="1">
        <iframe
          class="wether"
          allowtransparency="true"
          frameborder="0"
          width="180"
          height="36"
          scrolling="no"
          src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=c0c0c0&ltf=c0c0c0&htf=c0c0c0&q=1&e=1&a=1&c=54511&w=180&h=36&align=center"
        ></iframe>
      </el-col>
    </div>
    <div class="right">
      <ShareBox />
      <UserInfoBox />
    </div>
  </div>
</template>

<script>
import SearchBox from './components/SearchBox'
import UserInfoBox from './components/UserInfoBox'
import ShareBox from './components/ShareBox'

export default {
  name: 'HeaderBox',
  components: {
    SearchBox,
    UserInfoBox,
    ShareBox
  },
  data() {
    return {}
  },
  computed: {
    mode: {
      get() {
        return this.$store.state.mode
      },
      set(newValue) {
        this.$store.commit('SET_MODE', newValue)
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
      font-size: 28px;
      cursor: pointer;
    }
    .search_box {
      margin-left: 5px;
    }
    .wether {
      margin-left: 3px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .share_box {
      margin-right: 7px;
    }
  }
}
</style>
