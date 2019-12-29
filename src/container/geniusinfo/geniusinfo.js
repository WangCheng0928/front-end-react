import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

import AvatarSelector from '../../component/avatar-selector/avatar-selector'

@connect(state => state.user, { update })
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
    this.update = this.update.bind(this)
  }

  handleChange(key, val) {
    this.setState({ [key]: val })
  }

  update() {
    this.props.update(this.state)
  }

  render() {
    const path = this.props.location.pathname
    const redirectTo = this.props.redirectTo
    return (
      <div>
        <NavBar mode="dark">牛人完善信息页</NavBar>
        {redirectTo && redirectTo !== path ? (
          <Redirect to={this.props.redirectTo}></Redirect>
        ) : null}
        <AvatarSelector
          selectAvatar={imgName => {
            this.setState({ avatar: imgName })
          }}
        ></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          title="个人简介"
          rows={3}
          autoHeight
          onChange={v => this.handleChange('desc', v)}
        ></TextareaItem>
        <Button
          type="primary"
          onClick={() => {
            this.update()
          }}
        >
          保存
        </Button>
      </div>
    )
  }
}

export default GeniusInfo
