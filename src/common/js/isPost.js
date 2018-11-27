/**
 * Created by macmzon on 2018/11/27.
 */
import {HTTP_URL} from '../../common/js/httpURL'
import {IS_PARAM} from '../../common/js/isParam'
import Vue from 'vue'

// 封装vue-resource 的post请求
export function HTTP_POST (url, param, body, success, fail) {
  url = url === '' ? HTTP_URL.xml : url
  let _param = IS_PARAM.param
  let _body = IS_PARAM.body
  param = Object.assign(param, _param)
  body = Object.assign(body, _body)
  Vue.http.post(url, param, body).then((res) => { success(res) }, (res) => { fail(res) })
}

// 封装vue-resource 的get请求
export function HTTP_GET (url, body, success, fail) {
  url = url === '' ? HTTP_URL.xml : url
  let _body = IS_PARAM.body
  body = Object.assign(body, _body)
  Vue.http.get(url, body).then((res) => { success(res) }, (res) => { fail(res) })
}
