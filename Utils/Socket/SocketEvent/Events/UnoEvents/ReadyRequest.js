const Room = require("../../../../Game/Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../../Builder/PacketBuilder');
const Game = require("../../../../Game/Game");
module.exports = class ReadyRequest extends SocketEvent{
    constructor(){
        super()
        this.name='ReadyRequest'
        this.handler=data=>{
            if(this.clients.has(data.id)){
                data=data.data
                console.log(`${data.name} in ${data.roomID} is ready`)        
                const game = Game.games[data.roomID]
                game.readySet.add(data.name)
                const player = game.getPlayerByName(data.name)
                const players = game.players
                console.log(game.players.indexOf(player))
                players.forEach((it)=>{
                    it.socket.emit("ReadyRespondEvent",PacketBuilder
                    .addData('number',game.players.indexOf(player))
                    .addData('name',data.name)
                    .addData('isAllReady',game.readySet.size==game.playerCount)
                    .addData('isRoomHost',game.players.indexOf(it)==0)
                    .build())
                })
            }

        }
    }
}