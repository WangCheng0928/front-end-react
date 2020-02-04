import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropsType from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
  static propsType = {
    userlist: PropsType.array.isRequired
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    // debugger
    if (this.props.userlist.length === 0 || !this.props.userlist) {
      return null
    } else {
      return (
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          {this.props.userlist.map(v =>
            v.avatar ? (
              <Card key={v._id} onClick={() => this.handleClick(v)}>
                <Header
                  title={v.user}
                  thumb={require(`../../component/img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>
                  {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                  {v.desc.split('\n').map(d => (
                    <div key={d}>{d}</div>
                  ))}
                  {v.type === 'boss' ? <div>薪资：{v.salary}</div> : null}
                </Body>
              </Card>
            ) : null
          )}
        </WingBlank>
      )
    }
  }
}

export default UserCard
