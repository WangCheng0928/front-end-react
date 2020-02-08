import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRouter from './user'
import model from './model'
import path from 'path'

import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { renderToString, renderToNodeStream } from 'react-dom/server'
import thunk from 'redux-thunk'
import { StaticRouter } from 'react-router-dom'
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
import reducers from '../src/reducer'
import App from '../src/app'
import staticPath from '../build/asset-manifest.json'
console.log(staticPath.files['main.css'])
assethook({
  extensions: ['png']
})
const Chat = model.getModel('chat')

//新建app
const app = express()

//work with express
const server = require('http').Server(app)

const io = require('socket.io')(server)

io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
    // console.log(data)
    // io.emit('recmsg', data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

// function Bpp() {
//   return (
//     <div>
//       <p>server render</p>
//     </div>
//   )
// }
// const App = class extends React.PureComponent {
//   render() {
//     return React.createElement('h1', null, 'Hello World')
//   }
// }

app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
    return next()
  }

  const store = createStore(reducers, compose(applyMiddleware(thunk)))
  // let context = {}
  // const markup = renderToString(
  //   <Provider store={store}>
  //     <StaticRouter location={req.url} context={context}>
  //       <App></App>
  //     </StaticRouter>
  //   </Provider>
  // )

  const obj = {
    '/msg': 'React聊天消息列表',
    '/boss': 'boss查看牛人列表页面'
  }

  res.write(`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Web site created using create-react-app"
      />
      <title>React App</title>
      <link rel="stylesheet" href="${staticPath.files['main.css']}" />
      <meta name='description' content='${obj[req.url]}'/>
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">`)

  let context = {}
  const markupStream = renderToNodeStream(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App></App>
      </StaticRouter>
    </Provider>
  )
  markupStream.pipe(res, { end: false })
  markupStream.on('end', () => {
    res.write(`</div>
    <script src="${staticPath.files['main.js']}"></script>
  </body>
</html>`)
    res.end()
  })

  // const htmlPage = `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="utf-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1" />
  //     <meta name="theme-color" content="#000000" />
  //     <meta
  //       name="description"
  //       content="Web site created using create-react-app"
  //     />
  //     <title>React App</title>
  //     <link rel="stylesheet" href="${staticPath.files['main.css']}" />
  //     <meta name='description' content='${obj[req.url]}'/>
  //   </head>
  //   <body>
  //     <noscript>You need to enable JavaScript to run this app.</noscript>
  //     <div id="root">${markup}</div>
  //     <script src="${staticPath.files['main.js']}"></script>
  //   </body>
  // </html>
  // `
  // const htmlRes = renderToString(React.createElement(Bpp))
  // res.send(htmlPage)
  // return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
server.listen(9093, function() {
  console.log('Node app start at port 9093')
})
