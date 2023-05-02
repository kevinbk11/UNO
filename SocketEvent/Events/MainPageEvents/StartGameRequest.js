const builder = require("../../../PacketBuilder");
const Room = require("../../../Room");
const SocketController = require("../../../SocketController");
const SocketEvent = require("../../SocketEvent");

module.exports=class StartGameRequest extends SocketEvent{
    constructor(){
        super()
        this.name='StartGameRequest'
        this.handler=data=>{
            if(this.clients.includes(data.id)){
                data=data.data
                Room.rooms[data.roomID].players.forEach(player=>{
                    this.nameToClient[player].emit('GameStartEvent',builder
                    .addData('roomID',data.roomID)
                    .addData('name',player)
                    .build())
                    delete this.nameToClient[player]
                })
            }  
        }
    }
}
