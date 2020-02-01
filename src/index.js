import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AutRoute from './component/authroute/AuthRoute'
import './config'
import './index.css'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'

const logger = createLogger({ collapsed: true })
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <AutRoute></AutRoute>
      <Switch>
        <Route path="/GeniusInfo" component={GeniusInfo}></Route>
        <Route path="/BossInfo" component={BossInfo}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route component={Dashboard}></Route>
        {/* <Redirect to="/login"></Redirect> */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
