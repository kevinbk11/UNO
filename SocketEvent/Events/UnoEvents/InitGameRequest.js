const Room = require("../../../Room");
const SocketEvent = require("../../SocketEvent");
const PacketBuilder = require('../../../PacketBuilder')
module.exports = class InitGameRequest extends SocketEvent{
    constructor(){
        //重新設定玩家名字和連線的key:value
        //給玩家遊戲編號，決定前端排版
        super()
        this.name='InitGameRequest'
        this.handler=data=>{
            try{
                this.nameToClient[data.name]=this.socket
                const room=Room.rooms[data.roomID]
                const number = room.players.indexOf(data.name)+1
                this.socket.emit('InitGameRespondEvent',PacketBuilder.addData('number',number).build())//要給玩家編號
            }
            catch{

            }
        }
    }
}