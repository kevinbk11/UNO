var express = require('express');
var router = express.Router();
let SocketController = require('../Utils/Socket/SocketController')
let Game = require('../Utils/Game/Game')
let Room = require('../Utils/Game/Room')
router.post('/game/:roomID', function(req, res, next) {
    if(Game.games[req.params.roomID]!=null){
        let randomNumber = Math.floor(Math.random()*10000).toString()
        SocketController.clients.add(randomNumber)
        res.render('uno',{'name':req.body.name,'password':randomNumber})
        delete Room.rooms[req.params.roomID]
    }
    else{
        res.send(`<script>alert('${req.params.roomID}是不存在的')</script>`)
    }
});

module.exports = router;
