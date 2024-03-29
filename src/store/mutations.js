export default {
  SET_URL_ID(state, value) {
    state.urlId = value
  },
  SET_SEARCH_TYPE(state, value) {
    state.searchType = value
  },
  SET_SEARCH_VALUE(state, value) {
    state.searchValue = value
  },
  SET_SEARCH_ENGINE(state, { engineKey, engineId }) {
    state.searchEngine[engineKey] = engineId
  },
  SET_MODE(state, value) {
    state.mode = value
  },
  SET_USER_INFO(state, value) {
    state.userInfo = value
  },
  SET_IS_SHOW_SHARE_BOX(state, value) {
    state.isShowShareBox = value
    if (value) {
      state.isShowUserInfoBox = false
      state.isShowSettingBox = false
    }
  },
  SET_IS_SHOW_USER_INFO_BOX(state, value) {
    state.isShowUserInfoBox = value
    if (value) {
      state.isShowSettingBox = false
      state.isShowShareBox = false
    }
  },
  SET_IS_SHOW_SETTING_BOX(state, value) {
    state.isShowSettingBox = value
    if (value) {
      state.isShowUserInfoBox = false
      state.isShowShareBox = false
    }
  },
  SET_WEBSITE_GROUPS(state, value) {
    state.websiteGroups = value
  },
  SET_ENGINE_GROUPS(state, value) {
    state.engineGroups = value
  },
  SET_ENGINE_LIST(state, value) {
    state.engineList = value
  },
  SET_IS_SIDE_BOX_COLLAPSE(state, value) {
    state.isSideBoxCollapse = value
  },
  SET_IS_SHOW_SIDE_BOX(state, value) {
    state.isShowSideBox = value
  },
  SET_IS_SHOW_TOOLS_BOX(state, value) {
    state.isShowToolsBox = value
  },
  SET_IS_EDIT_MODE(state, value) {
    state.isEditMode = value
  },
  SHOW_CONTEXTMENU(state, prama) {
    state.contextmenu.isShow = true
    state.contextmenu.prama = prama
  },
  HIDE_CONTEXTMENU(state) {
    state.contextmenu.isShow = false
  },
  SET_EDIT_WEBSITE_BOX_DATA(state, { isShow, type, groupId, info }) {
    if (isShow !== undefined) {
      state.editWebsiteBoxData.isShow = isShow
    }
    if (type !== undefined) {
      state.editWebsiteBoxData.type = type
    }
    if (groupId !== undefined) {
      state.editWebsiteBoxData.groupId = groupId
    }
    if (info !== undefined) {
      state.editWebsiteBoxData.info = info
    }
  },
  SET_EDIT_WEBSITE_GROUP_BOX_DATA(state, { isShow, type, info }) {
    if (isShow !== undefined) {
      state.editWebsiteGroupBoxData.isShow = isShow
    }
    if (type !== undefined) {
      state.editWebsiteGroupBoxData.type = type
    }
    if (info !== undefined) {
      state.editWebsiteGroupBoxData.info = info
    }
  },
  SET_EDIT_ENGINE_BOX_DATA(state, { isShow, type, groupId, info }) {
    if (isShow !== undefined) {
      state.editEngineBoxData.isShow = isShow
    }
    if (type !== undefined) {
      state.editEngineBoxData.type = type
    }
    if (groupId !== undefined) {
      state.editEngineBoxData.groupId = groupId
    }
    if (info !== undefined) {
      state.editEngineBoxData.info = info
    }
  },
  SET_EDIT_ENGINE_GROUP_BOX_DATA(state, { isShow, type, info }) {
    if (isShow !== undefined) {
      state.editEngineGroupBoxData.isShow = isShow
    }
    if (type !== undefined) {
      state.editEngineGroupBoxData.type = type
    }
    if (info !== undefined) {
      state.editEngineGroupBoxData.info = info
    }
  },
  SET_EDIT_TAG_BOX_DATA(state, { isShow, type, info }) {
    if (isShow !== undefined) {
      state.editTagBoxData.isShow = isShow
    }
    if (type !== undefined) {
      state.editTagBoxData.type = type
    }
    if (info !== undefined) {
      state.editTagBoxData.info = info
    }
  },
  SET_ITEM_FOR_TAG(state, { type, info }) {
    if (type !== undefined) {
      state.dataForTag.type = type
    }
    if (info !== undefined) {
      state.dataForTag.info = info
    }
  },
  SET_HOT_KEY_INPUT_BOX_DATA(state, { isShow, type, hotkey, info, target }) {
    if (isShow !== undefined) {
      state.hotKeyInputBoxData.isShow = isShow
    }
    if (type !== undefined) {
      state.hotKeyInputBoxData.type = type
    }
    if (hotkey !== undefined) {
      state.hotKeyInputBoxData.hotkey = hotkey
    }
    if (info !== undefined) {
      state.hotKeyInputBoxData.info = info
    }
    if (target !== undefined) {
      state.hotKeyInputBoxData.target = target
    }
  }
}
