import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AutRoute from './component/authroute/AuthRoute'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

class App extends React.Component {
  render() {
    return (
      <div>
        <AutRoute></AutRoute>
        <Switch>
          <Route path="/GeniusInfo" component={GeniusInfo}></Route>
          <Route path="/BossInfo" component={BossInfo}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:user" component={Chat}></Route>
          <Route component={Dashboard}></Route>
          {/* <Redirect to="/login"></Redirect> */}
        </Switch>
      </div>
    )
  }
}

export default App
