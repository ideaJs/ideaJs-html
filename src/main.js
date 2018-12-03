// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource' // http请求插件
import {HTTP_POST, HTTP_GET} from './common/js/isPost'
import {goURL, goPush, goReplace} from './common/js/isApi'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueResource)
// 视图切换动画逻辑
function routerTransition (to, from) {
  let direction = sessionStorage.getItem('direction')
  if (!direction) {
    direction = 'slide-forward'
  } else {
    let directionFrom = sessionStorage.getItem('directionFrom')
    let directionTo = sessionStorage.getItem('directionTo')
    if (directionFrom === to.path && direction === 'slide-forward') {
      direction = 'slide-back'
    } else {
      direction = 'slide-forward'
    }
  }
  sessionStorage.setItem('direction', direction)
  sessionStorage.setItem('directionFrom', from.path)
  sessionStorage.setItem('directionTo', to.path)
  return direction
}
router.beforeEach((to, from, next) => { // 在页面跳转之前处理事件：to即将进入的路由页面，from当前即将离开的路由页面
  if (to) {
    document.title = to.meta.title
  }
  to.meta.direction = routerTransition(to, from)
  next()
})

router.afterEach((to, from, next) => { // 在页面跳转之后处理事件
  if (to) {
    document.title = to.meta.title
  }
  if (to !== from) {
    if (to.meta.scrollToTop) {
      window.scrollTo(0, 0)
    }
  }
})
Vue.config.productionTip = false
Vue.prototype.$post = HTTP_POST // post请求：this.$post(url, param, success, fail, load, error, http)
Vue.prototype.$get = HTTP_GET // get请求：this.$get(url, success, fail, load, error, http)
Vue.prototype.$goURL = goURL // 项目外页面跳转：this.$goURL(url)
Vue.prototype.$push = goPush // 项目内页面跳转push：this.$push(param)
Vue.prototype.$replace = goReplace // 项目内页面跳转replace：this.$replace(param)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

