<template>
  <el-dialog :title="dialogTitle" :visible.sync="isShow" :append-to-body="true">
    <div class="edit_website_group_box">
      <el-form :model="form" @submit.native.prevent>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            ref="refTitle"
            v-model="form.title"
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
import {
  serverWebsiteGroupAdd,
  serverWebsiteGroupDelete,
  serverWebsiteGroupUpdate
} from '@/api/website'
import { getHomeData } from '@/util'

export default {
  name: 'EditWebsiteGroupBox',
  data() {
    return {
      form: {
        title: ''
      },
      formDefault: {
        title: ''
      },
      formLabelWidth: '70px'
    }
  },
  watch: {
    isShow() {
      if (this.type === 'edit') {
        this.form = {
          id: this.websiteGroupForContextmenu.id,
          title: this.websiteGroupForContextmenu.title
        }
      } else {
        this.form = { ...this.formDefault }
      }
      this.$nextTick(() => {
        this.$refs.refTitle.focus()
      })
    }
  },
  computed: {
    isShow: {
      get() {
        return this.$store.state.editWebsiteGroupBoxData.isShow
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
          isShow: newValue
        })
      }
    },
    type: {
      get() {
        return this.$store.state.editWebsiteGroupBoxData.type
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
          type: newValue
        })
      }
    },
    websiteGroupForContextmenu: {
      get() {
        return this.$store.state.editWebsiteGroupBoxData.info
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
          info: newValue
        })
      }
    },
    dialogTitle() {
      if (this.type === 'add') {
        return '新增网址分组'
      } else if (this.type === 'edit') {
        return '编辑网址分组'
      } else {
        return '新增网址分组'
      }
    }
  },
  methods: {
    // 新建
    handleConfirm(e) {
      e.preventDefault()
      switch (this.type) {
        case 'add':
          this.websiteGroupAdd()
          break
        case 'edit':
          this.websiteGroupUpdate()
          break

        default:
          break
      }
    },
    websiteGroupAdd() {
      const data = { ...this.form }
      // data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id

      const loading = this.$loading({
        lock: true,
        text: '正在添加...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteGroupAdd(data).then(async (res) => {
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
    websiteGroupUpdate() {
      const data = { ...this.form }
      // data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id
      data.id = this.websiteGroupForContextmenu.id

      const loading = this.$loading({
        lock: true,
        text: '正在修改...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverWebsiteGroupUpdate(data).then(async (res) => {
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
    websiteGroupDelete() {
      const loading = this.$loading({
        lock: true,
        text: '正在删除...',
        spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
        background: 'transparent'
      })
      serverWebsiteGroupDelete({ id: this.websiteGroupForContextmenu.id }).then(
        async (res) => {
          const { code, data } = res
          if (code === 0) {
            await getHomeData.call(this)
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
          }
          loading.close()
        }
      )
    },
    // 关闭面板
    hideBox() {
      this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
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
.edit_website_group_box {
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
