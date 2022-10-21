<template>
  <div class="search_engine_selector">
    <el-dropdown
      @click="handleClick"
      @command="handleMenuClick"
      size="small"
      trigger="click"
    >
      <el-button type="default" size="small" plain>
        {{ currentEngine.title
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>

      <el-dropdown-menu slot="dropdown" size="small">
        <el-dropdown-item
          v-for="engine in engineList"
          :key="engine.id"
          :command="engine.id"
          >{{ engine.title }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'SearchEngineSelector',
  props: {
    engineKey: {
      type: String,
      require: true
    },
    currentId: {
      type: [String, Number],
      default: 0
    },
    engineList: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    currentEngine() {
      const engine = this.engineList[this.currentId]
      if (engine) {
        return engine
      }
      return this.$store.state.defaultSearchEngine
    }
  },
  methods: {
    handleClick() {
      if (this.currentId) {
        window.open(this.currentId.url)
      }
    },
    handleMenuClick(engineId) {
      this.$emit('update:currentId', engineId)
      this.$store.commit('SET_SEARCH_ENGINE', {
        engineKey: this.engineKey,
        engineId
      })
    }
  }
}
</script>

<style></style>
