var express = require('express');
var router = express.Router();
let SocketController = require('../Utils/Socket/SocketController')
/* GET home page. */
router.get('/', function(req, res, next) {
  let randomNumber = Math.floor(Math.random()*10000).toString()
  res.render('index', { number:randomNumber});
  SocketController.clients.add(randomNumber)
});

module.exports = router;
