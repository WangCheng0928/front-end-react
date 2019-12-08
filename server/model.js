const mongoose = require('mongoose')
//连接mongo
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})
//类似mysql的表， mongodb有文档、字段概念
// const User = mongoose.model(
//   'user',
//   new mongoose.Schema({
//     user: { type: String, require: true },
//     age: { type: Number, require: true }
//   })
// )
const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    money: { type: String }
  },
  chat: {}
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
