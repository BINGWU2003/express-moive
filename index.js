/*
 * @Author: BINGWU
 * @Date: 2023-12-02 21:40:59
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-02-28 22:27:39
 * @FilePath: \vue-movie\serve\index.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const router = require('./router/index')
const { expressjwt } = require('express-jwt')
const { DB_HOST, DB_PORT, DB_NAME, secretPrivateKey } = require("./config/key")
const auth = require('./middleware/auth')
const app = express()
const port = 3000 // 默认3000
app.use(express.json())
app.use(express.urlencoded())
// 使用 body-parser 中间件来解析请求体
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// 添加 JWT 中间件到 Express 应用程序
app.use(expressjwt({ secret: secretPrivateKey, algorithms: ["HS256"] }).unless({ path: ["/loginUser"] }))
router(app)
// 处理token的中间件
app.use(auth)
//1.连接数据库
mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`)
//2.连接成功
mongoose.connection.on('connected', function () {
  console.log('连接成功')
})
//3.连接失败
mongoose.connection.on('error', function (err) {
  console.log('连接错误：', err)
})
app.listen(3000, () => {
  console.log(`Server running at http://localhost:${port}`)
})
