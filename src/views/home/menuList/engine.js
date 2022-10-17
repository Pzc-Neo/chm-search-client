import { serverEngineDelete, serverEngineGroupDelete } from '@/api/engine'
import { getHomeData } from '@/util'

export const engineGroup = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: '新建分组',
        icon: 'el-icon-document-add',
        func: (targetItem) => {
          this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
            isShow: true,
            type: 'add'
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'edit',
        title: '编辑分组',
        icon: 'el-icon-edit',
        func: (targetItem) => {
          this.$store.commit('SET_EDIT_ENGINE_GROUP_BOX_DATA', {
            isShow: true,
            type: 'edit'
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'delect',
        title: '删除分组',
        icon: 'el-icon-delete',
        func: (targetItem) => {
          this.$confirm('此操作将永久删除该分组, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              deleteGroup.call(this)
            })
            .catch((e) => {
              console.log(e)
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
          /**
           * 删除分组
           */
          function deleteGroup() {
            const loading = this.$loading({
              lock: true,
              text: '正在删除...',
              spinner: 'el-icon-loading',
              // background: 'rgba(0, 0, 0, 0.7)'
              background: 'transparent'
            })
            serverEngineGroupDelete({
              id: targetItem.id
            }).then(async (res) => {
              const { code, data } = res
              loading.close()
              if (code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                await getHomeData.call(this)
              } else {
                this.$message({
                  message: data.msg,
                  type: 'error'
                })
              }
            })
          }
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'newEngine',
        title: '新增引擎',
        icon: 'el-icon-document-add',
        func: (targetItem) => {
          // this.editEngineBoxType = 'add'
          this.$store.commit('SET_EDIT_ENGINE_BOX_DATA', {
            isShow: true,
            type: 'add'
          })
          // this.isShowDialog = true
        }
      }
    }
  ]
}

export const engine = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: '新增引擎',
        icon: 'el-icon-document-add',
        func: (targetItem) => {
          this.$store.commit('SET_EDIT_ENGINE_BOX_DATA', {
            isShow: true,
            type: 'add'
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'edit',
        title: '编辑引擎',
        icon: 'el-icon-edit',
        func: (targetItem) => {
          this.$store.commit('SET_EDIT_ENGINE_BOX_DATA', {
            isShow: true,
            type: 'edit'
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'delect',
        title: '删除引擎',
        icon: 'el-icon-delete',
        func: (targetItem) => {
          this.$confirm('此操作将永久删除该引擎, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              delectEngine.call(this)
            })
            .catch((e) => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })

          function delectEngine() {
            const loading = this.$loading({
              lock: true,
              text: '正在删除...',
              spinner: 'el-icon-loading',
              // background: 'rgba(0, 0, 0, 0.7)'
              background: 'transparent'
            })
            serverEngineDelete({ id: targetItem.id }).then(async (res) => {
              const { code, data } = res
              loading.close()
              if (code === 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
                await getHomeData.call(this)
              } else {
                this.$message({
                  message: data.msg,
                  type: 'error'
                })
              }
            })
          }
        }
      }
    }
  ]
}
