<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="isShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="edit_tag_box">
      <el-form :model="form" @submit.native.prevent>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input
            ref="refTitle"
            v-model="form.title"
            autocomplete="off"
            @keyup.enter.native="handleConfirm"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="背景" :label-width="formLabelWidth">
          <el-color-picker v-model="form.bgColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="文字" :label-width="formLabelWidth">
          <el-color-picker v-model="form.color"></el-color-picker>
        </el-form-item>
        <el-form-item label="预览" :label-width="formLabelWidth">
          <div class="preview_container">
            <div class="preview" :style="stylePreview">
              {{ form.title }}
            </div>
            <el-button size="small" @click="setDefaultStyle">默认</el-button>
          </div>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog_footer">
        <el-button @click="hideBox">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { serverTagAdd, serverTagDelete, serverTagUpdate } from '@/api/tag'
import { getHomeData } from '@/util'

export default {
  name: 'EditTagBox',
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
          id: this.tagForContextmenu.id || '',
          title: this.tagForContextmenu.title || ''
          // color: this.tagForContextmenu.color || this.form.color,
          // bgColor: this.tagForContextmenu.bg_color || this.form.bgColor
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
        return this.$store.state.editTagBoxData.isShow
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_TAG_BOX_DATA', {
          isShow: newValue
        })
      }
    },
    type: {
      get() {
        return this.$store.state.editTagBoxData.type
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_TAG_BOX_DATA', {
          type: newValue
        })
      }
    },
    tagForContextmenu: {
      get() {
        return this.$store.state.editTagBoxData.info
      },
      set(newValue) {
        this.$store.commit('SET_EDIT_TAG_BOX_DATA', {
          info: newValue
        })
      }
    },
    dialogTitle() {
      if (this.type === 'add') {
        return '新增标签'
      } else if (this.type === 'edit') {
        return '编辑标签'
      } else {
        return '新增标签'
      }
    },
    stylePreview() {
      return {
        color: this.form.color,
        backgroundColor: this.form.bgColor
      }
    }
  },
  methods: {
    setDefaultStyle() {
      this.form.color = 'white'
      this.form.bgColor = '#0cbe83'
      this.$forceUpdate()
    },
    // 新建
    handleConfirm(e) {
      e.preventDefault()
      switch (this.type) {
        case 'add':
          this.tagAdd()
          break
        case 'edit':
          this.tagUpdate()
          break

        default:
          break
      }
    },
    tagAdd() {
      const data = { ...this.form }
      console.log(this.tagForContextmenu)
      data.groupId = this.tagForContextmenu?.group_id

      const loading = this.$loading({
        lock: true,
        text: '正在添加...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverTagAdd(data).then(async (res) => {
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
    tagUpdate() {
      const data = { ...this.form }
      // data.groupId = this.$store.state.contextmenu?.prama?.targetItem?.group_id
      data.id = this.tagForContextmenu.id

      const loading = this.$loading({
        lock: true,
        text: '正在修改...',
        spinner: 'el-icon-loading',
        background: 'transparent'
      })
      serverTagUpdate(data).then(async (res) => {
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
    tagGroupDelete() {
      const loading = this.$loading({
        lock: true,
        text: '正在删除...',
        spinner: 'el-icon-loading',
        // background: 'rgba(0, 0, 0, 0.7)'
        background: 'transparent'
      })
      serverTagDelete({ id: this.tagForContextmenu.id }).then(async (res) => {
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
      })
    },
    // 关闭面板
    hideBox() {
      this.$store.commit('SET_EDIT_TAG_BOX_DATA', {
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
.edit_tag_box {
  position: relative;
  .preview_container {
    // position: absolute;
    // top: 40%; right: 5px;
    display: flex;
    height: 32px;
    line-height: 32px;
    .preview {
      // margin-top: 5px;
      padding: 0px 8px;
      // padding: 7px;
      font-size: 0.8em;
      border-radius: 0px 5px 0px 8px;
    }
  }
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
