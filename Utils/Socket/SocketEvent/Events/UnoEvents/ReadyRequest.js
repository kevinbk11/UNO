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
                const room = Room.rooms[data.roomID]
                room.readySet.add(data.name)
                const game = Game.games[data.roomID]
                const players = game.players
                players.forEach((it)=>{
                    it.socket.emit("ReadyRespondEvent",PacketBuilder
                    .addData('number',room.players.indexOf(data.name))
                    .addData('name',data.name)
                    .addData('isAllReady',room.readySet.size==room.players.length)
                    .addData('isRoomHost',room.players.indexOf(it.name)==0)
                    .build())
                })
            }

        }
    }
}