<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="isShow"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
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
        <el-form-item label="背景" :label-width="formLabelWidth">
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
        </el-form-item>
        <el-form-item label="预设" :label-width="formLabelWidth">
          <div class="color_list">
            <div
              class="color_item"
              v-for="(colorItem, index) in colorList"
              :style="colorItem"
              :key="index"
              @click="setColor(colorItem)"
            >
              字
            </div>
          </div>
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
        title: '',
        color: '',
        bgColor: ''
      },
      formDefault: {
        title: '',
        color: '#FFFFFF',
        bgColor: '#0cbe83'
      },
      formLabelWidth: '70px',
      // 颜色列表
      colorList: [
        { backgroundColor: '#5D6F72', color: '#FFFFFF' },
        { backgroundColor: '#678388', color: '#FFFFFF' },
        { backgroundColor: '#889392', color: '#FFFFFF' },
        { backgroundColor: '#327eb5', color: '#FFFFFF' },
        { backgroundColor: '#538fc3', color: '#FFFFFF' },
        { backgroundColor: '#00A7C0', color: '#FFFFFF' },
        { backgroundColor: '#32c3b6', color: '#FFFFFF' },
        { backgroundColor: '#66b58b', color: '#FFFFFF' },
        { backgroundColor: '#E56665', color: '#FFFFFF' },
        { backgroundColor: '#F37D43', color: '#FFFFFF' },
        { backgroundColor: '#AE70AE', color: '#FFFFFF' },
        { backgroundColor: '#8688c1', color: '#FFFFFF' }
      ]
    }
  },
  watch: {
    isShow() {
      if (this.type === 'edit') {
        this.form = {
          id: this.websiteGroupForContextmenu.id || '',
          title: this.websiteGroupForContextmenu.title || '',
          color: this.websiteGroupForContextmenu.color || this.form.color,
          bgColor: this.websiteGroupForContextmenu.bg_color || this.form.bgColor
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
    },
    stylePreview() {
      return {
        color: this.form.color,
        backgroundColor: this.form.bgColor
      }
    }
  },
  methods: {
    setColor(colorItem) {
      this.form.color = colorItem.color
      this.form.bgColor = colorItem.backgroundColor
    },
    setDefaultStyle() {
      this.form.color = '#FFFFFF'
      this.form.bgColor = '#0cbe83'
      this.$forceUpdate()
    },
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
      .color_list {
        display: flex;
        flex-wrap: wrap;
        .color_item {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 3px;
          margin-bottom: 3px;
          border-radius: 100%;
          cursor: pointer;
          // transition: all 0.2s ease-in-out;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
  .dialog_footer {
    text-align: right;
  }
}
</style>
