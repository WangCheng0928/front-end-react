import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import App from './App'
import { counter } from './index.redux'

const store = createStore(counter, applyMiddleware(thunk))

function Erying() {
  return <h2>二营</h2>
}

function Qibinglian() {
  return <h2>骑兵连</h2>
}

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">一营</Link>
          </li>
          <li>
            <Link to="/erying">二营</Link>
          </li>
          <li>
            <Link to="/qibinglian">骑兵连</Link>
          </li>
        </ul>
      </div>
      <Route path="/" exact component={App}></Route>
      <Route path="/erying" component={Erying}></Route>
      <Route path="/qibinglian" component={Qibinglian}></Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// function render() {
//   ReactDom.render(
//     <App
//       store={store}
//       addGun={addGun}
//       removeGun={removeGun}
//       addGunAsync={addGunAsync}
//     />,
//     document.getElementById('root')
//   )
// }

// render()
// store.subscribe(render)
