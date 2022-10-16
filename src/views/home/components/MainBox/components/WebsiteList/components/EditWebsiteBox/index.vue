<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="_isShow"
    :append-to-body="true"
  >
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
  </el-dialog>
</template>

<script>
import { serverWebsiteAdd, serverWebsiteUpdate } from '@/api/website'
import { getHomeData } from '@/util'

export default {
  name: 'EditWebsiteBox',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    // 网址框的模式：add：新建  edit: 编辑
    type: {
      type: String,
      default: 'add'
    },
    // 点击右键菜单时，鼠标所指向的网址
    websiteForContextmenu: {
      type: Object,
      default() {
        return {}
      }
    }
  },
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
    isShow() {
      if (this.type === 'edit') {
        this.form = { ...this.websiteForContextmenu }
      } else {
        this.form = { ...this.formDefault }
      }
    }
  },
  computed: {
    _isShow: {
      get() {
        return this.isShow
      },
      set(newValue) {
        this.$emit('update:is-show', newValue)
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
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
        loading.close()
      })
    },
    websiteUpdate() {
      const data = { ...this.form }
      // data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id
      data.id = this.websiteForContextmenu.id

      const loading = this.$loading({
        lock: true,
        text: '正在修改...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteUpdate(data).then(async (res) => {
        const { code, data } = res
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
        loading.close()
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
