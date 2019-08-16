// Created by macmzon@163.com
// 公共方法库

// let Base64 = require('js-base64').Base64
// this.$post('url', {}, res => { console.log(res) }, err => { console.log(err) })

// 获取首页课程
export function _getCourse (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/list.json')
  func && func(data)
}

// 获取某一课程单词表
export function _getWords (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/' + param.id2 + '.json')
  func && func(data)
}
