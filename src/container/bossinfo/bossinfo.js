import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'

import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleChange(key, val) {
    this.setState({ [key]: val })
  }

  render() {
    return (
      <div>
        <NavBar mode="dark">Boss完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgName => {
            this.setState({ avatar: imgName })
          }}
        ></AvatarSelector>
        <InputItem onChange={v => this.handleChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={v => this.handleChange('salary', v)}>
          职位薪资
        </InputItem>
        <TextareaItem
          title="职位要求"
          rows={3}
          autoHeight
          onChange={v => this.handleChange('desc', v)}
        ></TextareaItem>
        <Button type="primary">保存</Button>
      </div>
    )
  }
}

export default BossInfo
