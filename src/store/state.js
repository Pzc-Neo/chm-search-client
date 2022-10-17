export default {
  isSideBoxCollapse: false, // 侧栏是否折叠
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
    0: {
      id: 0,
      title: '百度',
      url: 'https://www.baidu.com/s?wd='
    },
    1: {
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
  isShowUserInfoBox: false, // 是否显示用户信息框
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
  }
}
