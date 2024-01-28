<template>
  <div class="side_box" v-show="$store.state.isShowSideBox">
    <div
      class="drag_line"
      :style="{ left: dragLineLeft }"
      @mousedown="startDragResize"
    />
    <div class="logo_container" :style="{ width: sideBarWidth }">
      <a href="/" class="name">{{
        parseInt(sideBarWidth) < 150 ? '城墨' : '城墨聚搜'
      }}</a>
      <i
        :class="[isSideBoxCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        @click="isSideBoxCollapse = !isSideBoxCollapse"
      ></i>
    </div>
    <NavBox :isCollapse="isCollapse" :style="{ width: sideBarWidth }"></NavBox>
  </div>
</template>

<script>
import NavBox from './components/NavBox'
export default {
  name: 'SideBox',
  components: {
    NavBox
  },
  data() {
    return {
      sideBarWidth: '200px'
    }
  },
  mounted() {
    this.sideBarWidth = localStorage.getItem('sideBarWidth') || '200px'
  },
  computed: {
    dragLineLeft() {
      // 3 是用来拖拽的边框(.drag_line)的宽度
      return parseInt(this.sideBarWidth) - 3 + 'px'
    },
    isCollapse() {
      return this.$store.state.isSideBoxCollapse
    },
    isSideBoxCollapse: {
      get() {
        return this.$store.state.isSideBoxCollapse
      },
      set(newValue) {
        this.$store.commit('SET_IS_SIDE_BOX_COLLAPSE', newValue)
      }
    }
  },
  methods: {
    startDragResize() {
      const userSelect = document.body.style.userSelect
      const handleMove = (e) => {
        document.body.style.userSelect = 'none'
        const left = e.clientX
        if (left < 100) {
          this.sideBarWidth = '100px'
        } else {
          this.sideBarWidth = left + 'px'
        }
      }
      const handleUp = () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
        document.body.style.userSelect = userSelect
        localStorage.setItem('sideBarWidth', this.sideBarWidth)
      }
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)
    }
  }
}
</script>

<style lang="scss" scoped>
.side_box {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: $color-side-title;
  background-color: $color-side-bg;
  flex-shrink: 0;
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
  .logo_container {
    width: 100%;
    height: $height-header;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
    color: $color-logo;
    a {
      color: $color-logo;
    }
    i {
      margin-left: 5px;
      font-size: 32px;
      cursor: pointer;
    }
  }
  .site {
    flex: 1;
  }
}
</style>
