export default {
  urlId: 0,
  isSideBoxCollapse: false, // 侧栏是否折叠
  isShowSideBox: true, // 侧栏是否显示
  isShowToolsBox: true, // 工具栏是否显示
  isEditMode: false, // 是否编辑模式
  mode: 'website', // 中间面板模式=> website:导航; search: 搜索
  searchValue: '', // 搜索值
  searchType: null, // 搜索类型 { title: '单搜', type: 1}
  searchTypeList: [
    {
      title: '单搜',
      command: 1
    },
    {
      title: '双搜',
      command: 2
    },
    {
      title: '三搜',
      command: 3
    }
  ],
  // 搜索引擎列表
  engineList: {
    1: {
      id: 0,
      title: '百度',
      url: 'https://www.baidu.com/s?wd='
    },
    0: {
      id: 1,
      title: '必应',
      url: 'https://cn.bing.com/search?q='
    },
    2: {
      id: 2,
      title: '神马',
      url: 'https://so.m.sm.cn/s?q='
    }
  },
  defaultSearchEngine: {
    id: -1,
    title: '百度',
    url: 'https://www.baidu.com/s?wd='
  },
  searchEngine: {
    engineId1: 1,
    engineId2: 2,
    engineId3: 3
  },
  isShowShareBox: false, // 是否显示分享信息框
  shareInfo: null, // 分享信息
  isShowUserInfoBox: false, // 是否显示用户信息框
  isShowSettingBox: false, // 是否显示设置信息框
  userInfo: null, // 用户信息
  engineGroups: null, // 搜索引擎资料
  websiteGroups: null, // 网站资料
  // 右键菜单
  contextmenu: {
    isShow: false,
    type: null,
    prama: {}
  },
  // 网址框属性(编辑、新建网址)
  editWebsiteBoxData: {
    isShow: false, // 是否显示
    type: 'add', // 模式：add：新建  edit: 编辑
    groupId: 0, // 网址分组id
    info: null // 网址信息
  },
  // 网址分组框属性(编辑、新建网址)
  editWebsiteGroupBoxData: {
    isShow: false, // 是否显示
    type: 'add', // 模式：add：新建  edit: 编辑
    info: null // 网址分组信息
  },
  // 引擎框属性(编辑、新建引擎)
  editEngineBoxData: {
    isShow: false, // 是否显示
    type: 'add', // 模式：add：新建  edit: 编辑
    groupId: 0, // 引擎分组id
    info: null // 引擎信息
  },
  // 引擎分组框属性(编辑、新建引擎)
  editEngineGroupBoxData: {
    isShow: false, // 是否显示
    type: 'add', // 模式：add：新建  edit: 编辑
    info: null // 引擎分组信息
  },
  // 标签编辑框
  editTagBoxData: {
    isShow: false, // 是否显示
    type: 'add', // 模式：add：新建  edit: 编辑
    info: null // 标签信息
  },
  hotKeyInputBoxData: {
    isShow: false, // 是否显示输入快捷键的面板
    hotkey: [], // 快捷键
    info: [], // 快捷键详细信息
    type: 'engine', // 要添加快捷键的目标类型： engine：引擎  website：网址
    target: null // 要添加快捷键的元素
  },
  dataForTag: {
    type: 'website', // 模式：website：网址
    info: null // 标签信息
  }
}
