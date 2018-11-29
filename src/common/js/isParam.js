/**
 * Created by macmzon on 2018/11/27.
 */

// 测试环境配置参数
export function PARAM_TEST () {
  let userLogin = localStorage.getItem('userLogin')
  let userLocalInfo = localStorage.getItem('userLocalInfo')
  let obj = {
    param: {
      project: 'ideajs-html', // 项目名称
      version: 'v1_101', // 项目版本号
      date: '2018-11-23', // 项目版本日期
      userLogin: userLogin,
      userLocalInfo: userLocalInfo
    },
    body: {
      header: {
        'Content-Type': 'application/json',
        'appid': 'FI03-0861',
        'apptoken': '$2a$21$zW6nZAMh6dZd9xh13xVea6CcqehvW.Xv/GFKWo9kHT0QiRv./Qhye'
      },
      emulateJSON: true
    }
  }
  return obj
}

// 生产环境配置参数
export function PARAM_PRODUCT () {
  let userLogin = JSON.parse(localStorage.getItem('userLogin'))
  let userLocalInfo = JSON.parse(localStorage.getItem('userLocalInfo'))
  let obj = {
    param: {
      project: 'ideajs-html', // 项目名称
      version: 'v1_101', // 项目版本号
      date: '2018-11-23', // 项目版本日期
      userLogin: userLogin,
      userLocalInfo: userLocalInfo
    },
    body: {
      header: {
        'Content-Type': 'application/json',
        'appid': 'FI03-0861',
        'apptoken': '$2a$21$zW6nZAMh6dZd9xh13xVea6CcqehvW.Xv/GFKWo9kHT0QiRv./Qhye'
      },
      emulateJSON: true
    }
  }
  return obj
}

// 测试环境打包专用
export const IS_PARAM = PARAM_TEST

// 生产环境打包专用
// export const IS_PARAM = PARAM_PRODUCT
