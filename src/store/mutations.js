export default {
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
  SET_IS_SHOW_USER_INFO_BOX(state, value) {
    state.isShowUserInfoBox = value
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
  }
}
