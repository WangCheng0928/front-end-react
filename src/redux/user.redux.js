import axios from 'axios'

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState = {
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

//reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: '', isAuth: true, ...action.data }
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg }
    default:
      return state
  }
}

function registerSucess(data) {
  return { type: REGISTER_SUCCESS, data: data }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
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
        dispatch(registerSucess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
