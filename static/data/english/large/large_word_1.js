/*Created by macmzon@163.com*/
/* 大学-英语-词汇-课1     课程代码 large_word_1
name：单词名称
phonetic：音标
meaning：释义
example：例句
 */
// 获取课程内容
export function getWords() {
  let words = {
    "entertainment": {
      "name": "entertainment",
      "phonetic": "[ˌentəˈteinmənt]",
      "meaning": [
        "n. 招待; 款待; 娱乐; 表演节目"
      ],
      "example": [
        [
          "There will be entertainment in the square tonight.",
          "今晚广场上会有娱乐活动。"
        ]
      ]
    }
  }
  return words
}
