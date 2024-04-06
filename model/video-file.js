/*
 * @Author: BINGWU
 * @Date: 2024-02-26 17:43:21
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-02-26 17:43:42
 * @FilePath: \vue-movie\serve\model\video-file.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
const mongoose = require('mongoose')
const videoFileShcema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  fileLink: {
    type: String,
    required: true
  },
  createDate: { type: Date, default: Date.now }
})
const videoFileModel = mongoose.model('video-file', videoFileShcema)
module.exports = videoFileModel