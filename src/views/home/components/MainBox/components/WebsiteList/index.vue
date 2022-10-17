<template>
  <div class="website_list">
    <draggable
      tag="div"
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
          @contextmenu.prevent.stop="showContextmenu($event, website)"
        >
          <div class="title">
            {{ website.title }}
          </div>
          <div class="description">
            {{ website.description }}
          </div>
        </a>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { menuListFactory } from '@/views/home/menuList'
import draggable from 'vuedraggable'
export default {
  name: 'WebsiteBox',
  display: 'Transitions',
  order: 7,
  components: {
    draggable
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
      drag: false
    }
  },
  methods: {
    // 显示右键菜单
    showContextmenu(event, website) {
      this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
        groupId: website.group_id,
        info: website
      })

      const param = {
        event,
        targetItem: website,
        menuList: menuListFactory.call(this, 'website')
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
.website_list {
  .website_group {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    .website {
      position: relative;
      top: 0px;
      width: 200px;
      border-radius: 5px;
      margin: 8px 5px;
      margin-bottom: 0;
      padding: 12px;
      padding-bottom: 9px;
      border: 1px solid $color-label-border;
      background-color: $color-label-bg;
      transition: all 0.3s ease-in-out;
      &:hover {
        top: -5px;
      }
      .title {
        font-size: 13px;
        font-weight: 700;
        color: $color-label-title;
      }
      .description {
        padding-top: 6px;
        font-size: 0.5em;
        color: $color-label-subtitle;
        // 文字溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
