<template>
  <el-dialog
    class="hot_key_input_box"
    title="快捷键"
    :visible.sync="isShow"
    :append-to-body="true"
  >
    <div class="target_item" v-if="targetItem">
      <span class="type">{{ targetTypeMap[targetType] }}: </span>
      <span class="title">{{ targetItem.title }}</span>
    </div>
    <div
      class="input_box"
      ref="inputBox"
      :class="{ cursor: focus }"
      :style="$props.style"
      tabindex="0"
      @focus="handleFocus"
      @blur="focus = false"
      @keydown="handleKeydown"
    >
      <div class="title">快捷键：</div>
      <template v-if="list.length">
        <span v-for="(item, index) in list" :key="`${item.text}_${index}`"
          >{{ item.text }} <i @click="handleDeleteKey(index)"></i
        ></span>
      </template>
      <div v-else class="placeholder">{{ placeholder }}</div>
    </div>
    <div class="btns">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { serverEngineGroupUpdateHotkey } from '@/api/engine'
import { getHomeData } from '@/util'
const CODE_NUMBER = Array.from(
  {
    length: 10
  },
  (v, k) => `Digit${k + 1}`
)
const CODE_NUMPAD = Array.from(
  {
    length: 10
  },
  (v, k) => `Numpad${k + 1}`
)
const CODE_ABC = Array.from(
  {
    length: 26
  },
  (v, k) => `Key${String.fromCharCode(k + 65).toUpperCase()}`
)
const CODE_FN = Array.from(
  {
    length: 12
  },
  (v, k) => `F${k + 1}`
)
const CODE_CONTROL = [
  'Shift',
  'ShiftLeft',
  'ShiftRight',
  'Control',
  'ControlLeft',
  'ControlRight',
  'Alt',
  'AltLeft',
  'AltRight'
] // ShiftKey Control(Ctrl) Alt
export default {
  name: 'HotKeyInput',
  props: {
    // 默认绑定值
    // 传入 ['Ctrl+d'] 格式时会自动处理成 [{ text: 'Ctrl+d', controlKey: { altKey: false, ctrlKey: true, shiftKey: false, key: 'd', code: 'KeyD } }]
    // 校验函数 判断是否允许显示快捷键
    verify: {
      type: Function,
      default: () => true
    },
    // 无绑定时提示文字
    placeholder: {
      type: String,
      default: ''
    },
    // 限制最大数量
    max: {
      type: [String, Number],
      default: 1
    },
    // 快捷键使用范围
    range: {
      type: Array,
      default: () => ['NUMBER', 'NUMPAD', 'ABC', 'FN']
    }
  },
  data() {
    return {
      focus: false,
      list: [],
      keyRange: [],
      targetTypeMap: {
        engine: '搜索引擎',
        website: '网址'
      }
    }
  },
  computed: {
    isShow: {
      get() {
        return this.$store.state.hotKeyInputBoxData.isShow
      },
      set(newValue) {
        this.$store.commit('SET_HOT_KEY_INPUT_BOX_DATA', {
          isShow: newValue
        })
      }
    },
    hotkey: {
      get() {
        return this.$store.state.hotKeyInputBoxData.hotkey
      },
      set(newValue) {
        this.$store.commit('SET_HOT_KEY_INPUT_BOX_DATA', {
          hotkey: newValue
        })
      }
    },
    targetItem() {
      return this.$store.state.hotKeyInputBoxData?.target
    },
    targetType() {
      return this.$store.state.hotKeyInputBoxData?.type
    }
  },
  created() {
    this.list = this.convertHotkey(this.hotkey)
  },
  updated() {
    this.focusInpuBox()
  },
  watch: {
    // list: function (list) {
    //   if (list.length) this.focus = false
    //   // this.$emit('update:hotkey', this.list)
    //   this.$store.commit('SET_HOT_KEY_INPUT_BOX_DATA', {
    //     hotkey: this.list
    //   })
    // },
    isShow() {
      this.focusInpuBox()
    },
    hotkey: {
      handler: function (val) {
        this.list = this.convertHotkey(val)
      },
      immediate: true
    },
    range: {
      handler: function (val) {
        const keyRangeList = {
          NUMBER: CODE_NUMBER,
          NUMPAD: CODE_NUMPAD,
          ABC: CODE_ABC,
          FN: CODE_FN
        }
        val.forEach((item) => {
          this.keyRange = this.keyRange.concat(keyRangeList[item.toUpperCase()])
        })
      },
      immediate: true
    }
  },
  methods: {
    convertHotkey(hotkey) {
      if (!hotkey.length) return []
      const list = []
      hotkey.forEach((item) => {
        const arr = item.split('+')
        const controlKey = {
          altKey: arr.includes('Alt'),
          ctrlKey: arr.includes('Control'),
          shiftKey: arr.includes('Shift'),
          key: arr[arr.length - 1],
          code: `Key${arr[arr.length - 1].toUpperCase()}`
        }
        list.push({
          text: arr.reduce((text, item, i) => {
            if (i) text += '+'
            if (controlKey.key === item) text += item.toUpperCase()
            else text += item
            return text
          }, ''),
          controlKey
        })
      })
      return list
    },
    handleFocus() {
      if (!this.list.length) this.focus = true
    },
    handleDeleteKey(index) {
      this.list.splice(index, 1)
    },
    focusInpuBox() {
      if (this.$refs.inputBox) {
        this.$refs.inputBox.focus()
        this.$nextTick(() => {
          this.$refs.inputBox.focus()
        })
      }
    },
    handleKeydown(e) {
      const { altKey, ctrlKey, shiftKey, key, code } = e
      if (!CODE_CONTROL.includes(key)) {
        if (!this.keyRange.includes(code)) return
        let controlKey = ''
        ;[
          {
            key: altKey,
            text: 'Alt'
          },
          {
            key: ctrlKey,
            text: 'Ctrl'
          },
          {
            key: shiftKey,
            text: 'Shift'
          }
        ].forEach((curKey) => {
          if (curKey.key) {
            if (controlKey) controlKey += '+'
            controlKey += curKey.text
          }
        })
        if (key) {
          if (controlKey) controlKey += '+'
          controlKey += key.toUpperCase()
        }
        this.addHotkey({
          text: controlKey,
          controlKey: {
            altKey,
            ctrlKey,
            shiftKey,
            key,
            code
          }
        })
      }
      e.preventDefault()
    },
    addHotkey(data) {
      // if (
      //   this.list.length &&
      //   this.list.some((item) => data.text === item.text)
      // ) {
      //   console.log(1)
      //   return
      // }
      // if (
      //   this.list.length &&
      //   this.list.length.toString() === this.max.toString()
      // ) {
      //   console.log(2)
      //   return
      // }
      // this.list.push(data)
      this.list = [data]

      this.$store.commit('SET_HOT_KEY_INPUT_BOX_DATA', {
        hotkey: [data.text]
      })
    },
    handleCancel() {
      this.isShow = false
    },
    handleConfirm() {
      console.log(this.list, this.targetItem)
      const dataForServe = {
        id: this.targetItem.id,
        hotkey: this.list[0].text
      }

      serverEngineGroupUpdateHotkey(dataForServe).then((res) => {
        const { code, data } = res
        if (code === 0) {
          getHomeData.call(this)
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
      })
      this.isShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes Blink {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.hot_key_input_box {
  /* position: relative; */
  border-radius: 4px;
  /* background-color: #fff; */
  color: #333;
  /* width: 100%;
  height: 40px; */
  /* padding: 2px 0; */
  cursor: text;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  .target_item {
    margin-bottom: 15px;
    .title {
      margin-left: 5px;
    }
  }
  .input_box {
    display: flex;
    align-items: center;
    padding: 0 15px;
    border: 1px solid $color-side-border;
    .title {
      height: 2em;
      line-height: 2em;
    }
    &:focus {
      outline-color: $color-side-title-group;
      // border-color: #188cff;
      box-shadow: 0 0 4px rgba(24, 140, 255, 0.38);
    }
    &.cursor::after {
      content: '|';
      animation: Blink 1.2s ease 0s infinite;
      font-size: 18px;
      position: absolute;
      top: 2px;
      left: 12px;
    }
    span {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
      padding: 0 22px 0 8px;
      height: 28px;
      font-size: 13px;
      line-height: 28px;
      border-radius: 4px;
      margin: 5px;
      i {
        position: absolute;
        top: 6px;
        right: 4px;
        content: '';
        background: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M512 64C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64zm0 832c-212.08 0-384-171.92-384-384s171.92-384 384-384 384 171.92 384 384-171.92 384-384 384z' fill='%23909399'/%3E%3Cpath d='M625.14 353.61L512 466.75 398.86 353.61a32 32 0 0 0-45.25 45.25L466.75 512 353.61 625.14a32 32 0 0 0 45.25 45.25L512 557.25l113.14 113.14a32 32 0 0 0 45.25-45.25L557.25 512l113.14-113.14a32 32 0 0 0-45.25-45.25z' fill='%23909399'/%3E%3C/svg%3E")
          no-repeat center;
        background-size: contain;
        width: 14px;
        height: 14px;
        transform: scale(0.9);
        opacity: 0.6;
        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }
    .placeholder {
      position: absolute;
      top: 10px;
      left: 11px;
      color: #c0c4cc;
      font-size: 13px;
      text-indent: 4px;
      font: 400 13.3333px Arial;
    }
  }
  .btns {
    margin-top: 15px;
    width: 100%;
    text-align: right;
  }
}
</style>
