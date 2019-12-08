import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AutRoute from './component/authroute/AuthRoute'
import './config'
import './index.css'

const store = createStore(reducers, applyMiddleware(thunk))

function Boss() {
  return <h2>Boss页面</h2>
}

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <Switch> */}
      <AutRoute></AutRoute>
      <Route path="/boss" component={Boss}></Route>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      {/* <Redirect to="/login"></Redirect> */}
      {/* </Switch> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
