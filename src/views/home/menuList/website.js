// import { serverWebsiteAdd } from '@/api/website'

import { serverWebsiteDelete } from '@/api/website'
import { getHomeData } from '@/util'

export const websiteBar = function () {
  return [
    {
      type: 'item',
      menuItem: {
        id: 'new',
        title: '新建',
        icon: 'el-icon-document-add',
        func: (targetWebsite) => {
          const sort =
            this.websiteList[this.websiteList.length - 1]?.sort + 1 || 0
          console.log(sort)
          this.newWebsite(sort)
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
          this.editWebsiteBoxType = 'add'
          this.isShowDialog = true
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
          this.editWebsiteBoxType = 'edit'
          this.isShowDialog = true
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
  ]
}
