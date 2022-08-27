// pages/book/book.js
const db = wx.cloud.database().collection('book_info');
const _ = wx.cloud.database().command;
const re = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    boolean:false,
    book_list:[],
    isSearch: false,
    like:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this;
    var arr = [];
    db.get({
      success(res){
        t.setData({
          book_list: res.data,
        })
        arr = res.data;
        console.log("查询成功",res)
      },
      error(err)
      {
        console.log(err)
      }
    })

    
  },

  serach(e)
  {
    var t = this;
    db.where(_.or([{
      author: re.RegExp({
        regexp: '.*' + t.data.like,
        options: 'i',
      })
      },
      {
        title: re.RegExp({
          regexp: '.*' + t.data.like,
          options: 'i',
        })
      }
    ])).get({
      success(res){
        console.log("模糊",res)
        // 去掉重复书籍
        var book_name = new Set();
        var filtered_list = [];
        for (var i = 0; i < res.data.length; i++) {
          if (!book_name.has(res.data[i].title)) {
            book_name.add(res.data[i].title)
            filtered_list.push(res.data[i])
          }
        }
        t.setData({
          book_list: filtered_list,
          isSearch: true
        }, () => {console.log(t.data.book_list)})
      },
      error(err)
      {
        console.log(err);
      }
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
    wx.showLoading({
      title: '加载中',
    })

    var t = this;
    db.where(_.or([{
      author:re.RegExp({
          regexp: '.*' + t.data.like,
          options: 'i',
      }),
      title:re.RegExp({
        regexp: '.*' + t.data.like,
        options: 'i',
      }),
    }])).skip(t.data.book_list.length).get({
      success(res){
        wx.hideLoading();
        for(var i = 0; i < res.data.length; i++){
          t.data.book_list.push(res.data[i]);
        }
        t.setData({
          book_list:t.data.book_list,
        })
        console.log('aa',t.data.book_list);
      },
      error(err)
      {
        console.log(err)
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /** 跳转到子页面 */
  navigate: function (event) {
    wx.navigateTo({ url: "./bookInfo/bookInfo" })
  }
})