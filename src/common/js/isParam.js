/**
 * Created by macmzon on 2018/11/27.
 */
// 测试环境配置参数
export const PARAM_TEST = {
  param: {
    version: 'v1_101'
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

// 生产环境配置参数
export const PARAM_PRODUCT = {
  param: {
    version: 'v1_101'
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

// 测试环境打包专用
export const IS_PARAM = PARAM_TEST

// 生产环境打包专用
// export const IS_PARAM = PARAM_PRODUCT
