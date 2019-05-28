/* 用户信息列表
nickname：用户名/昵称
pwd：密码
name：姓名
idCode：身份证号码
course：课程代码 EN_A(小学英语) EN_B(初中英语) EN_C(高中英语) EN_D(大学英语)

 */
export function getUsers (phone) {
  localStorage.setItem('userPhone', phone)
  let appUsers = {
    '18888888888': {
      nickname: '倚天大圣',
      pwd: '1234521',
      name: '大大',
      idCode: '123456789999999999',
      course: ['EN_D']
    },
    '16666666666': {
      nickname: '齐天大圣',
      pwd: '1234521',
      name: '齐齐',
      idCode: '123456789999999999',
      course: ['EN_D']
    }
  }
  let user = appUsers[phone] || ''
  return user
}