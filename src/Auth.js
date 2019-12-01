import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, getUserData } from './Auth.redux'
// import axios from 'axios'

@connect(state => state.auth, { login, getUserData })
class Auth extends React.Component {
  //在没有使用redux的情况下 直接通过axios访问 9093接口，返回数据放在构造函数的this.state中
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     data: {}
  //   }
  // }
  componentDidMount() {
    this.props.getUserData()
    // axios.get('/data').then(res => {
    //   if (res.status === 200) {
    //     console.log(res)
    //     this.setState({ data: res.data })
    //   }
    // })
  }

  render() {
    return (
      <div>
        <h2>
          我的名字是{this.props.user} 年龄{this.props.age}
        </h2>
        {this.props.isAuth ? <Redirect to="/dashboard" /> : null}
        <h2>没有权限，需要登录</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}

export default Auth
