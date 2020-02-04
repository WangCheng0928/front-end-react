import axios from 'axios'
import io from 'socket.io-client'
import { user } from './user.redux'
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}
export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.data.users,
        chatmsg: action.data.msgs,
        unread: action.data.msgs.filter(
          v => !v.read && v.to === action.data.userId
        ).length
      }
    case MSG_RECV:
      const n = action.data.to === action.userId ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.data],
        unread: state.unread + n
      }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs, users, userId) {
  return { type: MSG_LIST, data: { msgs, users, userId } }
}

function msgRecv(data, userId) {
  return { type: MSG_RECV, data: data, userId }
}

export function receiveMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', data => {
      const userId = getState().user._id
      dispatch(msgRecv(data, userId))
    })
  }
}

export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userId))
      }
    })
  }
}