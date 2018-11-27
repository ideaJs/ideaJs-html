import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/startPage'

export default new Router({
  routes: [
    {
      path: '/',
      name: '启动页',
      component: StartPage,
      meta: {
        title: '欢迎', // 标题名称
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        direction: 'forword', // 页面跳转方向：forword向前，goback返回
        isReload: false // 控制是否刷新页面
      }
    }
  ]
})

Vue.use(Router)
