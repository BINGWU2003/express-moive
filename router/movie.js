/*
 * @Author: BINGWU
 * @Date: 2024-02-23 17:34:39
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-02-27 19:19:39
 * @FilePath: \vue-movie\serve\router\movie.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
const express = require('express')
const movieRouter = express.Router()
const movieModel = require('../model/movie')



movieRouter.get('/getAllMovie', (req, res) => {
  try {
    movieModel.find().then((success) => {
      const data = [
        {
          value: 0, name: '待审核'
        },
        {
          value: 0, name: '审核通过'
        },
        {
          value: 0, name: '审核未通过'
        }
      ]
      success.forEach((item) => {
        if(item.checkStatus==='uncheck') {
          data[0].value++;
        } else if(item.checkStatus==='passCheck'){
          data[1].value++;
        } else if(item.checkStatus==='blockCheck') {
          data[2].value++;
        }
       })
      return res.status(200).json({
        msg: "success",
        data,
      })
    }).catch((error) => {
      console.log('e', error)
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


movieRouter.get('/getMovie', (req, res) => {
  try {
    const { pageIndex, pageSize, checkStatus, movieName } = req.query
    let findCondition = {}
    let regex = null
    if (movieName) {
      // 模糊查询
      regex = new RegExp(movieName)
    }
    // 转换查询条件
    if (movieName && checkStatus) {
      // 搜索+筛选+分页
      findCondition = {
        movieName: regex,
        checkStatus
      }
    } else if (movieName) {
      // 搜索+分页
      findCondition = {
        movieName: regex,
      }
    } else if (checkStatus) {
      // 筛选+分页
      findCondition = {
        checkStatus
      }
    }
    movieModel.find(findCondition).skip((pageIndex - 1) * pageSize).limit(pageSize).then(async (success) => {
      // 查询当前条件下的数据总数
      await movieModel.countDocuments(findCondition).then((movieTotal) => {
        return res.status(200).json({
          msg: "success",
          movieArr: success,
          movieTotal
        })
      })

    }).catch((error) => {
      console.log('e', error)
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



movieRouter.post('/addMovie', (req, res) => {
  try {
    movieModel.create(req.body).then(() => {
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

movieRouter.delete('/deleteMovie', (req, res) => {
  try {
    const { _id } = req.query
    movieModel.findByIdAndDelete(_id).then((err) => {
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
// 批量添加
movieRouter.post('/addManyMovie', (req, res) => {
  const { movieArr } = req.body
  try {
    movieModel.insertMany(movieArr).then(() => {
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


movieRouter.post('/editMovie', (req, res) => {
  try {
    const { _id, movieData } = req.body
    console.log('111', movieData)
    movieModel.findByIdAndUpdate(_id, movieData).then((err) => {
      if (!err) {
        return res.status(200).json({
          msg: "该电影消息不存在"
        })
      } else {
        return res.status(200).json({
          msg: "修改成功"
        })
      }
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'error'
    })
  }
})


module.exports = movieRouter