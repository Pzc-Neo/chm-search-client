<template>
  <div class="main_box">
    <!-- 网址列表 -->
    <div class="wrapper" v-if="mode === 'website'">
      <WebsiteGroup
        v-for="websiteGroup in websiteGroups"
        :websiteGroup="websiteGroup"
        :key="websiteGroup.id"
      />
    </div>
    <!-- 搜索 -->
    <div class="wrapper" v-if="mode === 'search'">
      <SearchPanel />
    </div>
  </div>
</template>

<script>
import WebsiteGroup from './components/WebsiteGroup'
import SearchPanel from './components/SearchPanel'
export default {
  name: 'MainBox',
  components: {
    WebsiteGroup,
    SearchPanel
  },
  data() {
    return {
      websiteGroups: [
        {
          title: '分组01',
          websites: [
            {
              id: '01',
              title: '分组1',
              description: '描述描述描述描述描述',
              url: 'https://www.baidu.com'
            },
            {
              id: '02',
              title: '分组2',
              description: '描述描述描述描述描述',
              url: 'https://www.baidu.com'
            }
          ]
        },
        {
          title: '分组02',
          websites: [
            {
              id: '01',
              title: '分组1',
              description: '描述描述描述描述描述',
              url: 'https://www.baidu.com'
            },
            {
              id: '02',
              title: '分组2',
              description: '描述描述描述描述描述',
              url: 'https://www.baidu.com'
            },
            {
              id: '03',
              title: '分组3',
              description: '描述描述描述描述描述',
              url: 'https://www.baidu.com'
            },
            {
              id: '04',
              title: '分组4',
              description: '描述描述描述描述描述',
              url: 'https://www.baidu.com'
            }
          ]
        }
      ]
    }
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
