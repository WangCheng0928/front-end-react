import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AutRoute from './component/authroute/AuthRoute'
import './config'
import './index.css'
import BossInfo from './container/bossinfo/bossinfo'

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
      {/* <Switch> */}
      <AutRoute></AutRoute>
      <Route path="/BossInfo" component={BossInfo}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      {/* <Redirect to="/login"></Redirect> */}
      {/* </Switch> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
