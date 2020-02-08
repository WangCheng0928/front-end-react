import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import reducers from './reducer'
import './config'
import './index.css'
import App from './app'

const logger = createLogger({ collapsed: true })
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk, logger),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
