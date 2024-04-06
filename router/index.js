/*
 * @Author: BINGWU
 * @Date: 2024-02-17 00:25:12
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-02-23 17:53:03
 * @FilePath: \vue-movie\serve\router\index.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
const userRouter = require('../router/user')
const movieRouter = require('../router/movie')
const videoFileRouter = require('../router/video-file')
module.exports = (app) => {
  app.use(userRouter)
  app.use(movieRouter)
  app.use(videoFileRouter)
}





