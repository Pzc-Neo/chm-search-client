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
        @click="handleSearch(history, index)"
      >
        <span class="word">
          {{ history }}
        </span>
        <!-- v-if="isShowDelete" -->
        <div class="delete" @click.stop="removeByIndex(index)">x</div>
      </div>
    </div>
    <div class="option_list">
      <span class="hint">搜索历史只保存在浏览器本地</span>
      <span class="option" @click="setQuantity">设置</span>
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
      historyLength: 30,
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
      const historyListStr = localStorage.getItem('historyList')
      const historyLength = localStorage.getItem('historyLength')
      if (historyLength) {
        this.historyLength = parseInt(historyLength)
      } else {
        this.historyLength = 30
        this.saveHistoryLength(this.historyLength)
      }
      if (historyListStr !== '') {
        let historyList = JSON.parse(historyListStr) || []
        historyList = Array.from(new Set(historyList))
        if (historyList.length > this.historyLength) {
          this.historyList = historyList.slice(0, this.historyLength)
        } else {
          this.historyList = historyList
        }
      }
    },
    saveHistoryLength(length) {
      localStorage.setItem('historyLength', length)
    },
    //
    moveToFirst(index) {
      const targetWord = this.historyList.splice(index, 1)
      if (targetWord.length === 1) {
        this.historyList.unshift(targetWord[0])
      }
      this.updateHistoryList()
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
        this.moveToFirst(index)
        return
      }

      if (this.historyList.length >= this.historyLength) {
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
    setQuantity() {
      this.$prompt('请输入保存的搜索历史数量', '设置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.historyLength,
        inputType: 'number',
        inputPlaceholder: '请输入保存的搜索历史数量'
      }).then(({ value }) => {
        if (value) {
          value = value > 0 ? value : 30
          this.historyList = this.historyList.slice(0, value)
          this.historyLength = value
          this.saveHistoryLength(value)
          this.updateHistoryList()
        }
      })
    },
    clearHistoryList() {
      this.$confirm('此操作将清空搜索历史，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.historyList = []
        this.updateHistoryList()
      })
    },
    handleSearch(word, index) {
      this.$emit('update:searchValueLocal', word)
      this.$store.commit('SET_MODE', 'search')
      this.$store.commit('SET_SEARCH_VALUE', word)
      this.isShow = false
      this.moveToFirst(index)
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
      display: none;
      position: absolute;
      right: -6px;
      top: -5px;
      border-radius: 50%;
      width: 1.1em;
      height: 1.1em;
      line-height: 1em;
      text-align: center;
      margin: auto;
      background: #f25a5a;
      color: white;
    }
    &:hover {
      top: -2px;
      .delete {
        display: block;
      }
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
    user-select: none;
    padding: 3px 5px;
    cursor: pointer;
  }
}
</style>
