// pages/me/book-list/book-list.js
var app = getApp()
var db = wx.cloud.database()  //获取数据库的引用
var _ = db.command            //获取数据库查询及更新指令

Page({

  /** 页面的初始数据 */
  data: {
    bookList: [],
  },

  /** 加载书单 */
  loadBookList: async function (idList) {
    let bookList = []
    for (let i = 0; i < idList.length; i++) {
      const res = await db.collection("book_info").where({
        book_id: idList[i].book_id
      }).get().then()
      bookList.push(res.data[0])
    }
    return bookList
  },

  /** 生命周期函数--监听页面加载 */
  onLoad: async function (options) {
    // 查询书单
    const res = await db.collection("recommend").where({
      _openid: app.globalData.openId
    }).get().then()
    this.setData({
      bookList: await this.loadBookList(res.data)
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

  }
})