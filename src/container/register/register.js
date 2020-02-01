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
import handleForm from '../../component/form/handleForm'

@connect(state => state.user, { register })
@handleForm
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }

  register() {
    console.log(this.props.state)
    this.props.register(this.props.state)
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
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              用户
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('repeatPwd', v)}
            >
              确认密码
            </InputItem>
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => this.props.handleChange('type', 'genius')}
            >
              牛人
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
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
