export default {
  // 编码后的搜索值
  searchValueEncoded(state) {
    return encodeURIComponent(state.searchValue)
  }
}
