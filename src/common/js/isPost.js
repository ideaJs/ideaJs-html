/**
 * Created by macmzon on 2018/11/27.
 */
import {IS_URL} from '../../common/js/isUrl'
import {IS_PARAM} from '../../common/js/isParam'
import Vue from 'vue'
import {Loading, Message} from 'element-ui'

// 封装vue-resource 的post请求
export function HTTP_POST (url, param, http, success, fail, load) {
  if (!load) { // 是否禁用loading动画：是true,否false
    var loading = Loading.service({background: 'rgba(0,0,0,0.6)'}) // 开启loading动画
  }
  url = url === '' ? IS_URL.XML : url
  let _param = IS_PARAM().param
  let _http = IS_PARAM().http
  param = JSON.stringify(Object.assign(param, _param))
  Vue.http.options = Object.assign(Vue.http.options, _http, http)
  Vue.http.post(url, {param: param}).then((res) => {
    loading.close()
    success && success(res)
  }, (res) => {
    loading.close()
    Message.closeAll()
    Message({type: 'error', message: '网络错误，请稍后重试！', duration: 2000})
    fail && fail(res)
  })
}

// 封装vue-resource 的get请求
export function HTTP_GET (url, http, success, fail, load) {
  if (!load) { // 是否禁用loading动画：是true,否false
    var loading = Loading.service({background: 'rgba(0,0,0,0.6)'}) // 开启loading动画
  }
  url = url === '' ? IS_URL.XML : url
  let _http = IS_PARAM().http
  Vue.http.options = Object.assign(Vue.http.options, _http, http)
  Vue.http.get(url).then((res) => {
    loading.close()
    success && success(res)
  }, (res) => {
    loading.close()
    Message.closeAll()
    Message({type: 'error', message: '网络错误，请稍后重试！', duration: 2000})
    fail && fail(res)
  })
}
