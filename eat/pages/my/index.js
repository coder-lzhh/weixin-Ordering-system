let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    userInfo: {},
    hasUserInfo: false
  },
  getuserinfo(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }

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

    let list = wx.getStorageSync('cart') || [];
    this.setData({
      list
    })
  }
})