let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    totalprice: 0,
    message: ''
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
    let oldcart = app.globalData.cartobj

    let totalprice = app.globalData.totalprice

    let cart = oldcart.filter(v => v.checked)
    this.setData({
      cart,
      totalprice
    })

  },
  bindblur(e) {
    this.setData({
      message: e.detail.value
    })
  },
  pay() {
    // app.globalData.num = num
    let number = wx.getStorageSync('number') || 0;
    let num = number += 1
    wx.setStorageSync('number', num);
    console.log(num)
    wx.showModal({
      title: '提示',
      content: '支付成功',
      cancelText: '返回',
      confirmText: '查看订单',
      success: (result) => {
        if (result.confirm) {
          wx.switchTab({
            url: '/pages/my/index',
          });


        }
        if (!result.confirm) {
          wx.switchTab({
            url: '/pages/cart/index',
          });


        }

        let historycart = wx.getStorageSync('cart') || [];


        let oldcart = app.globalData.cartobj
        let Obj = {}
        let carts = oldcart.filter(v => v.checked)
        let totalprice = app.globalData.totalprice
        Obj.children = carts
        Obj.addtiem = new Date().toLocaleString()
        Obj.number = Date.now()
        Obj.num = num > 9 ? num : "0" + '' + num
        Obj.totalprice = totalprice
        Obj.message = this.data.message
        historycart.unshift(Obj)
        wx.setStorageSync('cart', historycart);

        // app.globalData.truecart.unshift(Obj)



        let cart = oldcart.filter(v => !v.checked)
        app.globalData.cartobj = cart
        app.globalData.totalprice = 0
      }
    });

  }
})