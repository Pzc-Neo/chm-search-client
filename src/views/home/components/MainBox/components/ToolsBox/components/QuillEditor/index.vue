<template>
  <div class="quill_editor">
    <div class="title">临时记事本</div>
    <div ref="quillEditor" class="editor"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
export default {
  data() {
    return {
      quill: null
    }
  },
  mounted() {
    const tempNoteContentStr = localStorage.getItem('tempNoteContentStr')
    const contents = JSON.parse(tempNoteContentStr)
    this.quill = new Quill(this.$refs.quillEditor, {
      theme: 'snow'
    })
    this.quill.setContents(contents)
    this.quill.on('text-change', (delta, oldDelta, source) => {
      const contents = this.quill.getContents()
      const tempJsonStr = JSON.stringify(contents)
      localStorage.setItem('tempNoteContentStr', tempJsonStr)
    })
  }
}
</script>

<style></style>
