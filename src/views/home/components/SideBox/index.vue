<template>
  <div class="side_box">
    <a href="/" class="logo_container">
      <div class="logo" v-if="!isCollapse">
        <div class="name">城墨聚搜</div>
        <div class="version">v1.0</div>
      </div>
      <div class="logo collapse" v-else>
        <div class="name">城墨</div>
      </div>
    </a>
    <NavBox :isCollapse="isCollapse"></NavBox>
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
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1'
                },
                {
                  id: 12,
                  label: '三级 3-2-2'
                },
                {
                  id: 13,
                  label: '三级 3-2-3'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.isSideBoxCollapse
    }
  },
  methods: {
    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
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
  .logo_container {
    width: 100%;
    height: $height-header;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-side-title;
    .logo {
      display: flex;
      align-items: baseline;
      .name {
        font-size: 25px;
        font-weight: 700;
      }
      .version {
        margin-left: 5px;
      }
    }
  }
  .site {
    flex: 1;
  }
}
</style>
