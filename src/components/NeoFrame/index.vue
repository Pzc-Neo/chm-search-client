<template>
  <div class="neo_frame">
    <div class="tool_bar">
      <div class="tool" @click="openNew">
        <i class="el-icon-top-right"></i>
      </div>
    </div>
    <iframe :src="url" />
  </div>
</template>

<script>
export default {
  name: 'NeoFrame',
  props: {
    url: {
      type: String,
      default: '#'
    }
  },
  data() {
    return {}
  },
  methods: {
    openNew() {
      window.open(this.url)
    }
  }
}
</script>

<style lang="scss" scoped>
.neo_frame {
  position: relative;
  width: 100%;
  height: 100%;
  & > iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
  .tool_bar {
    position: absolute;
    top: 5px;
    left: 2px;
    display: flex;
    flex-direction: column;
    .tool {
      cursor: pointer;
    }
  }
}
</style>
