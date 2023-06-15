let Room = require('../../../../Game/Room')
const SocketEvent = require('../../SocketEvent')
const builder = require('../../../../Builder/PacketBuilder')
module.exports=class JoinRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="JoinRoomRequest"
        this.handler=data=>{        
            if(this.clients.has(data.id)){
                data=data.data
                let room = Room.rooms[data.roomID]
                if(room==null){
                    this.socket.emit('ErrorEvent','查無此房。')
                    return
                }
                if(room.players.length==4){
                    this.socket.emit('JoinRoomRespondEvent',false)
                    return
                }
                if(room==null)return
                room.players.forEach(player=>{
                    this.nameToClient[player].emit('PlayerJoinEvent',builder
                    .addData('name',data.name)
                    .addData('number',room.players.length+1)
                    .build())//向房間內房客通知有新玩家加入
                })
                room.players.push(data.name)
                room.someoneIn=true
                this.socket.emit('JoinRoomRespondEvent',builder
                .addData('name',data.name)
                .addData('roomID',room.roomID)
                .build())//回傳請求加入房間的玩家的相關資料
            }
            else console.log('JoinGameRequestNoIderror')
        }
    }
}