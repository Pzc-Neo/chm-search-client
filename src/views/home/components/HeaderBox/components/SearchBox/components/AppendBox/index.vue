<template>
  <el-popover
    class="append_box"
    placement="bottom"
    width="300"
    trigger="click"
    v-model="isShow"
  >
    <div class="append_list">
      <div
        class="append"
        v-for="(append, index) in appendList"
        :key="index"
        @click="handleSearch(append, index)"
      >
        <span class="word">
          {{ append }}
        </span>
        <!-- v-if="isShowDelete" -->
        <div class="delete" @click.stop="removeByIndex(index)">x</div>
      </div>
    </div>
    <div class="option_list">
      <div class="append_word">
        <el-input size="mini" v-model="appendValue">
          <template slot="append">
            <el-button size="mini" @click="appendToList">添加</el-button>
          </template>
        </el-input>
      </div>
      <span class="option" @click="setQuantity">设置</span>
      <span class="option" @click="clearAppendList">清空</span>
    </div>
    <el-button
      class="append_btn"
      size="small"
      slot="reference"
      icon="el-icon-caret-right"
    ></el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'AppendBox',
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
      appendLength: 30,
      appendList: ['test', '123'],
      appendValue: ''
    }
  },
  mounted() {
    this.getAppendList()
  },
  methods: {
    getAppendList() {
      const appendListStr = localStorage.getItem('appendList')
      const appendLength = localStorage.getItem('appendLength')
      if (appendLength) {
        this.appendLength = parseInt(appendLength)
      } else {
        this.appendLength = 30
        this.saveAppendLength(this.appendLength)
      }
      if (appendListStr !== '') {
        let appendList = JSON.parse(appendListStr) || []
        appendList = Array.from(new Set(appendList))
        if (appendList.length > this.appendLength) {
          this.appendList = appendList.slice(0, this.appendLength)
        } else {
          this.appendList = appendList
        }
      }
    },
    saveAppendLength(length) {
      localStorage.setItem('appendLength', length)
    },
    //
    moveToFirst(index) {
      const targetWord = this.appendList.splice(index, 1)
      if (targetWord.length === 1) {
        this.appendList.unshift(targetWord[0])
      }
      this.updateAppendList()
    },
    addToAppendList(word) {
      if (!word && word.trim() === '') {
        return
      }

      // 如果已存在于列表中，就把目标搜索词移动到第一位
      const index = this.appendList.findIndex((append) => {
        return append === word
      })
      if (index !== -1) {
        this.moveToFirst(index)
        return
      }

      if (this.appendList.length >= this.appendLength) {
        this.appendList.pop()
      }
      this.appendList.unshift(word)

      this.updateAppendList()
    },
    appendToList() {
      this.addToAppendList(this.appendValue)
      this.appendValue = ''
    },
    updateAppendList(appendList) {
      if (appendList === undefined) {
        appendList = JSON.stringify(this.appendList)
      }
      localStorage.setItem('appendList', appendList)
    },
    removeByIndex(index) {
      this.appendList.splice(index, 1)
      this.updateAppendList()
    },
    setQuantity() {
      this.$prompt('请输入保存的添加词列表数量', '设置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.appendLength,
        inputType: 'number',
        inputPlaceholder: '请输入保存的添加词列表数量'
      }).then(({ value }) => {
        if (value) {
          value = value > 0 ? value : 30
          this.appendList = this.appendList.slice(0, value)
          this.appendLength = value
          this.saveAppendLength(value)
          this.updateAppendList()
        }
      })
    },
    clearAppendList() {
      this.$confirm('此操作将清空添加词列表，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.appendList = []
        this.updateAppendList()
      })
    },
    handleSearch(word, index) {
      const value = this.searchValueLocal + ' ' + word
      this.$emit('update:searchValueLocal', value)
      this.$store.commit('SET_MODE', 'search')
      this.$store.commit('SET_SEARCH_VALUE', value)
      this.isShow = false
      this.moveToFirst(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.append_list {
  display: flex;
  flex-wrap: wrap;
  .append {
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
  justify-content: space-between;
  align-items: center;
  .append_word {
    width: 180px;
  }
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
