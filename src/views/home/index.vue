<template>
  <div class="home">
    <ContextMenuBar />
    <el-container>
      <SideBox />
      <el-container>
        <el-header><HeaderBox /></el-header>
        <el-main><MainBox /></el-main>
        <el-footer><FooterBox /></el-footer>
      </el-container>
    </el-container>
    <HotKeyInputBox />
  </div>
</template>
<script>
import ContextMenuBar from '@/components/ContextMenuBar'
import HotKeyInputBox from '@/components/HotKeyInputBox'
import SideBox from './components/SideBox'
import HeaderBox from './components/HeaderBox'
import FooterBox from './components/FooterBox'
import MainBox from './components/MainBox'
import { serverUserGetInfo } from '@/api/user'
import { getHomeData } from '@/util'
export default {
  name: 'home',
  components: {
    SideBox,
    HeaderBox,
    FooterBox,
    MainBox,
    ContextMenuBar,
    HotKeyInputBox
  },
  data() {
    return {}
  },
  async created() {
    // 有token的时候才获取用户信息
    const token = localStorage.getItem('token')
    if (token) {
      serverUserGetInfo().then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.$store.commit('SET_USER_INFO', data.userInfo)
        } else {
          this.$message({
            message: data?.msg,
            type: 'error'
          })
        }
      })
    }
    const loading = this.$loading({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'transparent'
    })
    await getHomeData.call(this)
    loading.close()
  }
}
</script>

<style lang="scss" scoped>
.home {
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    height: $height-header !important;
  }
  .el-footer {
    height: $height-footer !important;
  }
  .el-main {
    width: 100%;
    overflow: hidden;
  }
  .el-side,
  .el-header,
  .el-main,
  .el-footer {
    padding: 0;
  }
}
</style>
