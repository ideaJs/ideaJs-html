// Created by macmzon@163.com
// 公共方法库

// let Base64 = require('js-base64').Base64
// this.$post('url', {}, res => { console.log(res) }, err => { console.log(err) })

// 获取消息
export function _getNews (param, func) {
  let news = []
  if (param === 'history') { // 历史消息
    let data = require('@/common/data/news/historyNews.js')
    news = data.historyNews.news
  } else { // 最新消息
    let data = require('@/common/data/news/newNews.js')
    news = data.newNews.news
  }
  func && func(news)
}
// 获取菜单按钮
export function _getMenu (func) {
  let data = require('@/common/data/english/course.js')
  data = data.course
  func && func(data)
}
// 获取首页课程
export function _getCourse (func) {
  let data = require('@/common/data/english/course.js')
  data = data.course
  func && func(data)
}
