let Room = require('../Room')
const SocketEvent = require('./SocketEvent')
const builder = require('../PacketBuilder')
module.exports=class JoinRoomRequest extends SocketEvent{
    constructor(){
        super()
        this.name="JoinRoomRequest"
        this.handler=
        data=>{
            try{
                data=JSON.parse(data)
            }
            catch{
                console.log('error')
                return
            }
            
            if(this.clients.includes(data.id)){
                let id =data.id
                data=JSON.parse(data.data)
                let room = Room.rooms[data.roomID]
                if(room==null)return
                room.players.forEach(player=>{
                    this.idToClient[player].emit('PlayerJoinEvent',builder.addData('id',id).addData('number',room.players.length+1).build())
                })
                room.players.push(id)
                this.socket.emit('JoinGameEvent',builder.addData('players',room.players).build())
                /*Room.rooms.forEach((it)=>{

                    if(it.roomID==data.roomID){
                        it.players
                    }
                })*/
            }
            else console.log('error')
        }
    }
}