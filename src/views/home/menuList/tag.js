// import { serverTagAdd } from '@/api/tag'

import { serverTagDelete } from '@/api/tag'
import { getHomeData } from '@/util'

export const tag = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: '新建标签',
        icon: 'el-icon-document-add',
        func: (targetTag) => {
          this.$store.commit('SET_EDIT_TAG_BOX_DATA', {
            isShow: true,
            type: 'add',
            info: targetTag
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'edit',
        title: '编辑标签',
        icon: 'el-icon-edit',
        func: (targetTag) => {
          this.$store.commit('SET_EDIT_TAG_BOX_DATA', {
            isShow: true,
            type: 'edit',
            info: targetTag
          })
        }
      }
    },
    {
      type: 'item',
      menuItem: {
        id: 'delect',
        title: '删除标签',
        icon: 'el-icon-delete',
        func: (targetTag) => {
          this.$confirm(
            `此操作将永久删除标签'${targetTag?.title}', 是否继续?`,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
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
           * 删除标签
           */
          function deleteGroup() {
            const loading = this.$loading({
              lock: true,
              text: '正在删除...',
              spinner: 'el-icon-loading',
              // background: 'rgba(0, 0, 0, 0.7)'
              background: 'transparent'
            })
            serverTagDelete({
              id: targetTag.id
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
    }
  ]
}
