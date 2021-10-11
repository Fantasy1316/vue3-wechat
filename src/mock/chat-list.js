/**
 * @description 聊天列表
 */

const Mock = require('mockjs')
const Random = Mock.Random

Mock.mock('/mock/wechat/chat/list', 'get', () => {
  let list = []
  for (let i = 0; i < 30; i++) {
    let listObject = {
      id: Random.increment(),
      name: Random.cname(),
      avatar: Random.image('250x250', '#f8c61a', '#000', 'png', 'Mock'),
      message: Random.csentence(2, 50),
      date: Random.date('yyyy/MM/dd'),
    }
    list.push(listObject)
  }
  return {
    data: list,
  }
})
