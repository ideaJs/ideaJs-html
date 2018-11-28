/**
 * Created by macmzon on 2018/11/27.
 */
import {HTTP_URL} from '../../common/js/httpURL'
import {IS_PARAM} from '../../common/js/isParam'
import Vue from 'vue'
import {Loading, Message} from 'element-ui'

// 封装vue-resource 的post请求
export function HTTP_POST (url, param, body, success, fail, load) {
  if (!load) { // 是否禁用loading动画：是true,否false
    var loading = Loading.service({background: 'rgba(0,0,0,0.6)'}) // 开启loading动画
    setTimeout(() => {
      loading.close() // 关闭loading动画
    }, 2000)
  }
  url = url === '' ? HTTP_URL.XML : url
  let _param = IS_PARAM.param
  let _body = IS_PARAM.body
  param = Object.assign(param, _param)
  body = Object.assign(body, _body)
  Vue.http.post(url, param, body).then((res) => {
    setTimeout(() => {
      loading.close()
    }, 100)
    success && success(res)
  }, (res) => {
    setTimeout(() => {
      loading.close()
    }, 100)
    Message.closeAll()
    Message({type: 'error', message: '网络错误，请稍后重试！', duration: 2000})
    fail && fail(res)
  })
}

// 封装vue-resource 的get请求
export function HTTP_GET (url, body, success, fail, load) {
  if (!load) { // 是否禁用loading动画：是true,否false
    var loading = Loading.service({background: 'rgba(0,0,0,0.6)'}) // 开启loading动画
    setTimeout(() => {
      loading.close() // 关闭loading动画
    }, 2000)
  }
  url = url === '' ? HTTP_URL.XML : url
  let _body = IS_PARAM.body
  body = Object.assign(body, _body)
  Vue.http.get(url, body).then((res) => {
    setTimeout(() => {
      loading.close()
    }, 100)
    success && success(res)
  }, (res) => {
    setTimeout(() => {
      loading.close()
    }, 100)
    Message.closeAll()
    Message({type: 'error', message: '网络错误，请稍后重试！', duration: 2000})
    fail && fail(res)
  })
}
