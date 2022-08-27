// pages/me/me.js
var app = getApp()
var db = wx.cloud.database()  //获取数据库的引用
var _ = db.command            //获取数据库查询及更新指令

Page({
  /** 页面的初始数据 */
  data: {
    hasUserInfo: false,
    userInfo: {},
    motto: "每个人都是一座孤岛\n书籍让我们有了联系的帆船",
    score: 367,
    isSignIn: false,
  },
 
  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    // 导入用户信息
    this.setData({
      hasUserInfo: app.globalData.hasUserInfo,
      userInfo: app.globalData.userInfo
    })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo
        app.globalData.hasUserInfo = true
        console.log(app.globalData)
        // 查询数据库，判断此用户信息是否保存
        db.collection("user_info").where({
          user_id: _.eq(app.globalData.openId)
        }).get().then(res => {
          // 没有保存则存入数据库
          if (res.data.length == 0) {
            // 存入数据库
            db.collection("user_info").add({
              data: {
                user_id: app.globalData.openId,
                nickname: this.data.userInfo.nickName,
                avatar_url: this.data.userInfo.avatarUrl,
              },
              success: function(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
              }
            })
          }
        })
      }
    })
  },

  /** 生命周期函数--监听页面初次渲染完成 */
  onReady: function () {

  },

  /** 生命周期函数--监听页面显示 */
  onShow: function () {

  },

  /** 生命周期函数--监听页面隐藏 */
  onHide: function () {

  },

  /** 生命周期函数--监听页面卸载 */
  onUnload: function () {

  },

  /** 页面相关事件处理函数--监听用户下拉动作 */
  onPullDownRefresh: function () {

  },

  /** 页面上拉触底事件的处理函数 */
  onReachBottom: function () {

  },

  /** 用户点击右上角分享 */
  onShareAppMessage: function () {

  },

  /** 跳转到子页面 */
  navigate: function (event) {
    let choice = event.target.dataset.choice
    if (choice == "1") {
      wx.navigateTo({ url: "./book-list/book-list" })
    } else if (choice == "2") {
      wx.navigateTo({ url: "./book-calendar/book-calendar" })
    } else if (choice == "3") {
      wx.navigateTo({ url: "./follow/follow" })
    } else {
      wx.navigateTo({ url: "./gift/gift" })
    }
  },

  /** 签到 */
  signIn: function (event) {
    if (!this.data.isSignIn) {
      this.setData({
        score: this.data.score + 1,
        isSignIn: true
      })
    }
  }
})