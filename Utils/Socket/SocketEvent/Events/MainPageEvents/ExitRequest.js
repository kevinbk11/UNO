const PacketBuilder = require("../../../../Builder/PacketBuilder");
const Room = require("../../../../Game/Room");
const checker = require("../../../../Game/Rule/RuleChecker");
const SocketEvent = require("../../SocketEvent");

module.exports = class ExitRequest extends SocketEvent {
    constructor() {
        super()
        this.name = 'ExitRequest'
        this.handler = data => {
            if (this.clients.has(data.id)) {
                data = data.data
                const name = data.name
                const room = Room.rooms[data.roomID]
                console.log(data)
                const number = room.getPlayerNumber(name)
                if(number!=1){
                    Room.rooms[data.roomID].players.forEach((it,index)=>{
                        this.nameToClient[it].emit('ExitEvent',number)
                    })
                    room.players.splice(number-1,1)
                }else{
                    Room.rooms[data.roomID].players.forEach((it,index)=>{
                        this.nameToClient[it].emit('RoomDissolveEvent',it)
                    })
                    delete Room.rooms[data.roomID]
                }
                console.log(Room.rooms)

            }
        }
    }
}