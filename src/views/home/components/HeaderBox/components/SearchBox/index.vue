<template>
  <div class="search_box">
    <el-autocomplete
      class="inline-input"
      size="small"
      v-model="searchValue"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
      @change="handleSearch"
    ></el-autocomplete>
    <el-dropdown
      split-button
      type="primary"
      size="small"
      trigger="click"
      @click="handleClick"
      @command="handleMenuClick"
    >
      {{ searchType && searchType.title }}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(menu, index) in searchTypeList"
          :key="index"
          :command="menu.command"
          >{{ menu.title }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <SearchEngineSelector
      v-if="[1, 2, 3].includes(searchType.command)"
      :current-id="searchEngine.engineId1"
      :engineList="engineList"
      engine-key="engineId1"
    />
    <SearchEngineSelector
      v-if="[2, 3].includes(searchType.command)"
      :current-id="searchEngine.engineId2"
      :engineList="engineList"
      engine-key="engineId2"
    />
    <SearchEngineSelector
      v-if="[3].includes(searchType.command)"
      :current-id="searchEngine.engineId3"
      :engineList="engineList"
      engine-key="engineId3"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SearchEngineSelector from './components/SearchEngineSelector'
export default {
  data() {
    return {
      restaurants: [],
      state1: '',
      state2: ''
    }
  },
  components: {
    SearchEngineSelector
  },
  created() {
    this.setSearchType()
  },
  computed: {
    ...mapState({
      // 搜索类型
      searchType: (state) => state.searchType,
      searchTypeList: (state) => state.searchTypeList,
      searchEngine: (state) => state.searchEngine,
      engineList: (state) => state.engineList
    }),
    // 搜索值
    searchValue: {
      get() {
        return this.$store.state.searchValue
      },
      set(newValue) {
        this.$store.commit('SET_SEARCH_VALUE', newValue)
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号'
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113'
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101'
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号'
        }
      ]
    },
    setSearchType(command) {
      if (!command) {
        command = 0
      }

      const searchType = this.searchTypeList[command]
      console.log(command, searchType)
      if (searchType) {
        this.$store.commit('SET_SEARCH_TYPE', searchType)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    handleSearch() {
      this.$store.commit('SET_MODE', 'search')
    },
    handleClick(e) {
      this.$store.commit('SET_MODE', 'search')
    },
    handleMenuClick(command) {
      console.log('123')
      this.setSearchType(command - 1)
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>

<style lang="scss" scoped>
.search_box {
  display: flex;
  .el-dropdown,
  .search_engine_selector {
    margin-left: 3px;
  }
}
</style>
