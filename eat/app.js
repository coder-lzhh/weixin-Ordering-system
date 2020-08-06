//app.js
App({
  onLaunch: function() {
    this.checkLogin(res => {
        // console.log('is_login: ', res.is_login)
        if (!res.is_login) {
          this.login()
        }
      }),
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 执行到此处表示用户已经授权，可以直接获取到用户信息
            wx.getUserInfo({
              success: res => {
                // console.log(res)
                // console.log(res.userInfo)
                this.globalData.userInfo = res.userInfo
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
  },
  login: function() {
    wx.login({
      success: res => {
        console.log('login code: ' + res.code)
        wx.request({
          url: 'http://127.0.0.1:3000/login',
          method: 'post',
          data: {
            code: res.code
          },
          success: res => {
            console.log('token: ' + res.data.token)
            this.globalData.token = res.data.token

            wx.setStorage({
              key: 'token',
              data: res.data.token
            })
          }
        })
      }
    })
  },
  checkLogin: function(callback) {
    var token = this.globalData.token
    if (!token) {
      // 从数据缓存中获取token
      token = wx.getStorageSync('token')
      if (token) {
        this.globalData.token = token
      } else {
        callback({
          is_login: false
        })
        return
      }
    }
    wx.request({
      url: 'http://127.0.0.1:3000/checklogin',
      data: {
        token: token
      },
      success: res => {
        callback({
          is_login: res.data.is_login
        })
      }
    })
  },
  globalData: {
    cartobj: [],
    totalprice: 0,
    num: 0,
    token: '',
    userInfo: null
  },

  getgood(cart) {

    let obj = this.globalData.cartobj.find(v => v.id == cart.id)
    if (obj) {
      obj.num += 1
      cart.checked = true
    } else {
      cart.num = 1
      cart.checked = true
      this.globalData.cartobj.push(cart)
    }


  }
})