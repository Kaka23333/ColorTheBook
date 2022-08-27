//app.js

App({
  globalData: {
    openId: "",
    userInfo: {},
    hasUserInfo: false,
  },

  /** 检查登录状态 */
  login: function () {
    console.log("login")
    const that = this
    let db = wx.cloud.database()  //获取数据库的引用
    let _ = db.command            //获取数据库查询及更新指令
    // 查询数据库，判断此用户信息是否保存
    db.collection("user_info").where({
      user_id: _.eq(this.globalData.openId)
    }).get().then(res => {
      if (res.data.length == 1) {
        console.log(res.data)  // 
        that.globalData = {
          nickname: res.data[0].nickname,
          avatarUrl: res.data[0].avatar_url,
          isLogin: true
        } 
        // 用户信息回调
        if (this.getUserInfoCallBack) {
          this.getUserInfoCallBack(res)
        }
      }
    })
    // 若没保存则请求获取用户基本信息
    if (!this.globalData.isLogin) {
      wx.getUserProfile({
        desc: '我们需要获取您的昵称及头像',
        success: res => {
          console.log("success")
          that.globalData = {
            nickname: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl
          }
          // 存入数据库
          db.collection("user_info").add({
            data: {
              user_id: this.globalData.openId,
              nickname: this.globalData.nickname,
              avatar_url: this.globalData.avatarUrl,
            },
            success: function(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
        },
        fail: res => { console.log("fail") }
      })
    }
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    // 获取用户openId
    wx.cloud.callFunction({
      name:'getOpenId'
    }).then(res => {
      this.globalData = {
        openId: res.result.openid
      }
    })
  }
})
