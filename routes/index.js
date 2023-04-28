var express = require('express');
var router = express.Router();
let SocketController = require('../SocketController')
/* GET home page. */
router.get('/', function(req, res, next) {
  let randomNumber = Math.floor(Math.random()*10000).toString()
  res.render('index', { number:randomNumber});
  SocketController.clients.push(randomNumber)
});

module.exports = router;
