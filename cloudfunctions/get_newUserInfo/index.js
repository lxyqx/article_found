// 云函数入口文件
const cloud = require('wx-server-sdk')
//const md5 = require('md5-node')


cloud.init({
  traceUser: true,
  env: 'article-14d2t'
})
const db = cloud.database()
const usersTable = db.collection("users")
const _ = db.command


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event)
  const _ = db.command  //更新数据

  // 根据Openid查询用户，返回用户的个人信息
  if (event.getdata == true) {
    console.log(event.getdata)
    try{
      return await usersTable.where({
        openid:wxContext.OPENID
      }).get({
        success:console.log,
        fail: console.error
      })
    }catch(e){
      console.log(e)
    }
  } else if (event.newdata == true) {//更新用户的数据
    try {
      //替换更新，用传入的数据替换指定的记录
      return await usersTable.where({
        openid: wxContext.OPENID
      }).update({
        data: {
          university: event.userdata.university,
          collage: event.userdata.collage,
          userData: {
            birth: event.userdata.birth,
            gender: event.userdata.gender,
            headpic: event.userdata.headpic,
            nickName: event.userdata.nickname,
            sign: event.userdata.sign,
            tel: event.userdata.tel
          }
        },
        success: console.log,
        fail: console.error
      })
    } catch (e) {
      console.error(e)
    }
  }
  //
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    result,
  }
}
