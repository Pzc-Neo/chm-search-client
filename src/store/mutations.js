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
  SET_IS_SIDE_BOX_COLLAPSE(state, value) {
    state.isSideBoxCollapse = value
  }
}
