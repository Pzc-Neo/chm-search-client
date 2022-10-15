<template>
  <div class="new_website_box">
    <el-form :model="form">
      <el-form-item label="标题" :label-width="formLabelWidth">
        <el-input
          ref="refName"
          v-model="form.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="网址" :label-width="formLabelWidth">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog_footer">
      <el-button @click="hideBox">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { serverWebsiteAdd } from '@/api/website'
import { getHomeData } from '@/util'

export default {
  name: 'NewWebsiteBox',
  data() {
    return {
      form: {
        title: '',
        description: '',
        url: ''
      },
      formLabelWidth: '70px'
    }
  },
  methods: {
    // 新建
    handleConfirm() {
      const data = { ...this.form }
      data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id

      const loading = this.$loading({
        lock: true,
        text: '正在添加...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteAdd(data).then(async (res) => {
        const { code, data } = res
        if (code === 0) {
          this.$message({
            message: data?.msg,
            type: 'success'
          })
          await getHomeData.call(this)
          this.hideBox()
          loading.close()
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
      })
    },
    // 关闭面板
    hideBox() {
      this.$emit('update:is-show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.new_website_box {
  .el-form {
    .el-form-item {
      ::v-deep .el-form-item__content {
        width: 200px;
      }
    }
  }
  .dialog_footer {
    text-align: right;
  }
}
</style>
