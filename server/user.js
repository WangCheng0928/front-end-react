const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = { pwd: 0, _v: 0 }

// Chat.remove({}, function(err, doc) {})

Router.get('/list', function(req, res) {
  // User.remove({}, function(e, d) {})
  const type = req.query.type
  User.find({ type }, function(err, doc) {
    return res.json({ code: 0, data: doc })
  })
})

Router.get('/getMsgList', function(req, res) {
  const userId = req.cookies.userId
  User.find({}, function(err, doc) {
    let users = {}
    doc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    // $or: [{ from: user, to: user }]
    Chat.find({ $or: [{ from: userId }, { to: userId }] }, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, msgs: doc, users: users })
      }
    })
  })
})

Router.get('/info', function(req, res) {
  //用户有没有cookie
  const { userId } = req.cookies
  if (!userId) {
    return res.json({ code: 1 })
  }
  User.findById(userId, _filter, function(e, d) {
    if (e) {
      return res.json({ code: 1, msg: '后端出错了' })
    }
    if (d) {
      return res.json({ code: 0, data: d })
    }
  })
})

Router.post('/readMsg', function(req, res) {
  const userId = req.cookies.userId
  const { from } = req.body
  Chat.updateMany({ from, to: userId }, { $set: { read: true } }, function(
    err,
    doc
  ) {
    console.log(doc)
    if (!err) {
      return res.json({ code: 0, num: doc.nModified })
    }
    return res.json({ code: 1, msg: '修改失败' })
  })
})

Router.post('/update', function(req, res) {
  const userId = req.cookies.userId
  if (!userId) {
    return res.json({ code: 1 })
  }
  User.findByIdAndUpdate(userId, req.body, function(err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      req.body
    )
    return res.json({ code: 0, data: data })
  })
})

Router.post('/register', function(req, res) {
  const { user, pwd, type } = req.body
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    } else {
      const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
      userModel.save(function(e, d) {
        if (e) {
          return res.json({ code: 1, msg: '后端出错了' })
        }
        const { user, type, _id } = d
        res.cookie('userId', _id)
        return res.json({ code: 0, data: { user, type, _id } })
      })
    }
  })
})

Router.post('/login', function(req, res) {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, { pwd: 0 }, function(e, d) {
    if (!d) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    }
    res.cookie('userId', d._id)
    return res.json({ code: 0, data: d })
  })
})

function md5Pwd(pwd) {
  const salt = 'wangchengwilaopo1314~'
  return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router
