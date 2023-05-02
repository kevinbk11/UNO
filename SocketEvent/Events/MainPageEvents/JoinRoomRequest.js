let Room = require('../../../Room')
const SocketEvent = require('../../SocketEvent')
const builder = require('../../../PacketBuilder')
module.exports=class JoinRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="JoinRoomRequest"
        this.handler=data=>{        
            if(this.clients.includes(data.id)){
                data=data.data
                let room = Room.rooms[data.roomID]
                if(room==null)return
                room.players.forEach(player=>{
                    this.nameToClient[player].emit('PlayerJoinEvent',builder
                    .addData('name',data.name)
                    .addData('number',room.players.length+1)
                    .build())//向房間內房客通知有新玩家加入
                })
                room.players.push(data.name)
                this.socket.emit('JoinRoomRespondEvent',builder
                .addData('players',room.players)
                .addData('roomID',room.roomID)
                .build())//回傳請求加入房間的玩家的相關資料
            }
            else console.log('JoinGameRequestNoIderror')
        }
    }
}