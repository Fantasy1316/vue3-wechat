/**
 * @description 聊天列表
 */

const Mock = require('mockjs')
const Random = Mock.Random

Mock.mock('/mock/wechat/chat/detail', 'get', () => {
  let list = []
  for (let i = 0; i < 20; i++) {
    let listObject = {
      id: Random.increment(),
      name: Random.cword(1, 10),
      avatar: Random.image('250x250', '#f8c61a', '#000', 'png', 'Mock'),
      message: Random.csentence(2, 50),
      image: Random.dataImage('200x100', 'Mock'),
      type: 1,
      date: Random.date('yyyy/MM/dd'),
    }
    list.push(listObject)
  }
  return {
    data: list,
  }
})
