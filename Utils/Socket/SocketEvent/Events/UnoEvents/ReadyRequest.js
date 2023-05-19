const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
module.exports = class ReadyRequest extends SocketEvent{
    constructor(){
        super()
        this.name='ReadyRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                console.log(`${data.name} in ${data.roomID} is ready`)
                const room = Room.rooms[data.roomID]
                room.readySet.add(data.name)
                const game = Game.games[data.roomID]
                const players = game.players
                if(room.readySet.size==room.players.length){
                    room.readySet.clear()
                    game.restart()
                    players.forEach((it)=>{
                        it.socket.emit("RestartGameEvent","?")
                    })
                }  
            }

        }
    }
}