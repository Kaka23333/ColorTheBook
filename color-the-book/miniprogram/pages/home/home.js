// pages/home/home.js
// 在需要使用的js文件中，导入js
var util = require('utils/util.js');
var currentDate = new Date();

const DEFAULT_PAGE = 0;
Page({
  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {   
    currentMonth: currentDate.getMonth() + 1,  // 月份
    currentDayOfMonth: currentDate.getDate(),  // 日期
    currentDayOfWeek: currentDate.getDay(),    // 周几
    toView: `card_${DEFAULT_PAGE}`,
    list: ['三体II:黑暗森林', '倚天屠龙记', '黄金时代', '浮生六记', '明朝那些事儿']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  },
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      time: time
    });
  },
  pageData:{
    locationobj:{
    }
    },
    selectlocation:function(e){
    wx.chooseLocation({
    success:res=> {
    console.log(res);
    let locationobj={
    latitude:res.latitude,
    longitude:res.longitude,
    name:res.name,
    address:res.address
    }
    this.pageData.locationobj=locationobj
    },
    onShow: function () {
      var TIME = util.formatTime(new Date());     
      this.setData({
      time: TIME,   
      });
    },  
    })  },
    touchStart(e) {
      this.startPageX = e.changedTouches[0].pageX;
    },
   
    touchEnd(e) {
      const moveX = e.changedTouches[0].pageX - this.startPageX;
      const maxPage = this.data.list.length - 1;
      if (Math.abs(moveX) >= 150){
        if (moveX > 0) {
          this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
        } else {
          this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
        }
      }
      this.setData({
        toView: `card_${this.currentView}`
      });
    }
  
})