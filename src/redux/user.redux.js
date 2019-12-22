import axios from 'axios'
import { getRedirectPath } from '../utils'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  redirectTo: '',
  isAuth: '',
  msg: '',
  user: '',
  type: ''
}

//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.data),
        isAuth: true,
        ...action.data
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
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

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, data: data }
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, data: data }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
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
        dispatch(registerSuccess({ user, pwd }))
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
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
