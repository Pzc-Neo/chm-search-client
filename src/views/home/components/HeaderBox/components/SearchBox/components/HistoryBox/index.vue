<template>
  <el-popover
    class="history_box"
    placement="bottom"
    width="300"
    trigger="click"
    v-model="isShow"
  >
    <div class="history_list">
      <div
        class="history"
        v-for="(history, index) in historyList"
        :key="index"
        @click="handleSearch(history)"
      >
        <span class="word">
          {{ history }}
        </span>
        <span
          v-if="isShowDelete"
          class="delete"
          @click.stop="removeByIndex(index)"
          >x</span
        >
      </div>
    </div>
    <div class="option_list">
      <span class="hint">搜索历史保存在浏览器本地</span>
      <span class="option" @click="isShowDelete = !isShowDelete">管理</span>
      <span class="option" @click="clearHistoryList">清空</span>
    </div>
    <el-button
      class="history_btn"
      size="small"
      slot="reference"
      icon="el-icon-time"
    ></el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'HistoryBox',
  props: {
    searchValueLocal: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShow: false,
      isShowDelete: false,
      historyList: ['test', '123']
    }
  },
  mounted() {
    this.$bus.$on('search', (searchValueLocal) => {
      this.addToHistoryList(searchValueLocal)
      this.isShow = false
    })
    this.getHistoryList()
  },
  methods: {
    getHistoryList() {
      const historyList = localStorage.getItem('historyList')
      if (historyList !== '') {
        this.historyList = JSON.parse(historyList) || []
      }
    },
    addToHistoryList(word) {
      if (!word && word.trim() === '') {
        return
      }

      // 如果已存在于列表中，就把目标搜索词移动到第一位
      const index = this.historyList.findIndex((history) => {
        return history === word
      })
      if (index !== -1) {
        const targetWord = this.historyList.splice(index, 1)
        if (targetWord.length === 1) {
          this.historyList.unshift(targetWord[0])
        }
        this.updateHistoryList()
        return
      }

      if (this.historyList.length > 10) {
        this.historyList.pop()
      }
      this.historyList.unshift(word)

      this.updateHistoryList()
    },
    updateHistoryList(historyList) {
      if (historyList === undefined) {
        historyList = JSON.stringify(this.historyList)
      }
      localStorage.setItem('historyList', historyList)
    },
    removeByIndex(index) {
      this.historyList.splice(index, 1)
      this.updateHistoryList()
    },
    clearHistoryList() {
      this.historyList = []
      this.updateHistoryList()
    },
    handleSearch(word) {
      this.$emit('update:searchValueLocal', word)
      this.$store.commit('SET_MODE', 'search')
      this.$store.commit('SET_SEARCH_VALUE', word)
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.history_list {
  display: flex;
  flex-wrap: wrap;
  .history {
    position: relative;
    top: 0;
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 4px 8px;
    border-radius: 8px;
    background-color: #f3f3f3;
    transition: top 0.3s ease-in-out;
    cursor: pointer;
    .delete {
      padding: 3px;
    }
    &:hover {
      top: -2px;
    }
  }
}
.option_list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  span {
    margin-right: 3px;
  }
  .hint {
    font-size: 12px;
    color: #a5a5a5;
  }

  .option {
    padding: 3px 5px;
    cursor: pointer;
  }
}
</style>
