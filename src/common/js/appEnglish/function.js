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

// 获取某一课程短语表
export function _getPhrases (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/' + param.id2 + '.json')
  func && func(data)
}

// 获取某一课程口语表
export function _getOrals (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/' + param.id2 + '.json')
  func && func(data)
}

// 获取某一课程阅读表
export function _getReads (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/' + param.id2 + '.json')
  func && func(data)
}

// 获取某一课程写作表
export function _getWrites (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/' + param.id2 + '.json')
  func && func(data)
}

// 获取某一课程语法表
export function _getGrammars (param, func) {
  let data = require('@/components/json/english/' + param.type + '/' + param.page + '/' + param.id2 + '.json')
  func && func(data)
}
