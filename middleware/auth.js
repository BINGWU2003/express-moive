/*
 * @Author: BINGWU
 * @Date: 2024-02-28 21:31:40
 * @LastEditors: BINGWU HuJiaCheng2003@163.com
 * @LastEditTime: 2024-02-28 22:44:56
 * @FilePath: \vue-movie\serve\middleware\auth.js
 * @Describe: 处理token失效
 * @Mark: ૮(˶ᵔ ᵕ ᵔ˶)ა
 */
module.exports = (error, req, res, next) => {
  // token解析失败
  if (error.name === 'UnauthorizedError') {
    return  res.status(402).json({
      msg: "登陆过期"
    })
  }
  // 其他错误
  res.send({ status: 500, message: '未知错误' })

}