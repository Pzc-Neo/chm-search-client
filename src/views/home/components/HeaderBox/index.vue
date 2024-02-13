<template>
  <div class="header_box">
    <div class="container">
      <div class="left">
        <div class="command toggle_sidebox" title="显示/隐藏侧栏">
          <el-switch
            v-model="_isShowSideBox"
            size="small"
            active-color="#13ce66"
            inactive-color="#8C948A"
          >
          </el-switch>
          <!-- <span class="hint_text">侧栏</span> -->
        </div>
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
        <!-- <el-button size="mini" :style="{ background: 'red' }">编辑</el-button> -->
        <div class="command toggle_edit_mode">
          <el-switch
            v-model="_isEditMode"
            size="small"
            active-color="#13ce66"
            inactive-color="#8C948A"
          >
          </el-switch>
          <span class="hint_text">编辑</span>
        </div>
        <div class="command toggle_tools_box">
          <el-switch
            v-model="_isShowToolsBox"
            size="small"
            active-color="#13ce66"
            inactive-color="#8C948A"
          >
          </el-switch>
          <span class="hint_text">工具栏</span>
        </div>
        <ShareBox />
        <UserInfoBox />
      </div>
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
    },
    _isEditMode: {
      get() {
        return this.$store.state.isEditMode
      },
      set(value) {
        this.$store.commit('SET_IS_EDIT_MODE', value)
      }
    },
    _isShowToolsBox: {
      get() {
        return this.$store.state.isShowToolsBox
      },
      set(value) {
        this.$store.commit('SET_IS_SHOW_TOOLS_BOX', value)
      }
    },
    _isShowSideBox: {
      get() {
        return this.$store.state.isShowSideBox
      },
      set(value) {
        this.$store.commit('SET_IS_SHOW_SIDE_BOX', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header_box {
  height: $height-header !important;
  width: 100%;
  color: $color-logo;
  background-color: $color-side-bg;
  .container {
    /* height: 100%; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 15px;
    overflow: scroll;
    overflow-y: hidden;

    text-align: left;
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
  .command {
    display: flex;
    align-items: center;
    margin-right: 5px;
    .hint_text {
      margin-left: 3px;
      margin-top: 1px;
    }
  }
}
</style>
