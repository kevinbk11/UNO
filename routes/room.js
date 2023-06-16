var express = require('express');
var router = express.Router();
let SocketController = require('../Utils/Socket/SocketController')
let Room = require('../Utils/Game/Room')
/* GET home page. */
router.post('/room/:roomID', function(req, res, next) {
    if(Room.rooms[req.params.roomID]!=null){
        const room = Room.rooms[req.params.roomID]
        let randomNumber = Math.floor(Math.random()*10000).toString()
        SocketController.clients.add(randomNumber)
        res.render('room',{'myName':req.body.name,'names':room.players,'roomID':req.params.roomID,'v':randomNumber})
    }
    else{
        res.send(`<script>alert('${req.params.roomID}是不存在的')</script>`)
    }
});

module.exports = router;
