<template>
  <draggable
    tag="div"
    class="website_list"
    v-model="websiteList"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <transition-group
      type="transition"
      :name="!drag ? 'flip-websites' : null"
      class="website_group"
      ref="websiteGroup"
    >
      <a
        class="website"
        ref="website"
        target="_blank"
        v-for="website in websiteList"
        :href="website.url"
        :key="website.id"
        @contextmenu.prevent="showContextmenu($event, website.id)"
      >
        <div class="title">
          {{ website.title }}
        </div>
        <div class="description">
          {{ website.description }}
        </div>
      </a>
    </transition-group>
    <el-dialog
      title="新增网址"
      :visible.sync="isShowDialog"
      :append-to-body="true"
    >
      <NewWebsiteBox :is-show.sync="isShowDialog" />
      <!-- <NewWebsiteBox /> -->
    </el-dialog>
  </draggable>

  <!-- <rawDisplayer class="col-3" :value="websites" title="List" /> -->
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import draggable from 'vuedraggable'
import NewWebsiteBox from './components/NewWebsiteBox'
export default {
  name: 'WebsiteBox',
  display: 'Transitions',
  order: 7,
  components: {
    draggable,
    NewWebsiteBox
  },
  model: {
    prop: 'websites',
    change: 'update'
  },
  props: {
    websites: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      websiteList: [],
      drag: false,
      isShowDialog: false,
      menuList: menuListFactory.call(this, 'website')
    }
  },
  methods: {
    // sort() {
    //   this.websites = this.websites.sort((a, b) => a.order - b.order)
    // }
    // 显示右键菜单
    showContextmenu(event, websiteId) {
      let target = event.target
      if (target === this.$refs.websiteGroup) {
        this.showBarMenu(event)
      } else {
        while (target !== this.$refs.websiteGroup) {
          if (target.tagName.toLowerCase() === 'a') {
            this.showItemMenu(event, websiteId)
            break
          }
          target = target.parentNode
        }
      }
    },
    showBarMenu(event) {
      const param = {
        event,
        targetItem: {},
        menuList: this.menuListBar
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    },
    showItemMenu(event, targetItemId) {
      const index = this.websites.findIndex((item) => {
        return item.id === targetItemId
      })
      const param = {
        event,
        targetItem: this.websites[index],
        menuList: this.menuList
      }
      this.$store.commit('SHOW_CONTEXTMENU', param)
    }
  },
  created() {
    this.websiteList = this.websites
  },
  watch: {
    websites(newValue) {
      this.websiteList = newValue
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  width: 350px;
}
.website_list {
  .website_group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .website {
      position: relative;
      top: 0px;
      min-width: 200px;
      border-radius: 5px;
      margin: 8px 5px;
      margin-bottom: 0;
      padding: 10px;
      border: 1px solid $color-label-border;
      background-color: $color-label-bg;
      transition: all 0.3s ease-in-out;
      &:hover {
        top: -5px;
      }
      .title {
        font-size: 14px;
        font-weight: 700;
        color: $color-label-title;
      }
      .description {
        padding-top: 5px;
        font-size: 0.8em;
        color: $color-label-subtitle;
      }
    }
  }
}
</style>
