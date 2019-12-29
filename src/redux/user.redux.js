import axios from 'axios'
import { getRedirectPath } from '../utils'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}

//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.data),
        ...action.data
      }
    case LOAD_DATA:
      return {
        ...state,
        isAuth: true,
        ...action.data
      }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj
  return { type: AUTH_SUCCESS, data: data }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

export function update(userInfo) {
  return dispatch => {
    axios.post('/user/update', userInfo).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function loadData(userInfo) {
  console.log(userInfo.data)
  return { type: LOAD_DATA, data: userInfo.data }
}

export function register({ user, pwd, repeatPwd, type }) {
  if (!user || !pwd || !repeatPwd || !type) {
    return errorMsg('用户名密码不能为空')
  }
  if (pwd !== repeatPwd) {
    return errorMsg('两次密码不相同')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名密码不能为空')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
