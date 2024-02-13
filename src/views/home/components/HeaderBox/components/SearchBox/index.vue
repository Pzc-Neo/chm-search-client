<template>
  <div class="search_box">
    <el-autocomplete
      class="inline-input"
      size="small"
      autofocus
      v-model="searchValueLocal"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      ref="inputBox"
      :style="{ width: searchBoxWidth }"
      @keyup.enter.native="handleSearch"
      @blur="handleOnBlur"
      @select="handleSelect"
    >
      <i
        class="icon_clear el-icon-delete el-input__icon"
        slot="suffix"
        @click="clearInputValue"
      >
      </i>
      <!-- @change="handleSearch" -->
      <!-- @blur="hideSuggestionBox" -->
      <template slot="prepend">
        <HistoryBox
          class="history_btn"
          ref="historyBox"
          :searchValueLocal.sync="searchValueLocal"
        />
      </template>
      <template slot="append">
        <AppendBox
          class="history_btn"
          ref="historyBox"
          :searchValueLocal.sync="searchValueLocal"
        />
      </template>
    </el-autocomplete>
    <!-- @select="handleSelect" -->
    <!-- 选择搜索类型 -->
    <el-dropdown
      split-button
      type="primary"
      size="small"
      trigger="click"
      @click="handleSearch"
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
import AppendBox from './components/AppendBox'
import HistoryBox from './components/HistoryBox'
export default {
  data() {
    return {
      searchValueLocal: '',
      restaurants: [],
      state1: '',
      state2: ''
    }
  },
  components: {
    SearchEngineSelector,
    AppendBox,
    HistoryBox
  },
  created() {
    this.setSearchType()
    // 左侧搜索引擎栏的引擎被点击时，设置全局的搜索值
    // 不然按快捷键使用搜索引擎的时候，搜索内容可能会是空的
    this.$bus.$on('engine-click', () => {
      this.$store.commit('SET_SEARCH_VALUE', this.searchValueLocal)
    })
    this.$bus.$on('hotkey-press', () => {
      this.hideSuggestionBox()
    })
  },
  mounted() {
    // 设置搜索关键词
    if (this.$route.query.w) {
      this.searchValueLocal = this.$route.query.w
      this.handleSearch()
      // this.$store.commit('SET_SEARCH_VALUE', this.$route.query.w)
    }
  },
  computed: {
    ...mapState({
      // 搜索类型
      searchType: (state) => state.searchType,
      searchTypeList: (state) => state.searchTypeList,
      searchEngine: (state) => state.searchEngine,
      engineList: (state) => state.engineList
    }),
    searchBoxWidth() {
      // 汉字用两个字母代替
      const letterCount = this.searchValueLocal.replace(
        /[\u4e00-\u9fa5]/g,
        'aa'
      ).length
      // 15是字体大小, 用以下公式能大概计算字符串的宽度
      let width = (letterCount * 15) / 2 + 50 + 50
      width = Math.min(Math.max(width, 180), 500)
      return width + 'px'
    },
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
      // jsonp回掉函数
      window.suggestionCb = function (res) {
        let resultList = res.s || []
        resultList = resultList.map((word) => {
          return { value: word }
        })
        cb(resultList || [])
      }
      // 通过jsonp获取搜索建议
      // 获取搜索建议的链接(用百度的api)
      const url = `https://suggestion.baidu.com/su?wd=${encodeURIComponent(
        queryString
      )}&cb=window.suggestionCb`
      // this.$jsonp(url, {})
      const script = document.createElement('script')
      script.src = url
      // 将创建的新节点添加到BOM树上
      document.getElementsByTagName('body')[0].appendChild(script)
      script.remove()
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    setSearchType(command) {
      if (!command) {
        command = 0
      }

      const searchType = this.searchTypeList[command]
      if (searchType) {
        this.$store.commit('SET_SEARCH_TYPE', searchType)
      }
    },
    handleSelect(item) {
      this.searchValueLocal = item.value
      this.handleSearch()
    },
    setSearchValueLocal(value) {
      this.searchValueLocal = value
      this.$bus.$emit('search', value)
      this.$store.commit('SET_SEARCH_VALUE', value)
    },
    handleSearch() {
      this.setSearchValueLocal(this.searchValueLocal)
      this.$refs.inputBox.activated = false
      this.$store.commit('SET_MODE', 'search')
    },
    clearInputValue() {
      this.setSearchValueLocal('')
      this.$refs.inputBox.focus()
    },
    handleOnBlur() {
      // 添加搜索词到搜索列表
      if (this.$refs?.historyBox?.addToHistoryList) {
        this.$refs.historyBox.addToHistoryList(this.searchValueLocal)
      }
      this.$store.commit('SET_SEARCH_VALUE', this.searchValueLocal)
    },
    hideSuggestionBox() {
      if (this.$refs.inputBox) {
        // 隐藏搜索建议
        this.$refs.inputBox.activated = false
      }
    },
    handleMenuClick(command) {
      this.setSearchType(command - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.history_list {
  display: flex;
  flex-wrap: wrap;
}
.search_box {
  display: flex;
  .el-dropdown,
  .search_engine_selector {
    margin-left: 3px;
    :deep(.el-button--primary) {
      color: $color-main;
      background-color: $color-side-title-group;
      border-color: $color-side-title-group;
    }
  }
  .input_box_append {
    display: flex;
  }

  .history_btn {
    border: 0;
  }
  .icon_clear {
    margin-right: 14px;
  }
}
:deep(.el-input-group__prepend) {
  padding: 0px 8px;
  .el-button {
    margin: -10px -10px;
    padding: 9px 10px;
  }
}
:deep(.el-input-group__append) {
  padding: 0px 8px;
  .el-button {
    margin: -10px -26px;
    padding: 9px 10px;
  }
}
:deep(.el-dropdown-menu__item:not(.is-disabled)):hover {
  color: $color-main m !important;
  background-color: $color-side-title-group !important;
}
:deep(.el-dropdown) {
  .el-button-group {
    display: flex !important;
  }
}
</style>
