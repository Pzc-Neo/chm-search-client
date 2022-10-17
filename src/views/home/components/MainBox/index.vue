<template>
  <div class="main_box">
    <!-- 网址列表 -->
    <div class="wrapper" v-if="mode === 'website'">
      <el-empty v-if="!websiteGroups" description="没有网址"></el-empty>
      <WebsiteGroup
        v-else
        v-for="websiteGroup in websiteGroups"
        :websiteGroup="websiteGroup"
        :key="websiteGroup.id"
      />
    </div>
    <!-- 搜索 -->
    <div class="wrapper" v-if="mode === 'search'">
      <SearchPanel />
    </div>
    <!-- 新增、编辑网址 -->
    <EditWebsiteBox />
    <!-- 新增、编辑网址分组 -->
    <EditWebsiteGroupBox />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WebsiteGroup from './components/WebsiteGroup'
import SearchPanel from './components/SearchPanel'
import EditWebsiteBox from './components/EditWebsiteBox'
import EditWebsiteGroupBox from './components/EditWebsiteGroupBox'
export default {
  name: 'MainBox',
  components: {
    WebsiteGroup,
    SearchPanel,
    EditWebsiteBox,
    EditWebsiteGroupBox
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      websiteGroups: (state) => state.websiteGroups
    }),
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
    .el-empty {
      height: 100%;
    }
  }
}
</style>
