//index.js
//获取应用实例
const app = getApp()
let categoryHeight = [0, 392, 784, 1034, 1287, Number.MAX_VALUE]
Page({
  data: {
    food: [],
    totalprice: 0,
    actindex: 0,
    scrollindex: 0,
    cartBall: {
      show: false,
      x: 0,
      y: 0
    }
  },
  shopcartAnimate: null,
  changingCategory: false,
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中",
      mask: true,

    });
    this.getfood()
    this.shopcartAnimate = shopcartAnimate('.balldance', this)
  },
  onReady() {

    // let query = wx.createSelectorQuery()
    // console.log(query)
    // // let top = 0
    // // query.select('.right').boundingClientRect(rect => {
    // //   console.log(rect)
    // //   // top = rect.top
    // //   console.log(rect.top)
    // // })
    // query.selectAll('.text').boundingClientRect(res => {
    //   console.log(res)
    //   res.forEach(rect => {
    //     categoryHeight[rect.id.substring(rect.id.indexOf('t') + 1)] = rect.top
    //   })
    // })
    // query.exec()
    wx.hideLoading();
  },

  onShow() {

    let totalprice = app.globalData.totalprice
    this.setData({
      totalprice
    })
  },
  getfood() {

  

    wx.request({
      url: 'http://127.0.0.1:3000/food',
      success: (result) => {
        // console.log(result)
        this.setData({
          food: result.data
        })
      },
    
    });
  },
  addcart(e) {
    let {
      index,
      index1
    } = e.currentTarget.dataset

    // console.log(index, index1)
    let foodObj = this.data.food[index].food[index1]

    this.shopcartAnimate.show(e)
    app.getgood(foodObj)

    let totalprice = app.globalData.cartobj.filter(v => v.checked).reduce((total, good) => total += good.price * good.num, 0)

    this.setData({
      totalprice
    })


    app.globalData.totalprice = totalprice

    // console.log(app.globalData.totalprice)

  },
  nameclick(e) {
    let {
      index
    } = e.currentTarget.dataset
    // console.log(index)
    this.changingCategory = true
    this.setData({
      actindex: index,
      scrollindex: index
    }, () => {
      this.changingCategory = false
    })
  },
  listscroll(e) {

    let ST = e.detail.scrollTop
    // console.log(categoryHeight)
    // console.log(ST)

    // if(categoryHeight[]<ST<)
    for (let i = 0; i < categoryHeight.length; i++) {

      if (ST > categoryHeight[i] && ST < categoryHeight[i + 1]) {
        if (!this.changingCategory) {
          this.changingCategory = true
          this.setData({
            actindex: i
          }, () => {
            this.changingCategory = false
          })

        }
      }
    }

  },
  scrollbottom() {
    // console.log("object")
    this.setData({
      actindex: 4
    })

    console.log(this.data.actindex)
  }

})


function shopcartAnimate(iconClass, page) {
  var busPos = {}
  wx.createSelectorQuery().select(iconClass).boundingClientRect(rect => {
    busPos.x = rect.left + 15
    busPos.y = rect.top
  }).exec()
  return {
    show: function (e) {
      var finger = {
        x: e.touches[0].clientX - 10,
        y: e.touches[0].clientY - 10
      }
      var topPoint = {}
      if (finger.y < busPos.y) {
        topPoint.y = finger.y - 150
      } else {
        topPoint.y = busPos.y - 150
      }
      topPoint.x = Math.abs(finger.x - busPos.x) / 2
      if (finger.x > busPos.x) {
        topPoint.x = (finger.x - busPos.x) / 2 + busPos.x
      } else {
        topPoint.x = (busPos.x - finger.x) / 2 + finger.x
      }
      var linePos = bezier([busPos, topPoint, finger], 30)
      var bezier_points = linePos.bezier_points
      page.setData({
        'cartBall.show': true,
        'cartBall.x': finger.x,
        'cartBall.y': finger.y
      })
      var len = bezier_points.length
      var index = len
      let i = index - 1
      var timer = setInterval(function () {
        i = i - 4
        if (i < 1) {
          clearInterval(timer)
          page.setData({
            'cartBall.show': false
          })
          return
        }
        page.setData({
          'cartBall.show': true,
          'cartBall.x': bezier_points[i].x,
          'cartBall.y': bezier_points[i].y
        })
      }, 50)
    }
  }

  function bezier(pots, amount) {
    var pot
    var lines
    var ret = []
    var points
    for (var i = 0; i <= amount; ++i) {
      points = pots.slice(0)
      lines = []
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount))
        } else if (lines.length > 1) {
          points = lines
          lines = []
        } else {
          break
        }
      }
      ret.push(lines[0])
    }

    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance
      var ret = []
      pointA = points[0]
      pointB = points[1]
      xDistance = pointB.x - pointA.x
      yDistance = pointB.y - pointA.y
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2)
      tan = yDistance / xDistance
      radian = Math.atan(tan)
      tmpPointDistance = pointDistance * rate
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      }
      return ret
    }
    return {
      bezier_points: ret
    }
  }
}