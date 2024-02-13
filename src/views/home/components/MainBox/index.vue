<template>
  <div class="main_box">
    <!-- 搜索 -->
    <div class="wrapper">
      <div class="left">
        <!-- 网址列表 -->
        <WebsiteGroupList v-show="mode === 'website'" />
        <SearchPanel v-show="mode === 'search'" />
      </div>
      <div class="right tools_box" v-show="$store.state.isShowToolsBox">
        <ToolsBox />
      </div>
    </div>
    <!-- 新增、编辑网址 -->
    <EditWebsiteBox />
    <!-- 新增、编辑网址分组 -->
    <EditWebsiteGroupBox />
    <!-- 新增、编辑引擎 -->
    <EditEngineBox />
    <!-- 新增、编辑引擎分组 -->
    <EditEngineGroupBox />
    <!-- 新增、编辑标签 -->
    <EditTagBox />
  </div>
</template>

<script>
import WebsiteGroupList from './components/WebsiteGroupList'
import SearchPanel from './components/SearchPanel'
import ToolsBox from './components/ToolsBox'
import EditWebsiteBox from './components/EditWebsiteBox'
import EditWebsiteGroupBox from './components/EditWebsiteGroupBox'
import EditEngineBox from './components/EditEngineBox'
import EditEngineGroupBox from './components/EditEngineGroupBox'
import EditTagBox from './components/EditTagBox'
export default {
  name: 'MainBox',
  components: {
    WebsiteGroupList,
    SearchPanel,
    ToolsBox,
    EditWebsiteBox,
    EditWebsiteGroupBox,
    EditEngineBox,
    EditEngineGroupBox,
    EditTagBox
  },
  data() {
    return {}
  },
  computed: {
    // search: 搜索；website: 网址
    mode() {
      return this.$store.state.mode
    }
  }
}
</script>

<style lang="scss" scoped>
.main_box {
  width: 100%;
  height: 100%;
  text-align: left;
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    .left {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    .right {
      /* width: 300px; */
    }
  }
}
</style>
