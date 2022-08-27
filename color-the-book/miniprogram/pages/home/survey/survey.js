// pages/home/survey/survey.js
var app = getApp()
var db = wx.cloud.database()  //获取数据库的引用
var _ = db.command            //获取数据库查询及更新指令

Page({
  /** 页面的初始数据 */
  data: {
    page: 0,
    ops: [],
    hasUserInfo: false,
    userInfo: {},
    colorIndex: 0,
    book: {},
    img_url: [[]],
    soulColor: [{
      name: "鹿角棕",
      color: "#C7B6A5",
      book: ["哲学", "社会学", "政治学"],
      describe: "此刻的你是鹿角棕色，你的心情就像迷雾丛林中的小鹿，好奇雀跃，富有活力与灵感。\n相信我，这本充满哲思的书籍会赋予你更鲜活的生命底色~",
      option: ["A", "C", "D", "B", "B", "B", "C", "C", "A", "A", "B", "B"]
    }, {
      name: "秋竹绿",
      color: "#7B886F",
      book: ["军事", "经济"],
      describe: "此刻的你是秋竹绿色，此时此刻，你的思维具有超强的拓展力。\n此时的你似乎可以来阅读一本干货书籍！丰满自己的知识宝库吧！",
      option: ["B", "B", "B", "C", "A", "A", "A", "A", "D", "C", "F", "D"]
    }, {
      name: "合欢红",
      color: "#935356",
      book: ["语言", "艺术"],
      describe: "此刻的你是合欢红色，此时你的心情欢愉，充满感性，富有艺术审美。\n不知道这本书你会不会喜欢呢~",
      option: ["D", "A", "C", "B", "C", "D", "C", "C", "C", "B", "A", "C"]
    }, {
      name: "翅蝶蓝",
      color: "#8894A7",
      book: ["科学"],
      describe: "此刻的你是蝶翅蓝色，此刻的你拥有理性充满智慧的大脑，专注并深刻。\n这本书可能会适合此刻的你。",
      option: ["C", "C", "A", "C", "A", "A", "A", "D", "C", "D", "C", "D"]
    }, {
      name: "景天蓝",
      color: "#BfCAD6",
      book: ["逻辑"],
      describe: "此刻的你是井天蓝色，充满思辨，智慧溢满。\n为你奉上一本充满逻辑思维的书，来一场头脑风暴吧！",
      option: ["C", "C", "A", "D", "B", "A", "C", "F", "C", "E", "C", "B"]
    }, {
      name: "樱草紫",
      color: "#EDE6F6",
      book: ["人际沟通"],
      describe: "此刻的你是樱草紫色，拥有感知力与治愈自己的能力。\n如果心情有点小忧伤，这本书可能会适合你~",
      option: ["C", "D", "A", "B", "A", "C", "D", "B", "B", "E", "D", "A"]
    }, {
      name: "莲瓣红",
      color: "#A3797E",
      book: ["人物传记"],
      describe: "此刻的你是莲瓣红色，危险又迷人，充满创意、自由与好奇心。\n不如来读一本人物传记，寻找世界上最有趣的灵魂。",
      option: ["D", "A", "C", "C", "C", "C", "A", "E", "B", "E", "E", "D"]
    }, {
      name: "纸鸢青",
      color: "#DEE3DD",
      book: ["散文随笔"],
      describe: "此刻的你是纸鸢青色，此刻你的心灵敏锐而深刻，洞察美好与稀有之物。\n一本散文随笔适合此时此刻的你来享受。",
      option: ["B", "B", "B", "A", "B", "B", "B", "E", "D", "E", "E", "C"]
    }, {
      name: "石蕊红",
      color: "#EAD0D5",
      book: ["文学"],
      describe: "此刻的你是石蕊红色，此时的你正拥有云朵般的情绪感知能力。今天应该读一本轻盈的书~\n来看看这本书里有没有你期待的奇妙火花呢！",
      option: ["D", "A", "C", "D", "C", "D", "B", "F", "B", "E", "E", "C"]
    }, {
      name: "淡松烟",
      color: "#F0EAE5",
      book: ["心理"],
      describe: "此刻的你是淡松烟色，你的心情就像这个颜色一样，烟雾缭绕错综复杂。凌乱的小心情也是很可爱的~\n一本心理学的书籍，会让你更了解此时此刻的自己。",
      option: ["A", "D", "D", "D", "D", "B", "B", "E", "A", "E", "B", "A"]
    }, {
      name: "秋葵黄",
      color: "#F6E9D9",
      book: ["书信"],
      describe: "此刻的你是秋葵黄色，此时你拥有秋高气爽的孤独心境。\n读读这本书，今天的天气有好多想对你说的话都在里面~",
      option: ["A", "D", "D", "A", "D", "C", "D", "B", "A", "E", "B", "A"]
    }, {
      name: "梧枝绿",
      color: "#B6C4B2",
      book: ["成长"],
      describe: "此刻的你是梧枝绿色，你的心情就像今天的天气一样~平静又充满希望。\n孜孜不倦也是一种美好，捧起它来读读，也许会有惊喜！",
      option: ["B", "B", "B", "A", "D", "D", "D", "F", "D", "E", "B", "B"]
    }],
    questions: [{
      pageNum: 3,
      ques: ["哪一张图", "让你感到活力与灵感?"],
      choice: ["黄色夕阳下的运动", "和绿植的嬉戏", "蓝天的户外骑行", "紫色的乐感与魅力"]
    }, {
      pageNum: 4,
      ques: ["哪一张图", "表现了超强的拓展力?"],
      choice: ["红色爆发", "绿色体会", "蓝色探险", "紫色幻想"]
    }, {
      pageNum: 5,
      ques: ["哪一张图", "让你感到感性、富有艺术?"],
      choice: ["紫色的神秘", "绿色的感悟", "蓝色的创造", "黄色的发明"]
    }, {
      pageNum: 6,
      ques: ["哪一张图", "让你感到理性与智慧?"],
      choice: ["蓝色", "紫色", "青色", "绿色"]
    }, {
      pageNum: 7,
      ques: ["哪一张图让你感到", "思辨与满溢的智慧?"],
      choice: ["阅读的红色炽热", "自然的绿色韵律", "灵感的紫色爆发", "科研的白色严谨"]
    }, {
      pageNum: 8,
      ques: ["忧伤时", "你用什么颜色治愈自己?"],
      choice: ["冷静的冰湖", "冷清的街道", "紫色的思索", "治愈的孤寂"]
    }, {
      pageNum: 9,
      ques: ["你在什么颜色下", "是创意自由与好奇的?"],
      choice: ["青色的好奇", "蓝色的自由", "粉色的创意", "绿色的恣意"]
    }, {
      pageNum: 14,
      ques: ["充满希望的时候", "我感到:"],
      choice: ["粉色恋人出行", "黄色光明未来", "绿色享受生活", "蓝色拥抱理想"]
    }]
  },

  /** 预加载图片 */
  preLoadImg: async function () {
    let img_num = [1, 1, 4, 5, 4, 4, 4, 4, 4, 6, 4, 5, 6, 4]
    let temp = new Array(14)
    for (let i = 1; i <= 14; i++) {
      temp[i - 1] = new Array(img_num[i - 1])
      for (let j = 1; j <= img_num[i - 1]; j++) {
        const res = await wx.getImageInfo({
          src: 'cloud://cloud1-5g4t93f9e48249bd.636c-cloud1-5g4t93f9e48249bd-1306655618/images/' + i + '_' + j + '.png',
        })
        temp[i - 1][j - 1] = res.path
      }
    }
    return temp
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

  /** 生命周期函数--监听页面加载*/
  onLoad: async function (options) {
    // Object.keys().lenght判断全局数组中是否有值
    // if (app.globalData.nickname != "") {
    //   // 如果有值，则从全局变量中取值
    //   this.setData({
    //     nickname: app.globalData.nickname,
    //     avatarUrl: app.globalData.avatarUrl,
    //   })
    // } else {
    //   // 如果无值，调用Callback回调函数直接取值
    //   app.getUserInfoCallBack = res => {
    //     this.setData({
    //       nickname: res.data[0].nickname,
    //       avatarUrl: res.data[0].avatar_url,
    //     })
    //   }
    // }
    // 查询今日是否已经推荐过书籍
    let curDate = new Date()
    let date = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate()
    db.collection("recommend").where({
      _openid: app.globalData.openId,
      rec_date: date
    }).get().then(res => {
      if (res.data.length == 1) {  // 有记录
        // 获取用户openId
        wx.cloud.callFunction({
          name:'getOpenId'
        }).then(res => {
          app.globalData.openId = res.result.openid
          // 从数据库中取用户信息
          db.collection("user_info").where({
            user_id: _.eq(app.globalData.openId)
          }).get().then(res => {
            if (res.data.length == 1) {
              this.setData({
                'userInfo.nickName': res.data[0].nickname,
                'userInfo.avatarUrl': res.data[0].avatar_url
              }, () => {
                app.globalData.hasUserInfo = true
                app.globalData.userInfo = this.data.userInfo
              })
            }
          })
        })
        // 查询书籍完整信息
        db.collection("book_info").where({
          book_id: res.data[0].book_id
        }).get().then(res => {
          this.setData({
            book: res.data[0],
          }, () => {
            this.setData({ page: 15 })
          })
        })
      }
    })
    // 预加载图片
    if (this.data.page == 0) {
      this.setData({ img_url: await this.preLoadImg() }, () => {
        console.log(this.data.img_url[0])
        if (this.data.page != 15) {
          this.nextPage()
        }
      })
    } 
  },

  /** 生命周期函数--监听页面初次渲染完成 */
  onReady: function () {

  },

  /**  生命周期函数--监听页面显示 */
  onShow: function () {
    if (app.globalData.hasUserInfo == true && this.data.hasUserInfo == false) {
      this.setData({
        hasUserInfo: app.globalData.hasUserInfo,
        userInfo: app.globalData.userInfo
      })
    }
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

  /** 下一页 */
  nextPage: function () {
    this.setData({
      page: this.data.page + 1
    })
    if (this.data.page == 15)
      this.generateSoulColor()
  },

  /** 记录选项 */
  recordOp: function (event) {
    this.data.ops.push(event.target.dataset.op)
    console.log(this.data.ops)
    this.nextPage()
  },

  /** 保存推荐记录 */
  saveRecommend: function (book) {
    console.log(book)
    let curDate = new Date()
    db.collection("recommend").add({
      data: {
        user_id: app.globalData.openId,
        book_id: book.book_id,
        rec_date: curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate(),
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },

  /** 生成书籍 */
  generateBook: function () {
    // 获得颜色对应的书籍类别
    let category_list = this.data.soulColor[this.data.colorIndex].book
    let category = category_list[Math.floor(Math.random() * category_list.length)]
    // 随机从数据库抽取一本当前类型的书籍
    let book_list = []
    db.collection("book_info").where({
      category: category
    }).get().then(res => {
      book_list = res.data
      let chosen_book = book_list[Math.floor(Math.random() * book_list.length)]
      if (chosen_book.title.length > 20) {
        chosen_book.title = chosen_book.title.substr(0, chosen_book.title.length / 2) + "\n" + chosen_book.title.substr(chosen_book.title.length / 2, chosen_book.title.length)
      }
      this.setData({
        book: chosen_book,
      }) 
      // 保存推荐记录
      this.saveRecommend(chosen_book)
    }) 
  },

  /** 生成灵魂颜色 */
  generateSoulColor: function () {
    // 在当前问卷填写的情况下，记录每个颜色的得分
    var score = new Array(12).fill(0);
    for (var i = 0; i < 12; i++) {    // 遍历每个选项
      for (var j = 0; j < 12; j++) {  // 遍历每个颜色
        if (this.data.ops[i] == this.data.soulColor[j].option[i]) {
          score[j]++;
        }
      }
    }
    // 找到最大得分(得分一样则随机选取一个)
    var color = [];
    for (var i = 12; i > 0; i--) {    // 遍历每种最大得分
      for (var j = 0; j < 12; j++) {  // 遍历每种颜色
        if (score[j] == i) {
          color.push(j);
        }
      }
      if (color.length != 0) {
        break;
      }
    }
    // 随机选取相同得分中的一个颜色
    this.setData({
      colorIndex: color[Math.floor(Math.random() * color.length)]
    }, () => {console.log(this.data.colorIndex)})
    // 生成书籍
    this.generateBook()
  },
})