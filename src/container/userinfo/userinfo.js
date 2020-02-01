import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(state => state.user, { logoutSubmit })
class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          browserCookie.erase('userId')
          this.props.logoutSubmit()
        }
      }
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? ( //加这个使用axios是异步的，还是一样的问题，不加的话，第一次渲染会没有user数据，导致报错
      <div>
        <Result
          img={
            <img
              src={require(`../../component/img/${props.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        ></Result>
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map(v => (
              <Brief key={v}>{v}</Brief>
            ))}
            {props.salary ? <Brief>薪资：{props.salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ) : (
      <Redirect to={props.redirectTo} />
    )
  }
}

export default UserInfo
