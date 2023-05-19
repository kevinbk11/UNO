var express = require('express');
var router = express.Router();
let SocketController = require('../Utils/Socket/SocketController')
/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.params)
    let randomNumber = Math.floor(Math.random()*10000).toString()
    res.render('index', { number:randomNumber,name:req.body.name});
    SocketController.clients.push(randomNumber)
});

module.exports = router;
