<template>
  <el-row class="website_group_list" :gutter="10">
    <div
      class="no_website_group"
      v-if="!websiteGroups || (websiteGroups && websiteGroups.length) === 0"
      description="没有网址"
    >
      <el-button type="primary" @click="addWebsiteGroup"
        >添加网址分组</el-button
      >
      <!-- <el-button type="primary" @click="copyDefaultWebsiteData"
        >拷贝默认数据</el-button
      > -->
    </div>
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
        class="website_group_wrapper"
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
  </el-row>
</template>

<script>
import draggable from 'vuedraggable'
import WebsiteGroup from './components/WebsiteGroup'
import { serverWebsiteGroupUpdateOrder } from '@/api/website'
import { getHomeData } from '@/util'
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
    addWebsiteGroup() {
      this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
        isShow: true,
        type: 'add'
      })
    },
    // copyDefaultWebsiteData() {

    // },
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
          getHomeData.call(this)
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
  .website_group_wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
  }
  .el-empty {
    height: 100%;
  }
  .no_website_group {
    padding: 25px;
  }
}
</style>
iv>
