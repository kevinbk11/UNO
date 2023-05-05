var express = require('express');
var router = express.Router();
let SocketController = require('../Utils/Socket/SocketController')
let Room = require('../Utils/Game/Room')
/* GET home page. */
router.post('/game/:roomID', function(req, res, next) {
    if(Room.rooms[req.params.roomID]!=null){
        let randomNumber = Math.floor(Math.random()*10000).toString()
        SocketController.clients.push(randomNumber)
        res.render('uno',{'name':req.body.name,'password':randomNumber})
    }
    else{
        res.send(`<script>alert('${req.params.roomID}是不存在的')</script>`)
    }
});

module.exports = router;
