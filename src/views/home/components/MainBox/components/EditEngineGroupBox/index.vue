<template>
  <el-dialog :title="dialogTitle" :visible.sync="isShow" :append-to-body="true">
    <div class="edit_engine_group_box">
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
  serverEngineGroupAdd,
  serverEngineGroupDelete,
  serverEngineGroupUpdate
} from '@/api/engine'
import { getHomeData } from '@/util'

export default {
  name: 'EditEngineGroupBox',
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
          id: this.engineGroupForContextmenu.id,
          title: this.engineGroupForContextmenu.title
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
        return this.$store.state.editEngineGroupBoxData.isShow
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
          isShow: newValue
        })
      }
    },
    type: {
      get() {
        return this.$store.state.editEngineGroupBoxData.type
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
          type: newValue
        })
      }
    },
    engineGroupForContextmenu: {
      get() {
        return this.$store.state.editEngineGroupBoxData.info
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
          info: newValue
        })
      }
    },
    dialogTitle() {
      if (this.type === 'add') {
        return '新增引擎分组'
      } else if (this.type === 'edit') {
        return '编辑引擎分组'
      } else {
        return '新增引擎分组'
      }
    }
  },
  methods: {
    // 新建
    handleConfirm(e) {
      e.preventDefault()
      switch (this.type) {
        case 'add':
          this.engineGroupAdd()
          break
        case 'edit':
          this.engineGroupUpdate()
          break

        default:
          break
      }
    },
    engineGroupAdd() {
      const data = { ...this.form }
      // data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id

      const loading = this.$loading({
        lock: true,
        text: '正在添加...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverEngineGroupAdd(data).then(async (res) => {
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
    engineGroupUpdate() {
      const data = { ...this.form }
      // data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id
      data.id = this.engineGroupForContextmenu.id

      const loading = this.$loading({
        lock: true,
        text: '正在修改...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverEngineGroupUpdate(data).then(async (res) => {
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
    engineGroupDelete() {
      const loading = this.$loading({
        lock: true,
        text: '正在删除...',
        spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
        background: 'transparent'
      })
      serverEngineGroupDelete({ id: this.engineGroupForContextmenu.id }).then(
        async (res) => {
          const { code, data } = res
          loading.close()
          if (code === 0) {
            await getHomeData.call(this)
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
          }
        }
      )
    },
    // 关闭面板
    hideBox() {
      this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
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
.edit_engine_group_box {
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
