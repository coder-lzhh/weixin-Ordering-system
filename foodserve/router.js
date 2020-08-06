const fs = require('fs')
const express = require('express')
const request = require('request')
const foods = require("./foods")

const router = express.Router()

const dbfood = "./dbfood.json"

// 渲染页面
router.get("/foods", (req, res) => {
  fs.readFile(dbfood, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("初始化页面错误")
    }

    let foods = JSON.parse(data)
    res.render('index.html', {
      foods: foods
    })
  })
})

// 渲染添加菜品页面
router.get('/foods/newfood', (req, res) => {
  res.render('newfood.html', {
    index: req.query.idd
  })
})

// 添加菜品
router.post('/foods/newfood', (req, res) => {
  foods.save(req.body, err => {
    console.log(err)
  })
  res.redirect('/foods')
})


// 删除菜品
router.get('/foods/deletefood', (req, res) => {
  foods.deletefood(req.query, err => {
    console.log(err)
  })
  setTimeout(() => {
    res.redirect('/foods')
  }, 10)
})

router.get('/foods/edit', (req, res) => {
  foods.findItem(req.query, (err, foods) => {
    console.log(err)
    res.render('edit.html', {
      foods: foods
    })
  })
})


router.post('/foods/edit', (req, res) => {
  foods.saveEdit(req.body, err => {
    console.log(err)
  })
  res.redirect('/foods')
})


router.post('/foods/newcategory', (req, res) => {
  foods.newcategory(req.body, err => {
    console.log(err)
  })
  setTimeout(() => {
    res.redirect('/foods')
  }, 10)
})


router.get('/foods/deletecategory', (req, res) => {
  foods.deletecategory(req.query, err => {
    console.log(err)
  })
  setTimeout(() => {
    res.redirect('/foods')
  }, 10)
})

router.get('/a', (req, res) => {
  fs.readFile('./public/img/番茄无骨烤鱼.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/b', (req, res) => {
  fs.readFile('./public/img/豆豉无骨烤鱼.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/c', (req, res) => {
  fs.readFile('./public/img/酱香无骨烤鱼.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/d', (req, res) => {
  fs.readFile('./public/img/酸菜无骨烤鱼.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/e', (req, res) => {
  fs.readFile('./public/img/香辣无骨烤鱼.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})


router.get('/f', (req, res) => {
  fs.readFile('./public/img/白灼生菜.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/g', (req, res) => {
  fs.readFile('./public/img/白灼菜心.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/h', (req, res) => {
  fs.readFile('./public/img/白灼豆芽.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/i', (req, res) => {
  fs.readFile('./public/img/凉拌青瓜.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/j', (req, res) => {
  fs.readFile('./public/img/滑蛋.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})




router.get('/k', (req, res) => {
  fs.readFile('./public/img/骨肉相连.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/l', (req, res) => {
  fs.readFile('./public/img/鸡扒.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/m', (req, res) => {
  fs.readFile('./public/img/鸭胸肉.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})

router.get('/n', (req, res) => {
  fs.readFile('./public/img/小黄鱼面.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/o', (req, res) => {
  fs.readFile('./public/img/牛肉面.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/p', (req, res) => {
  fs.readFile('./public/img/猪肉面.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})

router.get('/q', (req, res) => {
  fs.readFile('./public/img/番茄炒蛋盖浇饭.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/r', (req, res) => {
  fs.readFile('./public/img/鱼香肉丝盖浇饭.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/s', (req, res) => {
  fs.readFile('./public/img/咖喱肉块盖浇饭.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/t', (req, res) => {
  fs.readFile('./public/img/孜然牛肉盖浇饭.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/u', (req, res) => {
  fs.readFile('./public/img/木耳肉片盖浇饭.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})
router.get('/v', (req, res) => {
  fs.readFile('./public/img/青椒肉丝盖浇饭.jpg', (err, data) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(data)
  })
})




router.get('/food', (req, res) => {
  fs.readFile('./dbfood.json', 'utf-8', (err, data) => {
    res.writeHead(200, {
      'Content-Type': 'application/json;charset=utf-8'
    });
    res.end(data)
  })
})


router.get('/checklogin', (req, res) => {
  var session = db.session[req.query.token]
  console.log('checklogin: ', session)
  res.json({
    is_login: session !== undefined
  })
})
router.post('/login', (req, res) => {
  console.log('login code: ' + req.body.code)
  var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + wx.appid + '&secret=' + wx.secret + '&js_code=' + req.body.code + '&grant_type=authorization_code'
  request(url, (err, response, body) => {
    console.log('session: ' + body)
    var session = JSON.parse(body)
    console.log(typeof session)
    console.log(session)
    if (session.openid) {
      var token = 'token_' + Date.now()
      db.session[token] = session
      if (!db.user[session.openid]) {
        db.user[session.openid] = {
          credit: 100
        }
      }
      console.log(db)
    }
    res.json({
      token: token
    })
  })
})


const wx = {
  appid: 'wxfff9437a7b985896',
  secret: 'aabf0078a9753823be5bad0525429717'
}

var db = {
  session: {},
  user: {}
}



module.exports = router