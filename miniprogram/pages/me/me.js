// pages/me/me.js
var app = getApp()
var db = wx.cloud.database()  //获取数据库的引用
var _ = db.command            //获取数据库查询及更新指令

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: null,
    nickname: "登入",
    avatarUrl: "../../images/me/avatar-default.png",
    isLogin: false,
    motto: "每个人都是一座孤岛\n书籍让我们有了联系的帆船"
  },

  login: function() {
    const that = this
    if (this.data.isLogin) {
      return
    }
    // 请求获取用户基本信息
    wx.getUserProfile({
      desc: '我们需要获取您的昵称及头像',
      success: res => {
        that.setData({
          nickname: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
        // 存入数据库
        db.collection("user_info").add({
          data: {
            user_id: this.data.openId,
            nickname: this.data.nickname,
            avatar_url: this.data.avatarUrl,
          },
          success: function(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })
      }
    })
    // 给全局变量赋值
    // app.globalData.nickname = that.data.nickname
    // app.globalData.avatarUrl = that.data.avatarUrl
    // app.globalData.isLogin = that.data.isLogin
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    // 导入全局变量openId
    this.setData({
      openId: app.globalData.openId
    })
    // 查询数据库，判断此用户信息是否保存
    db.collection("user_info")
      .where({user_id: _.eq(this.data.openId)})
      .get({
        success: function(res) {
          if (res.data.length == 1) {
            that.setData({
              nickname: res.data[0].nickname,
              avatarUrl: res.data[0].avatar_url,
              isLogin: true
            })
          }
        },
        fail:  console.error
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