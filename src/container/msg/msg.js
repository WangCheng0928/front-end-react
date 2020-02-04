import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(state => state)
class Msg extends React.Component {
  getLastMsg(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const userId = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLastMsg(a).create_time
      const b_last = this.getLastMsg(b).create_time
      return b_last - a_last
    })
    return (
      <div>
        {chatList.map(v => {
          const lastMsg = this.getLastMsg(v)
          let targetId = ''
          if (v[0].from === userId) {
            targetId = v[0].to
          } else if (v[0].to === userId) {
            targetId = v[0].from
          } else {
            targetId = ''
          }
          const unreadNum = v.filter(v => !v.read && v.to === userId).length
          if (!userinfo[targetId]) {
            return null
          }
          // const name = userinfo[targetId] ? userinfo[targetId].name : ''
          // const avatar = userinfo[targetId] ? userinfo[targetId].avatar : ''
          return (
            <List key={lastMsg._id}>
              <Item
                extra={<Badge text={unreadNum}></Badge>}
                thumb={require(`../../component/img/${userinfo[targetId].avatar}.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`)
                }}
              >
                {userinfo[targetId].name}
                <Brief>{lastMsg.content}</Brief>
              </Item>
            </List>
          )
        })}
      </div>
    )
  }
}

export default Msg
