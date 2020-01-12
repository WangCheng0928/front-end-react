import React from 'react'
import { connect } from 'react-redux'
import { Result, List } from 'antd-mobile'

@connect(state => state.user)
class UserInfo extends React.Component {
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
        <List>
          <Item>退出登录</Item>
        </List>
        <p>个人中心</p>
      </div>
    ) : null
  }
}

export default UserInfo
