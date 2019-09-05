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
    collage:'',
    cheadpic:''
    },

  cancell: function(){
    wx.navigateBack({
      delta : 1
    })
  },

  onSubmit: function(e){
    //console.log("资料卡已提交")
    console.log(e)
    this.setData({
      birth: e.detail.value.birth,
      gender: e.detail.value.gender,
      nickname: e.detail.value.nickname,
      sign: e.detail.value.sign,
      tel: e.detail.value.tel,
      university: e.detail.value.university,
      collage: e.detail.value.collage,
      headpic:this.data.cheadpic
    })
    console.log(this.data.headpic)
    wx.cloud.callFunction({
      name:'get_newUserInfo',
      data:{
        userdata: this.data,
        newdata:true
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  onReset: function(e){
    this.setData({
      cheadpic:this.data.headpic
    })
    console.log('资料卡已被重置')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
      collage:mydata.data.collage,
      cheadpic:mydata.data.headpic
    })
    //console.log(mydata.data)
    //console.log(this.data)
  },
   
  upload: function () {
    let _this = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',//上传至云端的路径
          filePath: tempFilePaths[0],//小程序临时文件路径
          success: res => {
            //返回文件 ID
           console.log(res.fileID)
           _this.setData({
             cheadpic: res.fileID
           })
          },
          fail: console.error
        })
        console.log(_this.data.headpic)
      },
    })
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