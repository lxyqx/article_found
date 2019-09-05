// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birth:'',
    fndid:[],
    gender:0,
    headpic:'',
    lstid:[],
    money:0,
    nickname:'',
    score:0,
    sign:"",
    tel:"",
    university:'',
    collage:''
  },

  changedata: function(){
    var mydata = this.data
    //console.log(mydata)
    wx.navigateTo({
      url: '/pages/mydata/mydata',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: mydata })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var mydata
      wx.cloud.callFunction({
        name:'get_newUserInfo',
        data:{
          getdata: true
        }
      }).then(res=>{
        console.log(res.result.data[0])
        this.setData({
          birth: res.result.data[0].userData.birth,
          fndid: res.result.data[0].userData.fndid,
          gender: res.result.data[0].userData.gender,
          headpic: res.result.data[0].userData.headpic,
          lstid: res.result.data[0].userData.lstid,
          money: res.result.data[0].userData.money,
          nickname: res.result.data[0].userData.nickName,
          score: res.result.data[0].userData.score,
          sign: res.result.data[0].userData.sign,
          tel: res.result.data[0].userData.tel,
          university: res.result.data[0].university,
          collage: res.result.data[0].collage
        })
      }).catch(err=>{
        console.log(err)
      })
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})