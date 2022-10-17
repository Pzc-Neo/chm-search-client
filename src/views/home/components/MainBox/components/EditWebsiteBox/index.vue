<template>
  <el-dialog :title="dialogTitle" :visible.sync="isShow" :append-to-body="true">
    <div class="new_website_box">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            ref="refTitle"
            v-model="form.title"
            autocomplete="off"
            @keyup.enter.native="handleConfirm"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            v-model="form.description"
            autocomplete="off"
            @keyup.enter.native="handleConfirm"
          ></el-input>
        </el-form-item>
        <el-form-item label="网址" :label-width="formLabelWidth">
          <el-input
            v-model="form.url"
            autocomplete="off"
            @keyup.enter.native="handleConfirm"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog_footer">
        <el-button @click="hideBox">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { serverWebsiteAdd, serverWebsiteUpdate } from '@/api/website'
import { getHomeData } from '@/util'

export default {
  name: 'EditWebsiteBox',
  data() {
    return {
      form: {
        title: '',
        description: '',
        url: ''
      },
      formDefault: {
        title: '',
        description: '',
        url: ''
      },
      formLabelWidth: '70px'
    }
  },
  watch: {
    isShow(newValue) {
      if (this.type === 'edit') {
        this.form = { ...this.websiteForContextmenu }
      } else {
        this.form = { ...this.formDefault }
      }
      this.$nextTick(() => {
        this.$refs.refTitle.focus()
      })
    }
  },
  computed: {
    type: {
      get() {
        return this.$store.state.editWebsiteBoxData.type
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
          type: newValue
        })
      }
    },
    websiteForContextmenu: {
      get() {
        return this.$store.state.editWebsiteBoxData.info
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
          info: newValue
        })
      }
    },
    isShow: {
      get() {
        return this.$store.state.editWebsiteBoxData.isShow
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
          isShow: newValue
        })
      }
    },
    dialogTitle() {
      if (this.type === 'add') {
        return '新增网址'
      } else if (this.type === 'edit') {
        return '编辑网址'
      } else {
        return '新增网址'
      }
    }
  },
  methods: {
    // 新建
    handleConfirm() {
      switch (this.type) {
        case 'add':
          this.websiteAdd()
          break
        case 'edit':
          this.websiteUpdate()
          break

        default:
          break
      }
    },
    websiteAdd() {
      const data = { ...this.form }
      data.groupId = this.$store.state.editWebsiteBoxData.groupId

      const loading = this.$loading({
        lock: true,
        text: '正在添加...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteAdd(data).then(async (res) => {
        const { code, data } = res
        loading.close()
        if (code === 0) {
          this.$message({
            message: data?.msg,
            type: 'success'
          })
          await getHomeData.call(this)
          this.hideBox()
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
      })
    },
    websiteUpdate() {
      const data = { ...this.form }
      data.id = this.websiteForContextmenu.id

      const loading = this.$loading({
        lock: true,
        text: '正在修改...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteUpdate(data).then(async (res) => {
        const { code, data } = res
        loading.close()
        if (code === 0) {
          this.$message({
            message: data?.msg,
            type: 'success'
          })
          await getHomeData.call(this)
          this.hideBox()
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
      this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
        isShow: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  width: 350px;
}
.new_website_box {
  .el-form {
    .el-form-item {
      :deep(.el-form-item__content) {
        width: 200px;
      }
    }
  }
  .dialog_footer {
    text-align: right;
  }
}
</style>
