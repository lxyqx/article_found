// miniprogram/pages/mydata/mydata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birth: '',
    gender: 1,
    headpic: '',
    nickname: '',
    sign: "",
    tel: "",
    university:'',
    collage:''
    },


  onSubmit: function(e){
    //console.log("资料卡已提交")
    console.log(e)
    this.setData({
      birth: e.detail.value.birth,
      gender: e.detail.value.gender,
      //headpic: e.detail.value.headpic,
      nickname: e.detail.value.nickname,
      sign: e.detail.value.sign,
      tel: e.detail.value.tel,
      university: e.detail.value.university,
      collage: e.detail.value.collage
    })
    wx.cloud.callFunction({
      name:'get_newUserInfo',
      data:{
        userdata: e.detail.value,
        newdata:true
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  onReset: function(e){
    console.log('资料卡已被重置')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.query)
    const eventChannel = this.getOpenerEventChannel()
   
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    var mydata
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      //console.log(data)
      mydata = data
    })
    //console.log(mydata)
    this.setData({
      birth: mydata.data.birth,
      //fndid: mydata.data.fndid,
      gender: mydata.data.gender,
      headpic: mydata.data.headpic,
      //lstid: mydata.data.lstid,
      //money: mydata.data.money,
      nickname: mydata.data.nickname,
      //score: mydata.data.score,
      sign: mydata.data.sign,
      tel: mydata.data.tel,
      university:mydata.data.university,
      collage:mydata.data.collage
    })
    //console.log(mydata.data)
    //console.log(this.data)
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