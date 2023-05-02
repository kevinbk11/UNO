var express = require('express');
var router = express.Router();
let SocketController = require('../SocketController')
let Room = require('../Room')
/* GET home page. */
router.post('/game/:roomID', function(req, res, next) {
    if(Room.rooms[req.params.roomID]!=null){
        res.render('uno',{'name':req.body.name})
    }
    else{
        res.send(`<script>alert('${req.params.roomID}是不存在的')</script>`)
    }
});

module.exports = router;
