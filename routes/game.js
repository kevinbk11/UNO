var express = require('express');
var router = express.Router();
let SocketController = require('../SocketController')
let Room = require('../Room')
/* GET home page. */
router.get('/game/:roomID', function(req, res, next) {
    console.log(Room.rooms[req.params.roomID])
    if(Room.rooms[req.params.roomID]!=null){
        res.render('uno')
    }
    else{
        res.send(`<script>alert('${req.params.roomID}是不存在的')</script>`)
    }
});

module.exports = router;
