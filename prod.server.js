var express = require('express')
var config = require('./config/index')

var port = config.build.port

var app = express()

var router = express.Router()

router.get('/', function(req, res, next) {
  req.url = './index.html'
  next()
})

app.use(router)

const appData = require('./data.json')
const seller = appData.seller
const ratings = appData.ratings
const goods = appData.goods
const apiRouters = express.Router()

apiRouters.get('/goods', function(req, res) {
  res.json({errno: 0, data: goods})
})
apiRouters.get('/ratings', function(req, res) {
  res.json({errno: 0, data: ratings})
})
apiRouters.get('/seller', function(req, res) {
  res.json({errno: 0, data: seller})
})

app.use('/api', apiRouters)

app.use(express.static('./dist'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:' + port)
})
