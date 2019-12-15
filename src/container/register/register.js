import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { register })
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatPwd: '',
      type: 'genius'
    }
    this.register = this.register.bind(this)
  }

  register() {
    console.log(this.state)
    this.props.register(this.state)
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        {this.props.redirectTo ? (
          <Redirect to={this.props.redirectTo}></Redirect>
        ) : null}
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.handleChange('user', v)}>
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.handleChange('repeatPwd', v)}
            >
              确认密码
            </InputItem>
            <RadioItem
              checked={this.state.type === 'genius'}
              onChange={() => this.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.state.type === 'boss'}
              onChange={() => this.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
            <WhiteSpace />
            <Button onClick={this.register} type="primary">
              注册
            </Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default Register
