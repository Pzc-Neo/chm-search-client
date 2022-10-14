<template>
  <div class="website_group">
    <div class="title">
      {{ websiteGroup.title }}
    </div>
    <WebsiteList :websites="websiteGroup.websites"></WebsiteList>
  </div>
</template>

<script>
import WebsiteList from '../WebsiteList'
export default {
  name: 'WebsiteGroup',
  components: {
    WebsiteList
  },
  props: {
    websiteGroup: {
      type: Object,
      default() {
        return {
          title: '默认标题'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.website_group {
  display: flex;
  flex-direction: column;
  padding: 20px;
  .title {
    margin-left: 6px;
  }
}
</style>
