import React from 'react'
import PropTypes from 'prop-types'
import { Grid, List } from 'antd-mobile'

class AvatarSelector extends React.Component {
  static propTypes = {
    AvatarSelector: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const avatarList = 'boy,girl,man,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,woman,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))

    const gridHeader = this.state.text ? (
      <div>
        <span>已选择头像</span>
        <img style={{ width: 20 }} src={this.state.icon} alt=""></img>
      </div>
    ) : (
      <div>请选择头像</div>
    )
    return (
      <div>
        <List renderHeader={() => gridHeader}></List>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}
        ></Grid>
      </div>
    )
  }
}

export default AvatarSelector
