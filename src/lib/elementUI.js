import Vue from 'vue'
import {
  Loading,
  MessageBox,
  Message,
  Notification,
  Button,
  Select,
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Avatar,
  Popover,
  Dialog,
  Option,
  Empty,
  Tree,
  Row,
  Col,
  Tabs,
  TabPane,
  ColorPicker,
  Switch,
  Link
} from 'element-ui'
;[
  Button,
  Select,
  Container,
  Aside,
  Header,
  Main,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  RadioGroup,
  RadioButton,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Avatar,
  Popover,
  Dialog,
  Option,
  Empty,
  Tree,
  Row,
  Col,
  Tabs,
  TabPane,
  ColorPicker,
  Switch,
  Link
].forEach((item) => {
  Vue.component(item.name, item)
})

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
