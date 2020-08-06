const fs = require('fs')

const dbfood = "./dbfood.json"


exports.save = function (food, callback) {
  console.log(food)
  fs.readFile(dbfood, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let index = food.idd
    delete food.idd
    let foods = JSON.parse(data)

    foods[index].food.push(food)
    let fooddata = JSON.stringify(foods)


    fs.writeFile(dbfood, fooddata, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}


exports.deletefood = function (food, callback) {

  let {
    index1,
    index2
  } = food

  fs.readFile(dbfood, 'utf8', (err, data) => {


    let foods = JSON.parse(data)

    foods[index1].food.splice(index2, 1)

    let fooddata = JSON.stringify(foods)


    fs.writeFile(dbfood, fooddata, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })


}

exports.findItem = function (food, callback) {

  let {
    index1,
    index2
  } = food
  fs.readFile(dbfood, 'utf8', (err, data) => {
    let foods = JSON.parse(data)
    foods[index1].food[index2].index1 = index1
    foods[index1].food[index2].index2 = index2
    callback(null, foods[index1].food[index2])
  })
}


exports.saveEdit = function (food, callback) {
  console.log(food)
  let {
    index1,
    index2
  } = food
  delete food.index1
  delete food.index2
  fs.readFile(dbfood, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    let foods = JSON.parse(data)

    foods[index1].food[index2] = food
    let fooddata = JSON.stringify(foods)


    fs.writeFile(dbfood, fooddata, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}



exports.newcategory = function (foodinfo, callback) {
  // console.log(food)
  fs.readFile(dbfood, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    foodinfo.food = []
    let foods = JSON.parse(data)

    foods.push(foodinfo)
    let fooddata = JSON.stringify(foods)


    fs.writeFile(dbfood, fooddata, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}


exports.deletecategory = function (food, callback) {

  let {
    idd
  } = food

  fs.readFile(dbfood, 'utf8', (err, data) => {


    let foods = JSON.parse(data)

    foods.splice(idd, 1)

    let fooddata = JSON.stringify(foods)


    fs.writeFile(dbfood, fooddata, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })


}