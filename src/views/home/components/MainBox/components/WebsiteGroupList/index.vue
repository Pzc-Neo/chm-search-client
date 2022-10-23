<template>
  <div class="website_group_list">
    <el-empty v-if="!websiteGroups" description="没有网址"></el-empty>
    <draggable
      v-else
      tag="div"
      v-model="websiteGroupList"
      v-bind="dragOptions"
      @start="drag = true"
      @end="handleDragEnd"
    >
      <transition-group
        type="transition"
        :name="!drag ? 'flip-websites' : null"
        class="website_group"
        ref="websiteGroup"
      >
        <WebsiteGroup
          v-for="(websiteGroup, index) in websiteGroupList"
          :websiteGroup="websiteGroup"
          :websiteGroups="websiteGroupList"
          :index="index"
          :key="websiteGroup.id"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import WebsiteGroup from './components/WebsiteGroup'
import { serverWebsiteGroupUpdateOrder } from '@/api/website'
export default {
  name: 'WebsiteGroupList',
  components: {
    draggable,
    WebsiteGroup
  },
  data() {
    return {
      drag: false
    }
  },
  computed: {
    websiteGroups() {
      return this.$store.state.websiteGroups
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'website_group_list',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  },
  created() {
    this.websiteGroupList = this.websiteGroups
  },
  watch: {
    websiteGroups(newValue) {
      this.websiteGroupList = newValue
    }
  },
  methods: {
    handleDragEnd() {
      this.drag = false

      // 要更新的数据
      const updates = []
      this.websiteGroupList.map((websiteGroup, index) => {
        if (websiteGroup.order !== index) {
          const update = {
            id: websiteGroup.id,
            order: index
          }
          updates.push(update)
        }
        return (websiteGroup.order = index)
      })
      if (updates.length === 0) {
        this.$message({
          message: '排序没有改变',
          type: 'info'
        })
        return
      }
      const dataForServer = {
        groupId: this.websiteGroupList[0].group_id,
        updates
      }
      serverWebsiteGroupUpdateOrder(dataForServer).then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.$message({
            message: data.msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: data.msg,
            type: 'error',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.website_group_list {
  width: 100%;
  height: 100%;
  overflow: auto;
  .el-empty {
    height: 100%;
  }
}
</style>
