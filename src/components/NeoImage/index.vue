<template>
  <img
    class="neo_image"
    :src="favicon"
    onerror="this.src='/favicon.ico';this.onerror=null;"
  />
</template>

<script>
export default {
  name: 'NeoImage',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    favicon() {
      const aDom = document.createElement('a')
      aDom.href = this.src
      return `http://${aDom.hostname}/favicon.ico`
    }
  }
}
</script>

<style lang="scss" scoped>
.neo_image{
  height: 100%;
  border-radius: 3px;
}

</style>
