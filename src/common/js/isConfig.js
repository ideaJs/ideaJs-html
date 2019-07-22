/*Created by macmzon@163.com*/
// 测试环境配置
export const IS_DEV = {
  PARAMS: {
    project: 'ideajs-html', // 项目名称
    version: 'v1_101', // 项目版本号
    date: '2018-11-23', // 项目版本日期
    appid: 'FI03-0861',
    apptoken: '$2a$21$zW6nZAMh6dZd9xh13xVea6CcqehvW.Xv/GFKWo9kHT0QiRv./Qhye'
  },
  URL: {
    XML: '', // 登录地址
    MSG: 'https://', // 消息
    IMAGE: 'https://' // 图片地址
  }
}

// 生产环境配置
export const IS_BUILD = {
  PARAMS: {
    project: 'ideajs-html', // 项目名称
    version: 'v1_101', // 项目版本号
    date: '2018-11-23', // 项目版本日期
    appid: 'FI03-0861',
    apptoken: '$2a$21$zW6nZAMh6dZd9xh13xVea6CcqehvW.Xv/GFKWo9kHT0QiRv./Qhye'
  },
  URL: {
    XML: '', // 登录地址
    MSG: 'https://', // 消息
    IMAGE: 'https://' // 图片地址
  }
}

// 测试环境打包专用
export const CONFIG = IS_DEV

// 生产环境打包专用
// export const CONFIG = IS_BUILD
