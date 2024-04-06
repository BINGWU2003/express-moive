const express = require('express')
const videoFileRouter = express.Router()
const videoFileModel = require('../model/video-file')



videoFileRouter.get('/getAllVideoFile', (req, res) => {
  try {

    videoFileModel.find().then(async (success) => {
      const data = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
      ]
      success.forEach((item) => {
        const month = item.createDate.getMonth() + 1
        data[month - 1]++
      })
      return res.status(200).json({
        msg: "success",
        data
      })
    }).catch((error) => {
      return res.status(200).json({
        msg: "错误"
      })
    })

  } catch (error) {
    return res.status(500).json({
      msg: 'error'
    })
  }
})

videoFileRouter.get('/getVideoFile', (req, res) => {
  try {
    const { pageIndex, pageSize, fileName } = req.query
    let findCondition = {}
    let regex = null
    if (fileName) {
      // 模糊查询
      regex = new RegExp(fileName)
      findCondition = {
        fileName: regex
      }
    }
    videoFileModel.find(findCondition).skip((pageIndex - 1) * pageSize).limit(pageSize).then(async (success) => {
      await videoFileModel.countDocuments(findCondition).then((videoFileTotal) => {
        return res.status(200).json({
          msg: 'success',
          videoFileArr: success,
          videoFileTotal
        })
      })
    })

  } catch (error) {
    return res.status(500).json({
      msg: 'error'
    })
  }
})

videoFileRouter.post('/addVideoFile', (req, res) => {
  try {
    videoFileModel.create(req.body).then(() => {
      return res.status(200).json({
        msg: 'success',
      })
    }).catch((error) => {
      console.log('error', error)
    })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({
      msg: 'error'
    })
  }
})

videoFileRouter.delete('/deleteVideoFile', (req, res) => {
  try {
    const { _id } = req.query
    videoFileModel.findByIdAndDelete(_id).then((err) => {
      if (!err) {
        return res.status(200).json({
          code: 2000,
          msg: "数据不存在"
        })
      } else {
        return res.status(200).json({
          code: 1000,
          msg: "删除成功"
        })
      }
    }).catch(err => {
      return res.status(200).json({
        msg: "错误"
      })
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'error'
    })
  }
})


module.exports = videoFileRouter