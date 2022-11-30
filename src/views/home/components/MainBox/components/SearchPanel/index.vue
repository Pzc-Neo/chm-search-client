<template>
  <div class="search_panel">
    <div class="engine">
      <NeoFrame
        :url="engineUrl1"
        v-if="
          !searchType || (searchType && [1, 2, 3].includes(searchType.command))
        "
      />
      <NeoFrame
        :url="engineUrl2"
        v-if="searchType && [2, 3].includes(searchType.command)"
      />
      <NeoFrame
        :url="engineUrl3"
        v-if="searchType && [3].includes(searchType.command)"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NeoFrame from '@/components/NeoFrame'

export default {
  name: 'SearchPanel',
  components: {
    NeoFrame
  },
  props: {
    // 1: 单搜  2： 双搜  3：三搜
    type: {
      type: [Number, String],
      default: 2
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      searchType: (state) => state.searchType,
      searchValue: (state) => state.searchValue,
      searchEngine: (state) => state.searchEngine,
      engineList: (state) => state.engineList,
      defaultSearchEngine: (state) => state.defaultSearchEngine
    }),
    ...mapGetters({
      searchValueEncoded: 'searchValueEncoded'
    }),
    engineUrl1() {
      if (this.searchEngine?.engineId1) {
        const engine = this.engineList[this.searchEngine.engineId1]
        if (engine) {
          return engine.url + this.searchValueEncoded
        }
      }
      return this.defaultSearchEngine.url + this.searchValueEncoded
    },
    engineUrl2() {
      if (this.searchEngine?.engineId2) {
        const engine = this.engineList[this.searchEngine.engineId2]
        if (engine) {
          return engine.url + this.searchValueEncoded
        }
      }
      return this.defaultSearchEngine.url + this.searchValueEncoded
    },
    engineUrl3() {
      if (this.searchEngine?.engineId3) {
        const engine = this.engineList[this.searchEngine.engineId3]
        if (engine) {
          return engine.url + this.searchValueEncoded
        }
      }
      return this.defaultSearchEngine.url + this.searchValueEncoded
    }
  }
}
</script>

<style lang="scss" scoped>
.search_panel {
  width: 100%;
  height: 100%;
  .engine,
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    border-right: 1px solid $color-label-bg;
  }
  .engine {
    display: flex;
  }
}
</style>
