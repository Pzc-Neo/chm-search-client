import Vue from 'vue'
import { Button, Select, Loading, MessageBox, Message, Notification } from 'element-ui'
;[Button, Select].forEach((item) => {
  Vue.component(item.name, item)
})

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
