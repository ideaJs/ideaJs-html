import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '@/components/startPage'
import Login from '@/components/config/login'
import AppIndex from '@/components/appIndex'
import News from '@/components/news/news'
import Menu from '@/components/config/menu'
import Headers from '@/components/config/headers'
import Footers from '@/components/config/footers'

// post请求：this.$post(url, param, success, fail, load, error, http)
// get请求：this.$get(url, success, fail, load, error, http)
// 项目外页面跳转：this.$goURL(url)
// 项目内页面跳转push：this.$push(param)
// 项目内页面跳转replace：this.$replace(param)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'StartPage', // 启动页
      component: StartPage,
      meta: {
        title: '欢迎', // 标题名称
        header: 'StartPage',
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    },
    {
      path: '/startPage',
      name: 'StartPage', // 启动页
      component: StartPage,
      meta: {
        title: '欢迎', // 标题名称
        header: 'StartPage',
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    },
    {
      path: '/appIndex',
      name: 'AppIndex', // 首页
      component: AppIndex,
      meta: {
        title: '首页', // 标题名称
        header: 'AppIndex',
        keepAlive: true, // 是否缓存页面
        scrollToTop: false, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    },
    {
      path: '/headers',
      name: 'Headers', // 顶部header
      component: Headers,
      meta: {
      }
    },
    {
      path: '/footers',
      name: 'Footers', // 底部导航
      component: Footers,
      meta: {
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
    },
    {
      path: '/menu',
      name: 'Menu', // 导航页
      component: Menu,
      meta: {
        title: '导航', // 标题名称
        keepAlive: false, // 是否缓存页面
        scrollToTop: true, // 是否滚动到顶部
        isReload: false // 控制是否刷新页面
      }
    }
  ]
})

Vue.use(Router)
