import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/startPage'
import Login from '@/components/config/login'
import News from '@/components/news/news'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage', // 启动页
      component: StartPage,
      meta: {
        title: '欢迎', // 标题名称
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    },
    {
      path: '/login',
      name: 'Login', // 登录页
      component: Login,
      meta: {
        title: '登录', // 标题名称
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    },
    {
      path: '/news',
      name: 'News', // 新闻页
      component: News,
      meta: {
        title: '新闻', // 标题名称
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    }
  ]
})

Vue.use(Router)
