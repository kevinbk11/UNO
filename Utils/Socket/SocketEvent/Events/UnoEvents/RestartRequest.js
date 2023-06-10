const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
module.exports = class RestartRequest extends SocketEvent{
    constructor(){
        super()
        this.name='RestartRequest'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                const game = Game.games[data.roomID]
                const players = game.players
                if(game.readySet.size==game.players.length){
                    game.readySet.clear()
                    game.restart()
                    players.forEach((it)=>{
                        it.socket.emit("RestartGameEvent")
                    })
                }
            }

        }
    }
}