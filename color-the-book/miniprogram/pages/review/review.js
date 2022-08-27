// pages/discover/discover.js
var app = getApp()

Page({
  /** 页面的初始数据 */
  data: {
    nickname: "",
    avatarUrl: ""
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    // 导入用户信息
    if (app.globalData.nickname != undefined) {
      this.setData({
        nickname: app.globalData.nickname,
        avatarUrl: app.globalData.avatarUrl
      })
    } else {
      app.getUserInfoCallBack = res => {
        this.setData({
          nickname: res.data[0].nickname,
          avatarUrl: res.data[0].avatar_url,
        }) 
      }
    }
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

  }
})