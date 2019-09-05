// 云函数入口文件
const cloud = require('wx-server-sdk')

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
    try{
    return await usersTable.where({
      openid: wxContext.OPENID
    }).update({
      data:{
        userData:{
          headpic:event.headpic
        }
      }
    })
  }catch(e){
    console.log(e)
  }
}