<template>
  <div class="tools_box" :style="{ width: toolsBoxWidth }">
    <div
      class="drag_line"
      :style="{ right: dragLineLeft }"
      @mousedown="startDragResize"
    />
    <div class="tool_container">
      <QuillEditor />
    </div>
  </div>
</template>

<script>
import QuillEditor from './components/QuillEditor'
export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      toolsBoxWidth: '200px'
    }
  },
  mounted() {
    this.toolsBoxWidth =
      localStorage.getItem('toolsBoxWidth') || this.toolsBoxWidth
  },
  methods: {
    startDragResize() {
      const userSelect = document.body.style.userSelect
      const handleMove = (e) => {
        document.body.style.userSelect = 'none'
        const clienWidth = document.body.clientWidth
        const left = clienWidth - e.clientX
        if (left < 100) {
          this.toolsBoxWidth = '100px'
        } else {
          this.toolsBoxWidth = left + 'px'
        }
      }
      const handleUp = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
        document.body.style.userSelect = userSelect
        localStorage.setItem('toolsBoxWidth', this.toolsBoxWidth)
      }
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)
    }
  },
  computed: {
    dragLineLeft() {
      // 3 是用来拖拽的边框(.drag_line)的宽度
      return parseInt(this.toolsBoxWidth) + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
.tools_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f2f4f3;
  .drag_line {
    position: absolute;
    top: 0;
    height: 100%;
    width: 3px;
    z-index: 1;
    cursor: col-resize;
    &:hover {
      /* background: #487384; */
      background: #74cfa3;
    }
  }
  .tool_container {
    flex: 1;
    display: flex;
    flex-direction: column;
    :deep(.title) {
      padding: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      background: #1ab37d;
    }
  }
}
</style>
