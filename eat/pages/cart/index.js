let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalPrice: 0,
    cart: [],
    allChecked: false,
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    const cart = app.globalData.cartobj;


    this.setcart(cart)
  },
  setcart(cart) {


    let totalPrice = cart.filter(v => v.checked).reduce((total, good) => total += good.price * good.num, 0)
    let totalNum = cart.filter(v => v.checked).length
    let allChecked = this.data.allChecked

    allChecked = cart.length == 0 ? false : cart.every(v => v.checked)

    this.setData({
      allChecked,
      cart,
      totalPrice,
      totalNum
    })
    app.globalData.cartobj = cart
    app.globalData.totalprice = totalPrice
  },

  checktap(e) {
    let {
      id
    } = e.currentTarget.dataset
    const cart = app.globalData.cartobj;
    let obj = cart.find(v => v.id == id)
    obj.checked = !obj.checked
    this.setcart(cart)
  },
  Allchecktap() {
    const cart = app.globalData.cartobj;
    if (cart.every(v => v.checked)) {
      cart.map(v => v.checked = false)
    } else {
      cart.map(v => v.checked = true)
    }
    this.setcart(cart)
  },
  clac(e) {
    const cart = app.globalData.cartobj;

    let {
      op,
      id
    } = e.currentTarget.dataset
    let index = cart.findIndex(v => v.id == id)

    if (cart[index].num == 1 && op == -1) {

      wx.showModal({
        title: '提示',
        content: '您是否需要删除该商品？',
        success: (result) => {
          if (result.confirm) {
            cart.splice(index, 1)
            this.setcart(cart)
          }
        }
      });


    } else {
      cart[index].num += op
      this.setcart(cart)
    }

    console.log(op, id)
  },
  buy() {
    let cart = this.data.cart
    console.log(app.globalData.userInfo)
    if (!app.globalData.userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登入！',
        confirmText: '去登入',
        success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/index',

            });

          }
        }
      });
      return
    }

    if (cart.every(v => !v.checked)) {
      wx.showModal({
        title: '提示',
        content: '您还没有挑选菜品呢',
      });
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'

    });
  }
})