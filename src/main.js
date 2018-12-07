// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import {routerSlide} from './router/routerSlide'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource' // http请求插件
import {HTTP_POST, HTTP_GET} from './common/js/isPost'
import {goURL, goPush, goBack, goReplace} from './common/js/isApi'
import {sync} from 'vuex-router-sync'
import VueTouch from 'vue-touch'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueResource)
Vue.use(Vuex)
Vue.use(store)
sync(store, router)
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false
Vue.prototype.$post = HTTP_POST // post请求：this.$post(url, param, success, fail, load, error, http)
Vue.prototype.$get = HTTP_GET // get请求：this.$get(url, success, fail, load, error, http)
Vue.prototype.$goURL = goURL // 项目外页面跳转：this.$goURL(url)
Vue.prototype.$push = goPush // 项目内页面跳转push：this.$push(param)
Vue.prototype.$back = goBack // 项目内页面返回back：this.$back(param)

router.beforeEach((to, from, next) => { // 在页面跳转之前处理事件：to即将进入的路由页面，from当前即将离开的路由页面
  if (to) {
    document.title = to.meta.title
  }
  routerSlide(store, to, from)
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
VueTouch.config.swipe = {
  threshold: 50 //手指左右滑动距离
}
VueTouch.config.pan = {
  direction: 'horizontal'
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

