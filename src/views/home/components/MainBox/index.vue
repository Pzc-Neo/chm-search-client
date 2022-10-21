<template>
  <div class="main_box">
    <!-- 网址列表 -->
    <WebsiteGroupList v-if="mode === 'website'" />
    <!-- 搜索 -->
    <div class="wrapper" v-if="mode === 'search'">
      <SearchPanel />
    </div>
    <!-- 新增、编辑网址 -->
    <EditWebsiteBox />
    <!-- 新增、编辑网址分组 -->
    <EditWebsiteGroupBox />
    <!-- 新增、编辑引擎 -->
    <EditEngineBox />
    <!-- 新增、编辑引擎分组 -->
    <EditEngineGroupBox />
  </div>
</template>

<script>
import WebsiteGroupList from './components/WebsiteGroupList'
import SearchPanel from './components/SearchPanel'
import EditWebsiteBox from './components/EditWebsiteBox'
import EditWebsiteGroupBox from './components/EditWebsiteGroupBox'
import EditEngineBox from './components/EditEngineBox'
import EditEngineGroupBox from './components/EditEngineGroupBox'
export default {
  name: 'MainBox',
  components: {
    WebsiteGroupList,
    SearchPanel,
    EditWebsiteBox,
    EditWebsiteGroupBox,
    EditEngineBox,
    EditEngineGroupBox
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
  }
}
</style>
