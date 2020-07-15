/**
 * 跨应用路由跳转
 * @param {String} href url地址
 * @param {Object} stateObj 状态参数 可以通过history.state读取
 * @param {String} title 标题 暂时没有用
 */
function goTo(href = '/', title = null, stateObj = {}) {
  window.history.pushState(stateObj, title, href); 
}

export {
  goTo // 跨应用路由跳转
}
