import Vue from 'vue'
import Router from 'vue-router'

const AppStart = () => import('@/components/appStart')

const AppRegiste = () => import('@/components/appMember/appRegiste')
const AppLogin = () => import('@/components/appMember/appLogin')
const AppMember = () => import('@/components/appMember/appMember')

const AppSet = () => import('@/components/appSet/appSet')
const AppResetPass = () => import('@/components/appSet/appResetPass')
const AppSeeInfo = () => import('@/components/appSet/appSeeInfo')
const AppEditInfo = () => import('@/components/appSet/appEditInfo')
const AppAddress = () => import('@/components/appSet/appAddress')

const AppCaptcha = () => import('@/components/appConfig/appCaptcha')
const AppScan = () => import('@/components/appConfig/appScan')
const AppBarCode = () => import('@/components/appConfig/appBarCode')
const AppHeadPhoto = () => import('@/components/appConfig/appHeadPhoto')
const AppPhotoImg = () => import('@/components/appConfig/appPhotoImg')
const AppIdCard = () => import('@/components/appConfig/appIdCard')

const AppIndex = () => import('@/components/appMain/appIndex')
const AppSign = () => import('@/components/appMain/appSign')
const AppMenu = () => import('@/components/appMain/appMenu')
const AppAbout = () => import('@/components/appMain/appAbout')
const AppService = () => import('@/components/appMain/appService')
const AppWxcode = () => import('@/components/appMain/appWxcode')
const AppMoney = () => import('@/components/appMain/appMoney')
const AppNews = () => import('@/components/appMain/appNews')
const AppArticle = () => import('@/components/appMain/appArticle')

const AppFriends = () => import('@/components/appFriends/appFriends')

const AppProve = () => import('@/components/appProve/appProve')
const AppProveResult = () => import('@/components/appProve/appProveResult')

const AppEnDetail = () => import('@/components/appEnglish/appEnDetail')
const AppEnWord = () => import('@/components/appEnglish/appEnWord')
const AppEnPhrase = () => import('@/components/appEnglish/appEnPhrase')
const AppEnWrite = () => import('@/components/appEnglish/appEnWrite')
const AppEnWordDetail = () => import('@/components/appEnglish/appEnWordDetail')
const AppEnPhraseDetail = () => import('@/components/appEnglish/appEnPhraseDetail')
const AppEnWriteDetail = () => import('@/components/appEnglish/appEnWriteDetail')

/*
title 页面标题，

header 参数说明：
left或right参数设定：ios-contact 会员按钮，md-menu 菜单按钮，ios-arrow-back 左侧返回按钮，
left 左边按钮，leftFuc 左边按钮点击事件，right 右边按钮，rightFuc右边按钮点击事件，

touch 参数说明：
leftFuc 左滑页面事件-下一页，rightFuc 右滑页面事件-上一页，

isBack 判断是否返回上一页，scrollToTop 是否滚动到顶部，isReload 控制是否刷新页面，needLogin 进入页面需要登录
*/

export default new Router({
  base: '',
  transitionOnLoad: true,
  routes: [{
    path: '/appStart',
    name: 'AppStart',
    component: AppStart,
    meta: {
      title: '欢迎',
      header: {
        left: '',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appRegiste',
    name: 'AppRegiste',
    component: AppRegiste,
    meta: {
      title: '注册',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appLogin',
    name: 'AppLogin',
    component: AppLogin,
    meta: {
      title: '登录',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appIndex',
    name: 'AppIndex',
    component: AppIndex,
    meta: {
      title: '首页',
      header: {
        left: 'md-menu',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'ios-contact',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appMember',
    name: 'AppMember',
    component: AppMember,
    meta: {
      title: '会员',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'ios-settings',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appSign',
    name: 'AppSign',
    component: AppSign,
    meta: {
      title: '报名课程',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appFriends',
    name: 'AppFriends',
    component: AppFriends,
    meta: {
      title: '朋友圈',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appSeeInfo',
    name: 'AppSeeInfo',
    component: AppSeeInfo,
    meta: {
      title: '详细信息',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEditInfo',
    name: 'AppEditInfo',
    component: AppEditInfo,
    meta: {
      title: '信息设置',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appNews',
    name: 'AppNews',
    component: AppNews,
    meta: {
      title: '消息',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appArticle',
    name: 'AppArticle',
    component: AppArticle,
    meta: {
      title: '文章',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appProve',
    name: 'AppProve',
    component: AppProve,
    meta: {
      title: '身份认证',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appIdCard',
    name: 'AppIdCard',
    component: AppIdCard,
    meta: {
      title: '身份证照片',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appProveResult',
    name: 'AppProveResult',
    component: AppProveResult,
    meta: {
      title: '认证结果',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnDetail',
    name: 'AppEnDetail',
    component: AppEnDetail,
    meta: {
      title: '课程列表',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnWord',
    name: 'AppEnWord',
    component: AppEnWord,
    meta: {
      title: '英语-词汇列表',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnWordDetail',
    name: 'AppEnWordDetail',
    component: AppEnWordDetail,
    meta: {
      title: '英语-单词卡片',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnPhrase',
    name: 'AppEnPhrase',
    component: AppEnPhrase,
    meta: {
      title: '英语-短语列表',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnPhraseDetail',
    name: 'AppEnPhraseDetail',
    component: AppEnPhraseDetail,
    meta: {
      title: '英语-短语详情',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnWrite',
    name: 'AppEnWrite',
    component: AppEnWrite,
    meta: {
      title: '英语-写作列表',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appEnWriteDetail',
    name: 'AppEnWriteDetail',
    component: AppEnWriteDetail,
    meta: {
      title: '英语-写作详情',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appMenu',
    name: 'AppMenu',
    component: AppMenu,
    meta: {
      title: '菜单',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appSet',
    name: 'AppSet',
    component: AppSet,
    meta: {
      title: '设置',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appMoney',
    name: 'AppMoney',
    component: AppMoney,
    meta: {
      title: '钱包',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'ios-card',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appPhotoImg',
    name: 'AppPhotoImg',
    component: AppPhotoImg,
    meta: {
      title: '图片上传',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appAddress',
    name: 'AppAddress',
    component: AppAddress,
    meta: {
      title: '收货地址',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appWxcode',
    name: 'AppWxcode',
    component: AppWxcode,
    meta: {
      title: '公众号',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appService',
    name: 'AppService',
    component: AppService,
    meta: {
      title: '在线客服',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appAbout',
    name: 'AppAbout',
    component: AppAbout,
    meta: {
      title: '关于我们',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appResetPass',
    name: 'AppResetPass',
    component: AppResetPass,
    meta: {
      title: '密码重置',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appCaptcha',
    name: 'AppCaptcha',
    component: AppCaptcha,
    meta: {
      title: '验证',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'md-menu',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appScan',
    name: 'AppScan',
    component: AppScan,
    meta: {
      title: '扫描',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'md-menu',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appBarCode',
    name: 'AppBarCode',
    component: AppBarCode,
    meta: {
      title: '二维码',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: 'md-menu',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appHeadPhoto',
    name: 'AppHeadPhoto',
    component: AppHeadPhoto,
    meta: {
      title: '头像',
      header: {
        left: 'ios-arrow-back',
        leftFuc: (fuc) => { fuc && fuc() },
        right: '',
        rightFuc: (fuc) => { fuc && fuc() }
      },
      touch: {
        leftFuc: (fuc) => { fuc && fuc() },
        rightFuc: (fuc) => { fuc && fuc() }
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }]
})

Vue.use(Router)
