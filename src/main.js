// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource' // http请求插件
import {HTTP_POST, HTTP_GET} from './common/js/isPost'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(VueResource)
/*
POST请求：post(url, [body], [options]) 注意：{emulateJSON: true}为必须
this.$http.post("http://abc", {name: "abc"}, {emulateJSON: true}).then(
  (res) => {
    // 处理成功的结果
    console.log(res)
  }, (res) => {
    // 处理失败的结果
    console.log(res)
  }
)
*/

router.beforeEach((to, from, next) => { // 在页面跳转之前处理事件：to即将进入的路由页面，from当前即将离开的路由页面
  if (to !== from) {
    document.title = to.meta.title
    to.meta.direction = to.meta.direction === 'forward' ? 'goback' : 'forward'
    from.meta.direction = to.meta.direction === 'forward' ? 'goback' : 'forward'
    setTimeout(() => {
      to.meta.direction = 'goback'
      from.meta.direction = 'forward'
    }, 300)
  }
  next()
})

router.afterEach((to, from, next) => { // 在页面跳转之后处理事件
  if (to !== from) {
    if (to.meta.scrollToTop) {
      window.scrollTo(0, 0)
    }
  }
})

Vue.config.productionTip = false
Vue.prototype.$post = HTTP_POST
Vue.prototype.$get = HTTP_GET

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
