<template>
  <el-popover
    placement="bottom"
    width="200"
    trigger="manual"
    content="默认内容"
    class="share_box"
    v-model="_isShowShareBox"
  >
    <div class="share_box_panel">
      <div class="hint">选择分享之后，别人将能访问你页面</div>
      <el-link class="copy_link" type="primary" @click.prevent="copyShareLinkToClipboard"
        >复制共享链接到剪贴板</el-link
      >
      <div class="command_btns" v-if="!shareInfo">
        <el-switch v-model="isShare" inactive-text="共享"> </el-switch>
      </div>
    </div>

    <div
      slot="reference"
      class="icon_area"
      @click.stop="toggleshareInfoVisible"
    >
      <el-avatar :src="(shareInfo && shareInfo.avatar) || null">
        <!-- style用来控制分享和不分享时的图标状态 -->
        <i
          class="el-icon-share"
          :style="!isShare ? { transform: 'rotate(180deg)' } : {}"
        >
        </i
      ></el-avatar>
      <!-- <span class="nickname"> 共享 </span> -->
    </div>
  </el-popover>
</template>

<script>
import { mapState } from 'vuex'
import { serverUserUpdateInfo } from '@/api/user'

export default {
  name: 'shareInfoBox',
  data() {
    return {
      registerFormVisible: false,
      loginFormVisible: false
    }
  },
  computed: {
    ...mapState({
      shareInfo: (state) => state.shareInfo,
      userInfo: (state) => state.userInfo,
      isShowShareBox: (state) => state.isShowShareBox
    }),
    _isShowShareBox: {
      get() {
        return this.isShowShareBox
      },
      set(newValue) {
        this.$store.commit('SET_IS_SHOW_SHARE_BOX', newValue)
      }
    },
    isShare: {
      get() {
        return Boolean(this.userInfo?.share) || false
      },
      set(newValue) {
        this.$confirm(
          `确定要【${newValue ? '' : '取消'}】分享你自己的页面吗?`,
          '提示'
        ).then((isConfirm) => {
          if (isConfirm) {
            serverUserUpdateInfo(newValue).then((res) => {
              const { code, data } = res
              if (code === 0) {
                this.$store.commit('SET_USER_INFO', {
                  ...this.userInfo,
                  share: data.share
                })
                this._isShowShareBox = false
                return
              }
              this.$alert(data.msg)
              this._isShowShareBox = false
            })
          }
        })
      }
    }
  },
  methods: {
    toggleshareInfoVisible() {
      this._isShowShareBox = !this._isShowShareBox
    },
    copyShareLinkToClipboard() {
      const text = window.location.host + '/' + this.userInfo.id

      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          () => {
            this.$message({ type: 'success', message: '已复制到剪贴板' })
          },
          (err) => {
            this.$message({
              type: 'error',
              message: '复制到剪贴板失败=>\n' + err
            })
            console.log()
          }
        )
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        this.$message({ type: 'success', message: '已复制到剪贴板' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon_area {
  display: flex;
  align-items: center;
  cursor: pointer;
  .nickname {
    margin-left: 5px;
    font-size: 14px;
  }
}
.el-avatar {
  width: 30px;
  height: 50px;
  line-height: 54px;
  color: $color-logo;
  font-size: 21px;
  background-color: transparent;
  /* background-color: $color-side-title; */
}
:deep(.el-dialog) {
  width: 340px;
}
.share_box_panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  .copy_link {
    margin-top: 8px;
  }
  .command_btns {
    margin-top: 15px;
  }
}
</style>
