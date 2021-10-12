/**
 * @description 好友列表
 */

const Mock = require('mockjs')
const Random = Mock.Random

Mock.mock('/mock/wechat/chat/friends', 'get', () => {
  let list = []
  for (let i = 0; i < 10; i++) {
    let listObject = {
      key: Random.character('upper'),
      friends: [],
    }
    list.push(listObject)
  }

  list.forEach((item) => {
    let num = Random.natural(1, 10)
    for (let i = 0; i < num; i++) {
      let friend = {
        id: Random.increment(),
        name: Random.cword(1, 10),
        avatar: Random.image('250x250', '#f8c61a', '#000', 'png', 'Friend'),
      }
      item.friends.push(friend)
    }
  })
  return {
    data: list,
  }
})
