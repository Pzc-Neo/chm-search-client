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
    >
      <a
        class="website"
        target="_blank"
        v-for="website in websiteList"
        :href="website.url"
        :key="website.id"
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

  <!-- <rawDisplayer class="col-3" :value="websites" title="List" /> -->
</template>

<script>
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
    // sort() {
    //   this.websites = this.websites.sort((a, b) => a.order - b.order)
    // }
  },
  created() {
    this.websiteList = this.websites
  },
  watch: {
    websites() {
      this.websitesList = this.websites
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
