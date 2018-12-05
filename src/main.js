// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource' // http请求插件
import {HTTP_POST, HTTP_GET} from './common/js/isPost'
import {goURL, goPush, goReplace} from './common/js/isApi'
import {sync} from 'vuex-router-sync'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(store)

Vue.config.productionTip = false
Vue.prototype.$post = HTTP_POST // post请求：this.$post(url, param, success, fail, load, error, http)
Vue.prototype.$get = HTTP_GET // get请求：this.$get(url, success, fail, load, error, http)
Vue.prototype.$goURL = goURL // 项目外页面跳转：this.$goURL(url)
Vue.prototype.$push = goPush // 项目内页面跳转push：this.$push(param)
Vue.prototype.$replace = goReplace // 项目内页面跳转replace：this.$replace(param)

sync(store, router)

// 视图切换动画逻辑
let history = window.sessionStorage
let historyCount = history.getItem('count') * 1 || 0
function routerTransition (to, from) {
  const toIndex = history.getItem(to.name)
  const fromIndex = history.getItem(from.name)
  let direction = 'forward' // 下一页
  if (toIndex) {
    if (toIndex >= fromIndex || !fromIndex) {
      store.commit('UPDATE_DIRECTION', direction)
    } else {
      direction = 'reverse' // 上一页
      store.commit('UPDATE_DIRECTION', direction)
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.name, historyCount)
    direction = 'forward'
    store.commit('UPDATE_DIRECTION', direction)
  }
}
router.beforeEach((to, from, next) => { // 在页面跳转之前处理事件：to即将进入的路由页面，from当前即将离开的路由页面
  if (to) {
    document.title = to.meta.title
  }
  routerTransition(to, from)
  next()
})

router.afterEach((to, from, next) => { // 在页面跳转之后处理事件
  if (to) {
    document.title = to.meta.title
    if (to !== from && !to.meta.keepAlive) {
      window.scrollTo(0, 0)
    }
  }
})
// 禁用浏览器返回历史页功能，可以让用户一直停留在当前页面
pushHistory()
window.addEventListener("popstate", function (e) {
  pushHistory() //注，此处调用，可以用户一直停留着这个页面
}, false)
function pushHistory() {
  window.history.pushState({
    title: document.title,
    url: "#"
  }, document.title, "#")
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

