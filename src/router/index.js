import Vue from 'vue'
import Router from 'vue-router'

const AppHello = () => import('@/components/appStart')
const AppStart = () => import('@/components/appStart')
const AppRegiste = () => import('@/components/appConfig/appRegiste')
const AppLogin = () => import('@/components/appConfig/appLogin')
const AppMenu = () => import('@/components/appConfig/appMenu')
const AppSet = () => import('@/components/appConfig/appSet')
const AppCaptcha = () => import('@/components/appConfig/appCaptcha')
const AppScan = () => import('@/components/appConfig/appScan')
const AppBarCode = () => import('@/components/appConfig/appBarCode')
const AppHeadPhoto = () => import('@/components/appConfig/appHeadPhoto')
const AppResetPass = () => import('@/components/appConfig/appResetPass')
const AppAbout = () => import('@/components/appConfig/appAbout')
const AppService = () => import('@/components/appConfig/appService')
const AppAddress = () => import('@/components/appConfig/appAddress')
const AppMoney = () => import('@/components/appConfig/appMoney')

const AppIndex = () => import('@/components/appMain/appIndex')
const AppMember = () => import('@/components/appMain/appMember')
const AppSign = () => import('@/components/appMain/appSign')
const AppFriends = () => import('@/components/appMain/appFriends')
const AppSeeInfo = () => import('@/components/appMain/appSeeInfo')
const AppEditInfo = () => import('@/components/appMain/appEditInfo')

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
  transitionOnLoad:true,
  routes: [{
    path: '',
    name: 'AppHello',
    component: AppHello,
    meta: {
      title: '欢迎',
      header: {
        left: '',
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }, {
    path: '/appStart',
    name: 'AppStart',
    component: AppStart,
    meta: {
      title: '欢迎',
      header: {
        left: '',
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: 'ios-contact',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: 'ios-settings',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: 'ios-card',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: 'md-menu',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: 'md-menu',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: 'md-menu',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
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
        leftFuc: (fuc) => {fuc && fuc()},
        right: '',
        rightFuc: (fuc) => {fuc && fuc()}
      },
      touch: {
        leftFuc: (fuc) => {fuc && fuc()},
        rightFuc: (fuc) => {fuc && fuc()}
      },
      isBack: false,
      scrollToTop: true,
      isReload: false,
      needLogin: true
    }
  }]
})

Vue.use(Router)
