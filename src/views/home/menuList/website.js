// import { serverWebsiteAdd } from '@/api/website'

import { serverWebsiteDelete, serverWebsiteGroupDelete } from '@/api/website'
import { getHomeData } from '@/util'

export const websiteGroup = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: '新建分组',
        icon: 'el-icon-document-add',
        func: (targetWebsite) => {
          this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
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
        func: (targetWebsite) => {
          this.$store.commit('SET_EDIT_WEBSITE_GROUP_BOX_DATA', {
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
        func: (targetWebsite) => {
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
            serverWebsiteGroupDelete({
              id: targetWebsite.id
            }).then(async (res) => {
              const { code, data } = res
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
              loading.close()
            })
          }
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'newWebsite',
        title: '新增网址',
        icon: 'el-icon-document-add',
        func: (targetItem) => {
          // this.editWebsiteBoxType = 'add'
          this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
            isShow: true,
            type: 'add'
          })
          // this.isShowDialog = true
        }
      }
    }
  ]
}

export const website = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: '新增网址',
        icon: 'el-icon-document-add',
        func: (targetWebsite) => {
          this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
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
        title: '编辑网址',
        icon: 'el-icon-edit',
        func: (targetWebsite) => {
          this.$store.commit('SET_EDIT_WEBSITE_BOX_DATA', {
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
        title: '删除网址',
        icon: 'el-icon-delete',
        func: (targetWebsite) => {
          this.$confirm('此操作将永久删除该网址, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              delectWebsite.call(this)
            })
            .catch((e) => {
              console.log(e)
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })

          function delectWebsite() {
            const loading = this.$loading({
              lock: true,
              text: '正在删除...',
              spinner: 'el-icon-loading',
              // background: 'rgba(0, 0, 0, 0.7)'
              background: 'transparent'
            })
            serverWebsiteDelete({ id: targetWebsite.id }).then(async (res) => {
              const { code, data } = res
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
              loading.close()
            })
          }
        }
      }
    }
  ]
}
