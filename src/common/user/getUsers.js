/* 用户信息列表
nickname：用户名/昵称
pass：密码
name：姓名
idCode：身份证号码
course：课程代码

 */
export function getUsers (phone) {
  let appUsers = {
    '18888888888': {
      nickname: '灵天微雨',
      pass: '1234521',
      name: '灵灵',
      idCode: '123456789999',
      course: ['small_word', 'middle_word', 'high_word', 'large_word'],
      jifen: '396'
    },
    '16666666666': {
      nickname: '齐天幻雪',
      pass: '1234521',
      name: '齐齐',
      idCode: '123456786666',
      course: ['small_word'],
      jifen: '99'
    }
  }
  let user = appUsers[phone] || ''
  if (user) {
    localStorage.setItem('userPhone', phone)
  }
  return user
}