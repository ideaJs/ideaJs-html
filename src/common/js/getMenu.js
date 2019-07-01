/*Created by macmzon@163.com*/
/* 
title 课程名称，menu 菜单名称，type 课程类型，page 课程页面，id 课程ID，size 课程总数
 */
// 获取menu菜单
export function getMenu() {
  let menu = [
    {
      title: '英语',
      type: 'english',
      page: 'En',
      id: 'En',
      list: [
        {
          title: '英语-小学-词汇',
          menu: 'english',
          type: 'small',
          page: 'Word',
          id: 'small_word'
        },
        {
          title: '英语-小学-短语',
          menu: 'english',
          type: 'small',
          page: 'Phrase',
          id: 'small_phrase'
        },
        {
          title: '英语-初中-词汇',
          menu: 'english',
          type: 'middle',
          page: 'Word',
          id: 'middle_word'
        },
        {
          title: '英语-初中-短语',
          menu: 'english',
          type: 'middle',
          page: 'Phrase',
          id: 'middle_phrase'
        },
        {
          title: '英语-高中-词汇',
          menu: 'english',
          type: 'high',
          page: 'Word',
          id: 'high_word'
        },
        {
          title: '英语-高中-短语',
          menu: 'english',
          type: 'high',
          page: 'Phrase',
          id: 'high_phrase'
        },
        {
          title: '英语-高中-写作',
          menu: 'english',
          type: 'high',
          page: 'Write',
          id: 'high_write'
        },
        {
          title: '英语-大学-词汇',
          menu: 'english',
          type: 'large',
          page: 'Word',
          id: 'large_word'
        },
        {
          title: '英语-大学-短语',
          menu: 'english',
          type: 'large',
          page: 'Phrase',
          id: 'large_phrase'
        },
        {
          title: '英语-大学-写作',
          menu: 'english',
          type: 'large',
          page: 'Write',
          id: 'large_write'
        }
      ]
    }
  ]
  return menu
}
