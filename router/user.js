/*
 * @Author: BINGWU
 * @Date: 2023-12-02 22:01:59
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-02-28 22:32:35
 * @FilePath: \vue-movie\serve\router\user.js
 * @Describe: 
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
const express = require('express')
const jwt = require('jsonwebtoken')
// 引入 Axios
const axios = require('axios')
const userRouter = express.Router()
const { secretPrivateKey } = require('../config/key')
const userModel = require('../model/user')
userRouter.post('/addUser', (req, res) => {
  try {

    // const data = {
    //   userName:'super',
    //   userPassword: 'super',
    //   userType:'超级管理员',
    //   authArr:'add-user,delete-user,edit-user,view-user,add-file,delete-file,view-file,add-movie,export-file,import-file,delete-movie,view-movie,edit-movie,lock-movie',
    //   routerData: [
    //     {
    //       path: 'home',
    //       name: 'home',
    //       meta: {
    //         // 路由组件的路径
    //         url: '../views/HomeView.vue'
    //       }
    //     },
    //     // 新增
    //     {
    //       path: 'user-manage',
    //       name: 'user-manage',
    //       meta: {
    //         // 路由组件的路径
    //         url: '../views/UserInfoMangage.vue',
    //         name: '角色管理'
    //       }
    //     },
    //     {
    //       path: 'movie-file',
    //       name: 'movie-file',
    //       meta: {
    //         // 路由组件的路径
    //         url: '../views/FileMovieView.vue',
    //         name: '电影文件管理'
    //       }
    //     },
    //     {
    //       path: 'movie-info',
    //       name: 'all-movie',
    //       meta: {
    //         // 路由组件的路径
    //         url: '../views/movie/AllMovieView.vue',
    //         name: '所有电影信息'
    //       }
    //     },
    //     {
    //       path: 'profile/image',
    //       name: 'image',
    //       meta: {
    //         // 路由组件的路径
    //         url: '../views/profile/EditImageView.vue',
    //         name: '修改头像'
    //       }
    //     },
    //     {
    //       path: 'profile/password',
    //       name: 'password',
    //       meta: {
    //         // 路由组件的路径
    //         url: '../views/profile/EditPasswordView.vue',
    //         name: '修改密码'
    //       }
    //     }
    //   ],
    //   asideData:[
    //     {
    //       index: '/home',
    //       icon: 'icon iconfont icon-home',
    //       name: '首页'
    //     },
    //     // 新增
    //     {
    //       index: '/user-manage',
    //       icon: 'icon iconfont icon-jiaoseguanli',
    //       name: '角色管理'
    //     },
    //     {
    //       index: '/movie-file',
    //       icon: 'icon iconfont icon-shipinwenjian',
    //       name: '电影文件管理'
    //     },

    //     // 新增二级
    //     {
    //       index: '/movie-info',
    //       icon: 'icon iconfont icon-iconshoot',
    //       name: '电影信息管理'
    //     },
    //     {
    //       index: '/profile',
    //       icon: 'icon iconfont icon-gerenxinxi',
    //       name: '个人信息管理',
    //       children: [
    //         {
    //           index: '/profile/image',
    //           name: '修改头像'
    //         },
    //         {
    //           index: '/profile/password',
    //           name: '修改密码'
    //         }
    //       ]
    //     }
    //   ]
    // }
    axios.get('https://api.thecatapi.com/v1/images/search')
      .then(response => {
        console.log('Response:', response.data)
        userModel.create({
          ...req.body,
          userImage: response.data[0].url
        }).then((success) => {
          return res.status(200).json({
            msg: 'success',
          })
        }).catch((error) => {
          console.log('error', error)
        })
      })
      .catch(error => {
        console.error('Error:', error)
      })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json({
      msg: 'error'
    })
  }

})


userRouter.post('/loginUser', (req, res) => {
  try {
    userModel.findOne(req.body).then((success) => {
      if (success) {
        // 生成token
        const token = jwt.sign(req.body, secretPrivateKey, { expiresIn: 3600 })
        return res.status(200).json({
          code: 1000,
          msg: "success",
          userData: success,
          token
        })
      } else {
        return res.status(200).json({
          code: 2000,
          msg: "用户不存在"
        })
      }

    }).catch(() => {
      return res.status(200).json({
        msg: "错误"
      })
    })
  } catch (error) {
    console.log('err', error)
    return res.status(500).json({
      msg: 'error1'
    })
  }
})

userRouter.get('/getUser', (req, res) => {
  try {
    const { pageIndex, pageSize } = req.query
    userModel.find().skip((pageIndex - 1) * pageSize).limit(pageSize).then(async (success) => {
      const userTotal = await userModel.countDocuments()
      return res.status(200).json({
        msg: "success",
        userArr: success,
        userTotal,
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


userRouter.get('/getAllUser', (req, res) => {
  try {
    userModel.find().then(async (success) => {
      const source = [
        ['score', 'amount', 'product'],
        [100, 0, '自定义'],
        [75, 0, '文件管理员'],
        [50, 0, '审核员'],
        [25, 0, '电影信息管理员']
      ]
      success.forEach((item) => {
        if (item.userType === 'custom') {
          source[1][1]++
        } else if (item.userType === 'file-manage') {
          source[2][1]++
        } else if (item.userType === 'lock-user') {
          source[3][1]++
        } else if (item.userType === 'movie-manage') {
          source[4][1]++
        }
      })
      return res.status(200).json({
        msg: "success",
        source
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


userRouter.delete('/deleteUser', (req, res) => {
  try {
    const { _id } = req.query
    userModel.findByIdAndDelete(_id).then((err) => {
      if (!err) {
        return res.status(200).json({
          msg: "用户不存在"
        })
      } else {
        return res.status(200).json({
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

userRouter.post('/editUser', (req, res) => {
  try {
    const { _id, userData } = req.body
    userModel.findByIdAndUpdate(_id, userData).then((err) => {
      if (!err) {
        return res.status(200).json({
          msg: "用户不存在"
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


userRouter.get('/getUserInfo', (req, res) => {
  try {
    const { _id } = req.query
    userModel.findById(_id).then((user) => {
      if (!user) {
        return res.status(200).json({
          msg: "用户不存在"
        })
      } else {
        return res.status(200).json({
          userData: user
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

module.exports = userRouter