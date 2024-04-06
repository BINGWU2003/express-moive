const mongoose = require('mongoose')
// 路由数据字段
const meta = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  }
})
const router = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  path: {
    type: String,
  },
  meta
})
// 侧边栏数据字段
const children = new mongoose.Schema({
  index: {
    type: String,
  },
  name: {
    type: String,
  }
})
const aside = new mongoose.Schema({
  icon: {
    type: String,
  },
  index: {
    type: String,
  },
  name: {
    type: String,
  },
  children: [children]
})
const userSchema = new mongoose.Schema({
  userImage: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  authArr: {
    type: String,
  },
  userType: {
    type: String,
    required: true,
  },
  routerData: [router],
  asideData: [aside]
})
const userModel = mongoose.model('user', userSchema)
module.exports = userModel